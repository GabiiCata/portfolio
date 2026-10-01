// Dependency-free browser smoke checks. Requires Node 22+ and Google Chrome.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import assert from 'node:assert/strict';

const chrome = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium'
].find(existsSync);
assert(chrome, 'Set CHROME_PATH to a Chrome executable.');
const url = process.env.PREVIEW_URL || 'http://127.0.0.1:8080/';
const profile = await mkdtemp(join(tmpdir(), 'portfolio-qa-'));
const browser = spawn(chrome, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
let socket;
try {
  const endpoint = await new Promise((resolveEndpoint, reject) => {
    let output = '';
    const timeout = setTimeout(() => reject(new Error('Chrome startup timed out')), 15000);
    browser.once('error', reject);
    browser.stderr.on('data', (chunk) => {
      output += chunk.toString();
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timeout); resolveEndpoint(match[1]); }
    });
  });
  socket = new WebSocket(endpoint);
  await new Promise((ready, reject) => { socket.addEventListener('open', ready, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  let nextId = 0;
  const pending = new Map();
  const errors = [];
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (!message.id) return;
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    clearTimeout(entry.timeout);
    if (message.error) entry.reject(new Error(message.error.message)); else entry.resolve(message.result);
  });
  function call(method, params = {}, sessionId) {
    return new Promise((resolveCall, reject) => {
      const id = ++nextId;
      const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Timed out: ${method}`)); }, 15000);
      pending.set(id, { resolve: resolveCall, reject, timeout });
      socket.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  const { targetId } = await call('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await call('Target.attachToTarget', { targetId, flatten: true });
  const send = (method, params) => call(method, params, sessionId);
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `window.qaMetrics={cls:0,lcp:0};new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)qaMetrics.cls+=e.value})).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>l.getEntries().forEach(e=>qaMetrics.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});` });
  const settle = (ms = 750) => new Promise((done) => setTimeout(done, ms));
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url });
  await settle();
  assert.equal(await evaluate('document.readyState'), 'complete');
  console.log('Local initial-load metrics:', await evaluate('qaMetrics'));


  const contentCheck = "document.querySelectorAll('details,[hidden]').length===0 && [...document.querySelectorAll('main article')].every(e=>e.checkVisibility())";
  assert.equal(await evaluate(contentCheck), true, 'CV information is available without clicks');
  assert.equal(await evaluate("parseFloat(getComputedStyle(document.querySelector('h1')).fontSize)<=54"), true);
  assert.equal(await evaluate("document.querySelector('.hero-photo img').complete && document.querySelector('.hero-photo img').naturalWidth>0"), true);
  for (const text of ['Java', 'Spring Boot', 'PostgreSQL', 'CS2', 'Valorant', 'FC26', 'Potrerillos', 'San Rafael']) {
    assert.equal(await evaluate('document.body.innerText.includes('+JSON.stringify(text)+')'), true, text+' is present');
  }
  const sectionIds=['inicio','experiencia','educacion','proyectos','hobbies','contacto'];
  for (const width of [320,390,768,1440]) {
    await send('Emulation.setDeviceMetricsOverride', {width, height:width<600?844:900, deviceScaleFactor:1, mobile:width<600});
    for (let pass=0;pass<2;pass++) {
      for(const id of sectionIds) {
        await evaluate('document.getElementById('+JSON.stringify(id)+').scrollIntoView({behavior:"instant",block:"start"})');
        await settle(90);
        assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true,'No horizontal overflow at '+width+' / '+id);
      }
      await evaluate('window.scrollTo({top:0,behavior:"instant"})');
    }
    assert.equal(await evaluate(contentCheck),true);
    assert.equal(await evaluate("document.querySelector('.hero-photo').getBoundingClientRect().bottom<innerHeight"),true,'Photo appears in first screen at '+width);
    console.log('PASS '+width+'px: photo, all CV content and two scroll journeys without clicks');
  }
  for(const id of ['mur','espina-comercial','tusom']) {
    await evaluate('document.getElementById('+JSON.stringify(id)+').scrollIntoView({behavior:"instant",block:"start"})');
    await settle(100);
    assert.equal(await evaluate('(()=>{const a=document.querySelector("#'+id+' a");const r=a.getBoundingClientRect();const e=document.elementFromPoint(r.x+10,r.y+r.height/2);return a===e||a.contains(e)})()'),true,'Project link is not occluded: '+id);
  }
  console.log('PASS project stack: every project and link can be reached by scrolling');
  await send('Page.bringToFront');
  await evaluate("document.querySelector('nav a[href=\"#educacion\"]').focus()");
  await send('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await send('Input.dispatchKeyEvent',{type:'char',text:'\r',unmodifiedText:'\r',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await settle();
  assert.equal(await evaluate('location.hash'),'#educacion');
  assert.equal(await evaluate("document.querySelector('#educacion').checkVisibility()"),true);
  console.log('PASS keyboard section navigation');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await settle(100);
  assert.equal(await evaluate("getComputedStyle(document.documentElement).scrollBehavior"),'auto');
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.project-card')).position"),'static');
  assert.equal(await evaluate('document.getAnimations().length'),0);
  assert.equal(await evaluate(contentCheck),true);
  console.log('PASS reduced motion: static layout, all content accessible, no animations');
  await send('Emulation.setScriptExecutionDisabled',{value:true});
  await send('Page.navigate',{url});
  await settle();
  assert.equal(await evaluate(contentCheck),true);
  assert.equal(await evaluate("document.querySelectorAll('.project-card').length"),3);
  console.log('PASS no JavaScript: complete CV and projects are visible');
  assert.deepEqual(errors,[]);
  console.log('PASS no runtime exceptions');
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  await send('Emulation.setEmulatedMedia', { features: [] });
  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await send('Page.navigate', { url });
    await settle();
    const screenshot = await send('Page.captureScreenshot', { format: 'webp', quality: 90 });
    await writeFile(new URL(`../docs/preview-${name}.webp`, import.meta.url), Buffer.from(screenshot.data, 'base64'));
  }
  console.log('Saved final desktop and mobile previews in docs/');
  await call('Browser.close');
} finally {
  socket?.close();
  if (browser.exitCode === null) browser.kill();
  await new Promise((done) => setTimeout(done, 500));
  const safeRoot = resolve(tmpdir()) + sep;
  const target = resolve(profile);
  if (target.startsWith(safeRoot) && target.slice(safeRoot.length).startsWith('portfolio-qa-')) {
    await rm(target, { recursive: true, force: true, maxRetries: 4, retryDelay: 200 });
  }
}

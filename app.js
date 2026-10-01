const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const chapters = [...document.querySelectorAll('.chapter')];
const navLinks = [...document.querySelectorAll('nav a')];
const hero = document.querySelector('.hero');
const photo = document.querySelector('.hero-photo');
const animations = new Set();
const scenes = [...document.querySelectorAll('[data-parallax]')];
document.querySelector('#current-year').textContent = new Date().getFullYear();

// Native scrolling drives a small photo shift, progress and chapter navigation.
// No wheel interception or scroll snapping.
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const distance = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--reading', distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0);
  let active = chapters[0].id;
  for (const chapter of chapters) {
    if (chapter.getBoundingClientRect().top <= innerHeight * .35) active = chapter.id;
  }
  navLinks.forEach(link => {
    if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (!reducedMotion.matches && innerWidth > 760) {
    const top = hero.getBoundingClientRect().top;
    photo.style.setProperty('--photo-shift', `${Math.max(-10, Math.min(10, -top * .025))}px`);
  } else photo.style.removeProperty('--photo-shift');
  for (const scene of scenes) {
    if (reducedMotion.matches) { scene.style.removeProperty('--scene-shift'); continue; }
    const rect = scene.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight) {
      const amount = (innerHeight / 2 - rect.top - rect.height / 2) * .12;
      scene.style.setProperty('--scene-shift', `${Math.max(-55, Math.min(55, amount))}px`);
    }
  }
}
function scheduleScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}
addEventListener('scroll', scheduleScroll, { passive: true });
addEventListener('resize', scheduleScroll, { passive: true });
addEventListener('load', scheduleScroll, { once: true });
updateScroll();

// Every section is readable before JS runs. Animation only accompanies entry.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (reducedMotion.matches || !entry.target.animate) return;
      const sideways = entry.target.classList.contains('career-entry') || entry.target.classList.contains('hobby');
      const animation = entry.target.animate([
        { opacity: .55, transform: sideways ? 'translateX(20px)' : 'translateY(18px)' },
        { opacity: 1, transform: 'translate(0,0)' }
      ], { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  const steps = document.querySelectorAll('[data-step]');
  const stepObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-current', entry.isIntersecting));
  }, { rootMargin: '-15% 0px -35% 0px', threshold: .2 });
  steps.forEach(step => stepObserver.observe(step));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) animations.forEach(animation => animation.finish());
  scheduleScroll();
});

// Pointer depth is decorative. The stable parent keeps links easy to hit.
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
function attachTilt(element) {
  let frame = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    element.classList.remove('is-tilting');
    ['--tilt-x','--tilt-y','--light-x','--light-y'].forEach(name => element.style.removeProperty(name));
  };
  element.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches || event.pointerType !== 'mouse') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const x = Math.max(0,Math.min(1,(event.clientX - rect.left) / rect.width));
      const y = Math.max(0,Math.min(1,(event.clientY - rect.top) / rect.height));
      element.style.setProperty('--tilt-x', `${(0.5-y)*16}deg`);
      element.style.setProperty('--tilt-y', `${(x-0.5)*20}deg`);
      element.style.setProperty('--light-x', `${x*100}%`);
      element.style.setProperty('--light-y', `${y*100}%`);
      element.classList.add('is-tilting');
    });
  }, { passive: true });
  element.addEventListener('pointerleave', reset);
  element.addEventListener('pointercancel', reset);
  reducedMotion.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);
}
document.querySelectorAll('[data-tilt]').forEach(attachTilt);

// A native horizontal scroller, progressively enhanced into a seamless loop.
// Only the visible gallery runs a frame loop; it sleeps everywhere else.
const gallery = document.querySelector('.project-gallery');
const track = gallery.querySelector('.project-track');
const group = gallery.querySelector('.project-group');
const toggle = document.querySelector('.gallery-toggle');
const clone = group.cloneNode(true);
clone.dataset.clone = '';
clone.setAttribute('aria-hidden', 'true');
clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
clone.querySelectorAll('a').forEach(link => link.tabIndex = -1);
// Duplicate links remain clickable without moving focus into the a11y-hidden copy.
clone.addEventListener('mousedown', event => { if (event.target.closest('a')) event.preventDefault(); });
track.append(clone);
clone.querySelectorAll('[data-tilt]').forEach(attachTilt);
let galleryFrame = 0;
let lastTime = 0;
let position = 0;
let cycleWidth = 0;
let visible = false;
let paused = false;
let hovered = false;
let focused = false;

function tick(time) {
  const delta = lastTime ? Math.min(time-lastTime, 50) : 0;
  lastTime = time;
  position += delta * .032;
  if (cycleWidth > 0 && position >= cycleWidth) position %= cycleWidth;
  gallery.scrollLeft = position;
  galleryFrame = requestAnimationFrame(tick);
}
function syncGallery() {
  cancelAnimationFrame(galleryFrame);
  galleryFrame = 0;
  lastTime = 0;
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.innerHTML = paused ? 'Reanudar galería <span aria-hidden="true">▶</span>' : 'Pausar galería <span aria-hidden="true">Ⅱ</span>';
  if (visible && !paused && !hovered && !focused && !document.hidden && !reducedMotion.matches && cycleWidth > 0) {
    position = gallery.scrollLeft;
    galleryFrame = requestAnimationFrame(tick);
  }
}
function sizeGallery() {
  const enabled = !reducedMotion.matches;
  gallery.classList.toggle('gallery-ready', enabled);
  document.querySelector('.projects-section').classList.toggle('gallery-enabled', enabled);
  cycleWidth = enabled ? clone.getBoundingClientRect().left - group.getBoundingClientRect().left : 0;
  if (!enabled) { gallery.scrollLeft = 0; position = 0; }
  syncGallery();
}
toggle.addEventListener('click', () => { paused = !paused; syncGallery(); });
gallery.addEventListener('pointerenter', event => { if(event.pointerType === 'mouse') { hovered = true; syncGallery(); } });
gallery.addEventListener('pointerleave', () => { hovered = false; syncGallery(); });
gallery.addEventListener('focusin', () => { focused = true; syncGallery(); });
gallery.addEventListener('focusout', () => { queueMicrotask(() => { focused = gallery.contains(document.activeElement); syncGallery(); }); });
// Touch or manual horizontal scrolling grants control until explicit resume.
gallery.addEventListener('pointerdown', event => { if(event.pointerType !== 'mouse') { paused = true; syncGallery(); } }, { passive: true });
gallery.addEventListener('wheel', event => { if(Math.abs(event.deltaX)>0 || event.shiftKey) { paused = true; syncGallery(); } }, { passive: true });
document.addEventListener('visibilitychange', syncGallery);
reducedMotion.addEventListener('change', sizeGallery);
new ResizeObserver(sizeGallery).observe(gallery);
new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncGallery(); }, { threshold: .05 }).observe(gallery);
sizeGallery();

const fs=require('node:fs');
async function save(name,url,referer){const r=await fetch(url,{headers:{'User-Agent':'Mozilla/5.0',Referer:referer||new URL(url).origin+'/'},signal:AbortSignal.timeout(20000)});if(!r.ok||!r.headers.get('content-type')?.startsWith('image/'))throw Error(name+' invalid image '+r.status);const b=Buffer.from(await r.arrayBuffer());fs.writeFileSync('assets/'+name,b);console.log(name,b.length);}
(async()=>{
await Promise.allSettled([
['trackingtime-logo.svg','https://trackingtime.co/wp-content/themes/trackingtime-ACF/img/logo/logo-full-color.svg'],
['trackingtime-product.png','https://trackingtime.co/wp-content/uploads/2020/05/Ilustraciones-Website-Web-App_ReDesign_Hours-1152x963px-1-768x462.png'],
['cfotech-logo.png','https://www.cfotechlatam.com/img/logo.png'],
['cfotech-banner.png','https://www.cfotechlatam.com/img/background-hiring.png'],
['itr-banner.jpg','https://www.itrsa.com.ar/wp-content/uploads/2023/02/bg4-e1676404950391.jpg']
].map(([n,u])=>save(n,u).catch(e=>console.log(e.message))));
const s=await(await fetch('https://commons.wikimedia.org/wiki/File:NCR_logo_color.svg')).text();
const u=s.match(/class="fullImageLink"[^>]*><a href="([^"]+)/)?.[1]?.replaceAll('&amp;','&');if(u)await save('ncr-logo.svg',u);
})();

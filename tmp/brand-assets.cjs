const fs=require('node:fs');
async function save(name,url){const r=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(name+' '+r.status);const b=Buffer.from(await r.arrayBuffer());fs.writeFileSync('assets/'+name,b);console.log(name,b.length);}
(async()=>{
await Promise.allSettled([
['trackingtime-banner.png','https://trackingtime.co/wp-content/uploads/2025/09/Website-Imagen-Preview-Share_Home-1200x628px.png'],
['aune-logo.png','https://aunesa.com/wp-content/uploads/2024/07/Logo-Aune.png'],
['aune-banner.jpg','https://aunesa.com/wp-content/uploads/2026/05/laptop-phone-2-scaled-e1778254947256.jpg'],
['itr-logo.png','https://www.itrsa.com.ar/wp-content/uploads/2022/07/Logotipo_ITR_color_WEB_retina.png'],
['itr-banner.jpg','https://www.itrsa.com.ar/wp-content/uploads/2023/02/bg4-e1676404950391.jpg'],
['citi-logo.jpg','https://www.citigroup.com/rcs/citigpa/storage/public/citi-logo-rgb.jpg']
].map(([n,u])=>save(n,u).catch(e=>console.log(e.message))));
for(const path of ['css/style_homepage.css','css/style_generals.css','header.html']){const r=await fetch('https://www.cfotechlatam.com/'+path);const s=await r.text();fs.writeFileSync('tmp/cfotech-'+path.replaceAll('/','-'),s);console.log(path, [...new Set(s.match(/[^\s"'()<>]+\.(?:svg|png|jpg|webp)/g))].slice(0,25));}
})();

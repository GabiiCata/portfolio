const fs=require('node:fs');
let html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('    <section class="experience-section');
const end=html.indexOf('    <section class="education-band',start);
const old=html.slice(start,end);
const feedback=old.match(/<figure class="feedback[\s\S]*?<\/figure>/)[0];
const tech=`    <section class="tech-section" id="tecnologias" aria-labelledby="tech-title"><div class="container">
      <div class="section-heading"><div><p class="eyebrow">Mi stack principal</p><h2 id="tech-title">La base de lo que construyo.</h2></div><p>Backend, microservicios y datos.</p></div>
      <div class="tech-logos">
        <article class="tech-tile java-tile" data-tilt><div class="game-face tech-face tilt-surface"><span class="game-orbit" aria-hidden="true"></span><img src="assets/java-logo.svg" alt="" width="100" height="100" loading="lazy"><div class="tech-caption"><h3>Java</h3><p>Backend · Java 8–21</p></div><span class="tech-index" aria-hidden="true">01</span></div></article>
        <article class="tech-tile spring-tile" data-tilt><div class="game-face tech-face tilt-surface"><span class="game-orbit" aria-hidden="true"></span><img src="assets/spring-logo.svg" alt="" width="100" height="100" loading="lazy"><div class="tech-caption"><h3>Spring Boot</h3><p>APIs · Microservicios</p></div><span class="tech-index" aria-hidden="true">02</span></div></article>
        <article class="tech-tile postgres-tile" data-tilt><div class="game-face tech-face tilt-surface"><span class="game-orbit" aria-hidden="true"></span><img src="assets/postgresql-logo.svg" alt="" width="100" height="100" loading="lazy"><div class="tech-caption"><h3>PostgreSQL</h3><p>Datos · Persistencia</p></div><span class="tech-index" aria-hidden="true">03</span></div></article>
      </div>
    </div></section>

`;
const scene=(brand,img,logo,url,label,extra='')=>`<figure class="employer-scene ${extra}" data-parallax data-tilt>
  <img class="employer-image" src="assets/${img}" alt="${label}" width="960" height="540" loading="lazy" decoding="async">
  <div class="employer-logo tilt-surface"><span class="employer-orbit" aria-hidden="true"></span><img src="assets/${logo}" alt="${brand}" width="200" height="70" loading="lazy"></div>
  <figcaption><span>Imagen institucional</span><a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${brand}, sitio oficial (otra pestaña)">${brand} <span aria-hidden="true">↗</span></a></figcaption>
</figure>`;
const experience=`    <section class="experience-section section container chapter" id="experiencia" aria-labelledby="experience-title" data-chapter="Experiencia">
      <div class="section-heading reveal"><div><p class="eyebrow">01 / Experiencia</p><h2 id="experience-title">El recorrido detrás del código.</h2></div><p>De interfaces bancarias a backend senior.<br>SaaS, telecomunicaciones, transporte y banca.</p></div>
      <div class="career-story">
        <article class="career-panel" data-step id="trabajo-trackingtime">
          <div class="career-copy reveal"><div class="entry-top"><p class="date">2025 — presente</p><span class="current-label">Actualidad</span></div><h3>TrackingTime</h3><p class="entry-context">Producto SaaS</p><p>Desarrollo de funcionalidades y resolución de bugs complejos en un SaaS de alta demanda.</p><p class="career-tools">Java · MySQL · GitHub Actions</p><p class="career-note">Delivery asistido por IA con Codex y MCP.</p></div>
          ${scene('TrackingTime','trackingtime-product.png','trackingtime-logo.svg','https://trackingtime.co/','Interfaz de seguimiento de horas publicada por TrackingTime','trackingtime-scene')}
        </article>
        <article class="career-panel" data-step id="trabajo-cfotech">
          <div class="career-copy reveal"><p class="date">2021 — 2025</p><h3>CFOTech</h3><p class="entry-context">Claro · Nación Servicios / SUBE</p><p>CRM Java y microservicios para telecomunicaciones y transporte. Integraciones SOAP/REST y GCP.</p><p class="career-tools">Java · Spring Boot · PostgreSQL</p></div>
          ${scene('CFOTech','cfotech-banner.png','cfotech-logo.png','https://www.cfotechlatam.com/','Fondo de la identidad visual de CFOTech','cfotech-scene')}
        </article>
        <article class="career-cluster" data-step id="trabajo-banca">
          <div class="career-copy reveal"><div><p class="date">2019 — 2021</p><h3>AUNE, Citi y NCR</h3><p class="entry-context">SaaS · Banca</p></div><div><p>Procesos batch en Java/C++, Oracle, Vaadin y Docker. Soluciones ATM/ITM, Jira y discovery técnico con bancos.</p><p class="career-tools">Java / C++ · Oracle · Vaadin · Docker</p></div></div>
          <div class="banking-scenes">
            ${scene('AUNE','aune-banner.jpg','aune-logo.png','https://aunesa.com/','Presentación de Virtual Broker en el sitio institucional de AUNE','aune-scene')}
            ${scene('Citi','citi-banner.jpg','citi-logo.jpg','https://www.citigroup.com/','Fotografía institucional publicada por Citi','citi-scene')}
            ${scene('NCR','ncr-banner.jpg','ncr-logo.svg','https://www.ncratleos.com/','Cajero automático, imagen institucional de NCR Atleos','ncr-scene')}
          </div>
        </article>
        <article class="career-panel" data-step id="trabajo-itr">
          <div class="career-copy reveal"><p class="date">2018 — 2019</p><h3>ITR</h3><p class="entry-context">ISBAN Santander</p><p>Frontend AngularJS e inicio profesional en noviembre de 2018. Bootcamp de Java, Maven e integraciones.</p><p class="career-tools">AngularJS · Java · Maven</p></div>
          ${scene('ITR','itr-banner.jpg','itr-logo.png','https://www.itrsa.com.ar/','Imagen del universo utilizada en el sitio institucional de ITR','itr-scene')}
        </article>
      </div>
      ${feedback}
    </section>

`;
html=html.slice(0,start)+tech+experience+html.slice(end);
fs.writeFileSync('index.html',html);

# Gabriel Espina — CV interactivo

Portfolio estático que se recorre con scroll, sin desplegables ni contenido que requiera clics para aparecer.

## Contenido

- Presentación con foto real, Senior Java Developer y Java / Spring Boot / PostgreSQL.
- Experiencia completa desde noviembre de 2018 y feedback de Claro.
- Educación, proyectos propios y enlaces originales.
- Logos de tecnologías, universidades, escuela, CS2, Valorant y FC26 con profundidad sensible al mouse.
- Galería horizontal continua de proyectos, con pausa, foco de teclado y deslizamiento táctil.
- Paisajes de Potrerillos y Valle Grande con parallax, fotos personales y fútbol en Mendoza.
- Email y LinkedIn.

## Desarrollo local

No requiere instalar dependencias ni compilar:

```sh
node scripts/preview.mjs
```

Abrir http://127.0.0.1:8080/.

## Verificación

Con el servidor activo:

```sh
node scripts/verify.mjs
```

Requiere Node 22+ y Chrome. Admite `CHROME_PATH` y `PREVIEW_URL`. Verifica recorridos completos a 320, 390, 768 y 1440 px, teclado, imágenes, contacto, profundidad con mouse, parallax, avance y vuelta de la galería, pausa por hover y botón, gestos táctiles, movimiento reducido y contenido sin JavaScript. Guarda capturas de portada y secciones en `docs/preview-*.webp`.

## Archivos

- `index.html`: contenido semántico completo.
- `styles.css`: composición responsive, línea de tiempo, galería, profundidad y paisajes.
- `app.js`: progreso de lectura, apariciones, parallax, logos y galería.
- `assets/`: fotografías e identidades originales.
- `docs/redesign.md`: dirección visual y verificación.
- `docs/assets-sources.md`: fuentes, créditos y licencias de los nuevos recursos.

El scroll vertical es nativo. La galería se desplaza sola mientras está visible; se pausa con hover, foco, botón o interacción táctil, y al ocultar la pestaña. Un gesto táctil o desplazamiento horizontal manual la mantiene pausada hasta pulsar Reanudar. `prefers-reduced-motion` desactiva profundidad, parallax y avance automático, y muestra los proyectos en vertical. Todo el CV sigue disponible sin JavaScript, sin contenido oculto detrás de clics.

## Deploy

Se mantiene GitHub Pages mediante `.github/workflows/static.yml`, que publica la raíz del repositorio.

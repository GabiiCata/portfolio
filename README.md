# Gabriel Espina — CV interactivo

Portfolio estático que se recorre con scroll, sin desplegables ni contenido que requiera clics para aparecer.

## Contenido

- Presentación con foto real, Senior Java Developer y Java / Spring Boot / PostgreSQL.
- Experiencia completa desde noviembre de 2018 y feedback de Claro.
- Educación, proyectos propios y enlaces originales.
- CS2, Valorant, FC26, fútbol en Mendoza y escapadas a Potrerillos y San Rafael.
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

Requiere Node 22+ y Chrome. Admite `CHROME_PATH` y `PREVIEW_URL`. Verifica recorridos completos con scroll a 320, 390, 768 y 1440 px, visibilidad de la foto y contenido, enlaces de proyectos sin superposición, teclado, movimiento reducido y contenido sin JavaScript. Guarda capturas en `docs/preview-desktop.webp` y `docs/preview-mobile.webp`.

## Archivos

- `index.html`: contenido semántico completo.
- `styles.css`: composición responsive, línea de tiempo y proyectos que se superponen al avanzar en escritorio.
- `app.js`: progreso de lectura, sección activa, aparición de elementos y desplazamiento suave de la foto.
- `assets/`: fotografías e identidades originales.
- `docs/redesign.md`: dirección visual y verificación.

El scroll es nativo. No se interceptan gestos de rueda ni se fuerza navegación horizontal. `prefers-reduced-motion` desactiva desplazamientos y apilado. Todo el CV sigue disponible sin JavaScript.

## Deploy

Se mantiene GitHub Pages mediante `.github/workflows/static.yml`, que publica la raíz del repositorio.

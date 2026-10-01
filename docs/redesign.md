# Portfolio como CV interactivo

## Dirección

La landing presenta a Gabriel como Senior Java Developer. La primera pantalla muestra su foto real, explica el trabajo en backend y destaca Java, Spring Boot y PostgreSQL. Tipografía de tamaño contenido, fondo gris claro, acento azul verdoso y fotografías personales.

El recorrido continúa con experiencia, educación, proyectos, hobbies y contacto. Toda la información se lee mediante scroll, sin paneles cerrados, modales, carruseles manuales ni clics obligatorios.

## Movimiento

- Scroll nativo y barra discreta de progreso.
- Navegación que identifica la sección actual.
- Introducción de experiencia que permanece visible junto a la línea de tiempo en escritorio.
- Entradas que aparecen suavemente desde abajo o desde un costado, siempre legibles desde la carga.
- Galería horizontal continua de tres proyectos. Las copias visuales permiten un ciclo sin cortes; se excluyen de la navegación con teclado y de lectores de pantalla. Hover, foco y botón pausan la galería; el tacto permite deslizarla de forma nativa.
- Desplazamiento muy pequeño de la foto de portada al avanzar.
- El único bucle continuo corre mientras la galería está visible y activa. Se detiene con movimiento reducido o pestaña oculta.
- Logos con perspectiva CSS y capas en profundidad; el mouse mueve el arte sin desplazar las zonas de clic. En pantallas táctiles conservan su relieve estático.
- Dos escenas de Potrerillos y Valle Grande con parallax acotado a 55 px, sin interceptar el scroll. Juegos sobre fondo oscuro y fotografías personales como transición.

## Contenido real

Se conservaron la trayectoria original, formación, feedback y enlaces de MUR, Espina Comercial, Tusom, email y LinkedIn. Los hobbies provienen de las indicaciones del usuario. Las fotos personales originales se conservan; las nuevas fotografías de lugares tienen créditos visibles. Los logos de instituciones y juegos usan fuentes verificadas: ver [fuentes de recursos](assets-sources.md). LinkedIn pidió iniciar sesión y no permitió obtener las fotos universitarias del usuario.

## Referencias exploradas

La investigación inicial incluyó [Dennis Snellenberg](https://dennissnellenberg.com/), [Hana](https://hana.framer.media/) y [Rauno Freiberg](https://rauno.me/), además de Awwwards y Godly/Recent. La revisión actual prioriza el formato de CV solicitado: foto visible, profesión y stack claros, contenido abierto y lectura continua. Las referencias aportan principios de transición y jerarquía, no una plantilla copiada.

## Verificación

Chrome: escritorio y móvil. El script comprueba 320, 390, 768 y 1440 px y realiza dos recorridos completos en cada tamaño. Comprueba foto visible en la primera pantalla, ausencia de desbordamiento, imágenes cargadas, proyectos y enlaces alcanzables con teclado, pausa por hover/botón, vuelta del ciclo, gestos táctiles nativos, reacción al mouse y parallax. También comprueba preferencia real de movimiento reducido y CV completo sin JavaScript.

Revisión visual de portada, educación, galería, paisajes y juegos en escritorio y móvil. Se corrigió un desbordamiento causado por los elementos con perspectiva, conteniendo su pintura dentro de la galería. No se detectaron errores de JavaScript. La medición local de carga registró CLS 0; no representa una medición de producción.

# Portfolio como CV interactivo

## Dirección

La landing presenta a Gabriel como Senior Java Developer. La primera pantalla muestra su foto real, explica el trabajo en backend y destaca Java, Spring Boot y PostgreSQL. Tipografía de tamaño contenido, fondo gris claro, acento azul verdoso y fotografías personales.

El recorrido continúa con experiencia, educación, proyectos, hobbies y contacto. Toda la información se lee mediante scroll, sin paneles cerrados, modales, carruseles manuales ni clics obligatorios.

## Movimiento

- Scroll nativo y barra discreta de progreso.
- Navegación que identifica la sección actual.
- Introducción de experiencia que permanece visible junto a la línea de tiempo en escritorio.
- Entradas que aparecen suavemente desde abajo o desde un costado, siempre legibles desde la carga.
- Proyectos que se superponen progresivamente en escritorio de altura suficiente. En móvil y con movimiento reducido se muestran en flujo normal.
- Desplazamiento muy pequeño de la foto de portada al avanzar.
- Ningún bucle permanente de animación.

## Contenido real

Se conservaron la trayectoria original, formación, feedback y enlaces de MUR, Espina Comercial, Tusom, email y LinkedIn. Los hobbies provienen de la indicación explícita del usuario: CS2, Valorant, FC26, fútbol en Mendoza y escapadas a Potrerillos / San Rafael. Las fotografías son las que ya estaban en el repositorio; la imagen del lago se describe como Mendoza sin atribuirle un lugar más específico no verificado.

## Referencias exploradas

La investigación inicial incluyó [Dennis Snellenberg](https://dennissnellenberg.com/), [Hana](https://hana.framer.media/) y [Rauno Freiberg](https://rauno.me/), además de Awwwards y Godly/Recent. La revisión actual prioriza el formato de CV solicitado: foto visible, profesión y stack claros, contenido abierto y lectura continua. Las referencias aportan principios de transición y jerarquía, no una plantilla copiada.

## Verificación

Chrome: escritorio y móvil. El script comprueba 320, 390, 768 y 1440 px y realiza dos recorridos completos en cada tamaño, sin clics para descubrir información. Comprueba foto visible en la primera pantalla, ausencia de desbordamiento, proyectos y enlaces accesibles durante el apilado, navegación con teclado, preferencia real de movimiento reducido y CV completo sin JavaScript.

Revisión visual de la portada, proyectos y hobbies. Se corrigió la separación de palabras al retirar un salto de línea en móvil. No se detectaron errores de JavaScript. La medición local de carga registró CLS 0; no representa una medición de producción.

# Gabriel Espina - Portfolio

Landing page profesional de Gabriel Espina, Senior Java Developer especializado en Java, Spring Boot, microservicios, SaaS, CI/CD y flujos de desarrollo asistidos por IA.

## Estructura

- `index.html`: contenido principal y SEO básico.
- `styles.css`: sistema visual responsive sin frameworks externos.
- `app.js`: año dinámico del footer.
- `assets/`: foto de perfil local en JPG y WebP.

## Desarrollo local

Este portfolio es estático y no requiere instalación de dependencias.

```bash
python -m http.server 8080
```

Luego abrir `http://localhost:8080`.

## Deploy

El deploy se realiza con GitHub Pages mediante `.github/workflows/static.yml`, publicando el contenido de la raíz del repositorio.

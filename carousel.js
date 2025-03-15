document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-carousel');
    if (!skillsSection) return;

    // Agrupar tecnologías
    const groupedTechs = {};
    window.technologies.forEach(tech => {
        if (!groupedTechs[tech.group]) groupedTechs[tech.group] = [];
        groupedTechs[tech.group].push(tech);
    });

    // Limpiar contenedor
    skillsSection.innerHTML = '';

    // Crear carrusel para cada grupo
    Object.entries(groupedTechs).forEach(([group, techs]) => {
        const row = document.createElement('div');
        row.className = 'carousel-row mb-6';
        
        row.innerHTML = `
            <div class="group-header">
                <h3 class="group-title">${group.charAt(0).toUpperCase() + group.slice(1)}</h3>
                <span class="tech-count">${techs.length} tecnologías</span>
            </div>
            <div class="carousel-wrapper">
                <div class="carousel-track">
                    ${techs.map(tech => `
                        <div class="skill-item">
                            <img src="${tech.icon}" alt="${tech.name}">
                            <h4>${tech.name}</h4>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        skillsSection.appendChild(row);

        // Duplicar items para scroll infinito
        const track = row.querySelector('.carousel-track');
        track.innerHTML += track.innerHTML;

        // Configurar animación
        let position = 0;
        const speed = 0.5 + Math.random() * 0.5; // Velocidad aleatoria para cada fila
        const direction = group.length % 2 === 0 ? -1 : 1; // Dirección alterna

        function animate() {
            position += speed * direction;
            const limit = track.scrollWidth / 2;

            if (Math.abs(position) >= limit) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }

        // Pausar en hover
        track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
        track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');

        animate();
    });
});

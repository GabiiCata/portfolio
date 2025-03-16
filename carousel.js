document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-carousel');
    if (!skillsSection) return;

    const groupedTechs = window.technologies.reduce((acc, tech) => {
        if (!acc[tech.group]) acc[tech.group] = [];
        acc[tech.group].push(tech);
        return acc;
    }, {});

    // Convertir en array para poder asignar direcciones alternadas
    const groups = Object.entries(groupedTechs);
    groups.forEach(([group, technologies], index) => {
        const row = document.createElement('div');
        row.className = 'carousel-row';

        row.innerHTML = `
      
            <div class="carousel-wrapper">
                <div class="carousel-track"></div>
            </div>
        `;

        const track = row.querySelector('.carousel-track');
        const itemWidth = 132; // 100px + 32px gap
        const screenWidth = window.innerWidth;
        const repetitions = Math.ceil((screenWidth * 3) / (itemWidth * technologies.length));

        // Duplicar elementos
        for (let i = 0; i < repetitions; i++) {
            technologies.forEach(tech => {
                const item = document.createElement('div');
                item.className = 'skill-item';
                item.innerHTML = `
                    <img src="${tech.icon}" alt="${tech.name}" loading="lazy">
                    <h4>${tech.name}</h4>
                `;
                track.appendChild(item);
            });
        }

        skillsSection.appendChild(row);

        // Configurar animación con dirección alternada
        let currentPosition = 0;
        const speed = 0.2; // Velocidad reducida
        const direction = index % 2 === 0 ? 1 : -1;
        
        function updatePosition() {
            if (!track.isHovered) {
                currentPosition += speed * direction;
                const totalWidth = technologies.length * itemWidth;

                // Reset position when reaching limits
                if (direction > 0) {
                    if (currentPosition >= totalWidth) currentPosition = 0;
                } else {
                    if (currentPosition <= -totalWidth) currentPosition = 0;
                }

                track.style.transform = `translateX(${-currentPosition}px)`;
            }
            requestAnimationFrame(updatePosition);
        }

        track.isHovered = false;
        track.addEventListener('mouseenter', () => track.isHovered = true);
        track.addEventListener('mouseleave', () => track.isHovered = false);

        updatePosition();
    });
});

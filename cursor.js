const cursor = document.getElementById('custom-cursor');

// Añadir elementos para cañones y propulsores
const elements = ['cannon-left', 'cannon-right', 'thruster-left', 'thruster-right'];
elements.forEach(className => {
    const element = document.createElement('div');
    element.className = className;
    cursor.appendChild(element);
});

let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', (e) => {
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    
    // Calcular el ángulo basado en la dirección del movimiento
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    // Ajustar el ángulo para que la nave apunte en la dirección del movimiento
    angle = angle + 90; // Rotación adicional para orientar la nave correctamente
    
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(${angle}deg)`;
    
    lastX = e.clientX;
    lastY = e.clientY;
});

// Función para crear y animar proyectiles
document.addEventListener('click', (e) => {
    // Obtener la rotación actual de la nave
    const currentRotation = parseFloat(cursor.style.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] || 0);
    
    // Convertir el ángulo a radianes
    const angleRad = (currentRotation - 90) * (Math.PI / 180);
    
    ['left', 'right'].forEach(side => {
        const projectile = document.createElement('div');
        projectile.className = 'projectile';
        document.body.appendChild(projectile);

        // Posición inicial basada en la posición del cursor y el lado del cañón
        const offset = side === 'left' ? -8 : 8;
        projectile.style.left = (e.clientX + offset) + 'px';
        projectile.style.top = (e.clientY + 15) + 'px';

        // Calcular la dirección del movimiento basada en el ángulo
        const distance = 1000; // Distancia del movimiento
        const targetX = Math.cos(angleRad) * distance;
        const targetY = Math.sin(angleRad) * distance;

        // Animar el proyectil en la dirección de la nave
        requestAnimationFrame(() => {
            projectile.style.transform = `
                translate(${targetX}px, ${targetY}px) 
                rotate(${currentRotation}deg)
            `;
            setTimeout(() => projectile.remove(), 500);
        });
    });
});

// Efecto hover para elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .experience-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
        cursor.classList.remove('hover');
    });
});

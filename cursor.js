const cursor = document.getElementById('custom-cursor');

// Añadir elementos para cañones y propulsores
const elements = ['cannon-left', 'cannon-right', 'thruster-left', 'thruster-right'];
elements.forEach(className => {
    const element = document.createElement('div');
    element.className = className;
    cursor.appendChild(element);
});

let lastX = 0;

document.addEventListener('mousemove', (e) => {
    const deltaX = e.clientX - lastX;
    const rotation = deltaX * 0.5; // Ajusta la rotación basada en el movimiento horizontal
    
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(${rotation}deg)`;
    lastX = e.clientX;
});

// Función para crear y animar proyectiles
document.addEventListener('click', (e) => {
    // Obtener la rotación actual de la nave
    const currentRotation = parseFloat(cursor.style.transform.match(/rotate\(([-\d.]+)deg\)/)?.[1] || 0);
    
    ['left', 'right'].forEach(side => {
        const projectile = document.createElement('div');
        projectile.className = 'projectile';
        document.body.appendChild(projectile);

        // Posición inicial basada en la posición del cursor y el lado del cañón
        const offset = side === 'left' ? -8 : 8;
        projectile.style.left = (e.clientX + offset) + 'px';
        projectile.style.top = (e.clientY + 15) + 'px';
        
        // Aplicar la misma rotación que tiene la nave
        projectile.style.transform = `rotate(${currentRotation}deg)`;

        // Animar el proyectil considerando la rotación
        requestAnimationFrame(() => {
            projectile.style.transform = `translateY(-100vh) rotate(${currentRotation}deg)`;
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

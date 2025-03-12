const cursor = document.getElementById('custom-cursor');

// Posición inicial del cursor
cursor.style.left = '-100px';
cursor.style.top = '-100px';

document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Efecto hover para elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .experience-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(255, 255, 255, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'rgba(255, 255, 255, 0.3)';
    });
});

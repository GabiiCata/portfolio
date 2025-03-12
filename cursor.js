const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Efecto hover para elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .experience-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
        cursor.style.background = 'rgba(255, 255, 255, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
        cursor.style.background = 'rgba(255, 255, 255, 0.3)';
    });
});

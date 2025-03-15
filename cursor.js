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
        const distance = 1000;
        const targetX = Math.cos(angleRad) * distance;
        const targetY = Math.sin(angleRad) * distance;

        // Seguir la trayectoria del proyectil y verificar colisiones
        const checkCollision = setInterval(() => {
            const projectileRect = projectile.getBoundingClientRect();
            const spheres = window.threejsNodes || [];
            
            if (spheres.length > 0) {
                spheres.forEach(sphere => {
                    // Obtener la posición del nodo en el espacio 3D considerando todas las transformaciones
                    const vector = new THREE.Vector3();
                    vector.setFromMatrixPosition(sphere.matrixWorld);
                    vector.project(window.threeCamera);
                    
                    const container = document.getElementById('three-container');
                    const containerRect = container.getBoundingClientRect();
                    
                    // Calcular la posición en pantalla considerando la rotación del grupo
                    const x = ((vector.x + 1) / 2) * containerRect.width + containerRect.left + (window.innerWidth * 0.2);
                    const y = ((-vector.y + 1) / 2) * containerRect.height + containerRect.top;
                    
                    const distance = Math.hypot(
                        x - (projectileRect.left + projectileRect.width/2),
                        y - (projectileRect.top + projectileRect.height/2)
                    );
                    
                    if (distance < 50 && sphere.visible) {
                        createExplosion(x, y);
                        sphere.visible = false;
                        sphere.parent.remove(sphere);
                        clearInterval(checkCollision);
                        projectile.remove();
                    }
                });
            }
        }, 16);

        // Animar el proyectil
        requestAnimationFrame(() => {
            projectile.style.transform = `
                translate(${targetX}px, ${targetY}px) 
                rotate(${currentRotation}deg)
            `;
            
            // Limpiar después de la animación
            setTimeout(() => {
                projectile.remove();
                clearInterval(checkCollision);
            }, 500);
        });
    });
});

function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function createExplosion(x, y) {
    // Más partículas y más lentas
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        document.body.appendChild(particle);

        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = 2 + Math.random() * 8; // Velocidad reducida
        const size = 4 + Math.random() * 6; // Tamaño aumentado

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        // Colores más brillantes para la explosión
        particle.style.backgroundColor = `hsl(${Math.random() * 60 + 10}, 100%, ${50 + Math.random() * 50}%)`;

        const animation = particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * velocity * 50}px, ${Math.sin(angle) * velocity * 50}px) scale(0)`, opacity: 0 }
        ], {
            duration: 2000, // Duración aumentada a 2 segundos
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' // Curva de animación más suave
        });

        animation.onfinish = () => particle.remove();
    }
}

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

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Experience data
const experiences = [
    {
        "role": "Java Developer",
        "company": "CFOTech",
        "logo": "https://congreso.america-digital.com/wp-content/uploads/2025/02/cfo-tech-300x200-1.png",
        "period": "enero de 2024 - Presente",
        "description": "Software Factory en Claro, trabajando en el mantenimiento y refactorización de un CRM en Java.",
        "responsibilities": [
            "Refactoricé y mantuve un CRM en Java 11 con Spring Boot para la creación de paquetes de servicios como telefonía móvil, internet y TV.",
            "Integré nuevos microservicios para desacoplar el monolito, principalmente mediante websockets y un servicio de notificación.",
            "Asistí a mi líder técnico en la resolución de errores de despliegue, aumentando el número de pods y optimizando el uso de memoria."
        ]
    },
    {
        "role": "Java Backend Developer",
        "company": "CFOTech",
        "logo": "https://congreso.america-digital.com/wp-content/uploads/2025/02/cfo-tech-300x200-1.png",
        "period": "agosto de 2021 - enero de 2024",
        "description": "Desarrollo de microservicios para la aplicación SUBE en Java con Spring Boot y PostgreSQL.",
        "responsibilities": [
            "Desarrollé el microservicio encargado de gestionar las peticiones de carga de la tarjeta SUBE.",
            "Implementé integraciones con servicios internos mediante HTTP (RestTemplate y WebClient) y SOAP.",
            "Configuré límites dentro de la aplicación, incluyendo cantidad de cargas diarias/mensuales y montos disponibles.",
            "Realicé el deployment en Google Cloud Platform (GCP) bajo una arquitectura orientada a microservicios."
        ]
    },
    {
        "role": "Java Web Developer",
        "company": "AUNE",
        "logo": "https://aunesa.com/wp-content/uploads/2021/10/Logo-Aune-Blanco.png",
        "period": "febrero de 2021 - agosto de 2021",
        "description": "Desarrollo de Higyrus, una aplicación SaaS para gestionar clientes de inversión en Argentina.",
        "responsibilities": [
            "Desarrollamos la aplicación utilizando Java 11 y Vaadin.",
            "Construí imágenes Docker con configuraciones personalizadas para la arquitectura SaaS.",
            "Resolví incidencias críticas reportadas por clientes con mayor prioridad que las tareas del sprint."
        ]
    },
    {
        "role": "Java Software Developer",
        "company": "Citi",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Citi.svg/2560px-Citi.svg.png",
        "period": "octubre de 2019 - febrero de 2021",
        "description": "Migración de contratos digitales a bases de datos Oracle en conjunto con Citibank Brasil y México.",
        "responsibilities": [
            "Desarrollé procesos batch en Java 8 y C++ para la migración de datos.",
            "Integré la metodología Scrum para organizar tareas y reuniones dentro del equipo."
        ]
    },
    {
        "role": "IT Consultant",
        "company": "NCR Corporation",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/NCR_logo_color.svg/2560px-NCR_logo_color.svg.png",
        "period": "marzo de 2019 - octubre de 2019",
        "description": "Desarrollo de interfaces para cajeros automáticos (ATM/ITM) en bancos de Buenos Aires.",
        "responsibilities": [
            "Realicé relevamientos en bancos para desarrollar el frontend de los cajeros automáticos.",
            "Capacité equipos sobre el hardware y flujo de operaciones de los ATM.",
            "Administré el ambiente Atlassian Jira, gestionando tickets, dailys y retrospectivas.",
            "Investigación del flujo de operaciones de cajeros para detectar dinero perdido, fraudes y errores en la aplicación."
        ]
    },
    {
        "role": "Frontend Developer",
        "company": "ITR",
        "logo": "https://media.glassdoor.com/sqll/1721857/it-resources-squarelogo-1584110459625.png",
        "period": "noviembre de 2018 - marzo de 2019",
        "description": "Mejoras en la interfaz de usuario del proyecto ISBAN Santander.",
        "responsibilities": [
            "Desarrollé mejoras en la UI utilizando AngularJS.",
            "Realicé un bootcamp inicial sobre Java e integraciones con Maven."
        ]
    },
    {
        "role": "IT Support Technician",
        "company": "Automóvil Club Argentino",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aca_arg_logo.svg/1280px-Aca_arg_logo.svg.png",
        "period": "abril de 2015 - agosto de 2018",
        "description": "Mantenimiento de hardware para estaciones YPF en toda Argentina.",
        "responsibilities": [
            "Armado y mantenimiento de hardware en estaciones de servicio.",
            "Soporte técnico y resolución de problemas en equipos informáticos."
        ]
    }
];


// Update skills data
const skills = [
    { name: 'Java', versions: '8, 11, 17', icon: '☕' },
    { name: 'Spring Boot', versions: '', icon: '🍃' },
    { name: 'Hibernate + JPA', versions: '', icon: '📊' },
    { name: 'Docker', versions: '', icon: '🐋' },
    { name: 'PostgreSQL / Oracle', versions: '', icon: '💾' },
    { name: 'Microservices', versions: '', icon: '🔄' },
    { name: 'REST API', versions: '', icon: '🌐' },
    { name: 'Git / GitHub', versions: '', icon: '📝' },
    { name: 'Design Patterns', versions: '', icon: '⚡' },
    { name: 'Scrum', versions: '', icon: '🔄' }
]; 

// Load skills
// function loadSkills() {
//     const skillsContainer = document.querySelector('#skills .grid');
//     skills.forEach(skill => {
//         const card = document.createElement('div');
//         card.className = 'skill-card';
//         card.innerHTML = `
//             <div class="text-3xl mb-4">${skill.icon}</div>
//             <h3 class="text-xl font-bold">${skill.name}</h3>
//             ${skill.versions ? `<p class="text-gray-400 text-sm">${skill.versions}</p>` : ''}
//         `;
//         skillsContainer.appendChild(card);
//     });
// }

function loadExperience() {
    const experienceContainer = document.querySelector('#experience .space-y-8');
    experienceContainer.innerHTML = '';
    experienceContainer.className = 'timeline-container';

    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-line-container';
    
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    
    const stardustTrail = document.createElement('div');
    stardustTrail.className = 'stardust-trail';
    
    timelineLine.appendChild(stardustTrail);
    timelineContainer.appendChild(timelineLine);

    const experiencesContainer = document.createElement('div');
    experiencesContainer.className = 'experiences-container';

    const sortedExperiences = [...experiences].sort((a, b) => {
        const yearA = parseInt(a.period.split(' ')[2]) || parseInt(a.period.split(' ')[3]);
        const yearB = parseInt(b.period.split(' ')[2]) || parseInt(b.period.split(' ')[3]);
        return yearB - yearA;
    });

    sortedExperiences.forEach((exp, index) => {
        const card = document.createElement('div');
        card.className = 'experience-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="experience-date" title="${exp.period}">${exp.period}</div>
            <div class="experience-role">${exp.role}</div>
            <div class="experience-company">${exp.company}</div>
        `;
        
        card.addEventListener('mouseenter', (e) => showModal(exp, e.currentTarget));
        card.addEventListener('mouseleave', hideModal);
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            showModal(exp, e.currentTarget);
        });
        
        experiencesContainer.appendChild(card);
    });

    experienceContainer.appendChild(timelineContainer);
    experienceContainer.appendChild(experiencesContainer);

    initTimelineScroll();
}

function initTimelineScroll() {
    const stardustTrail = document.querySelector('.stardust-trail');
    const experiencesContainer = document.querySelector('.experiences-container');
    let ticking = false;

    const updateScroll = () => {
        const containerRect = experiencesContainer.getBoundingClientRect();
        const scrollPercentage = Math.max(0, Math.min(1, 
            (window.innerHeight/2 - containerRect.top) / 
            (containerRect.height + window.innerHeight/2)
        ));
        
        stardustTrail.style.top = `${scrollPercentage * 100}%`;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateScroll();
}

function showModal(exp, element) {
    if (element.modal) return;
    
    const modal = document.createElement('div');
    modal.className = 'experience-modal';
    
    modal.innerHTML = `
        <div class="modal-header">
            <div class="company-info">
                <img src="${exp.logo}" alt="${exp.company}" class="company-logo">
                <h3 class="company-name">${exp.company}</h3>
            </div>
        </div>
        <div class="modal-content">
            <p class="text-gray-300 mb-4">${exp.description}</p>
            <ul class="space-y-2">
                ${exp.responsibilities.map(r => `
                    <li class="text-gray-400 flex items-start">
                        <span class="text-blue-400 mr-2">▹</span>
                        ${r}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    // Posicionamiento responsivo del modal
    if (window.innerWidth <= 1024) {
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.right = 'auto';
    } else {
        const rect = element.getBoundingClientRect();
        modal.style.right = '2rem';
    }
    
    document.body.appendChild(modal);
    element.modal = modal;
    
    requestAnimationFrame(() => {
        modal.classList.add('visible');
    });
}

function hideModal(event) {
    if (event.currentTarget.modal) {
        event.currentTarget.modal.remove();
        event.currentTarget.modal = null;
    }
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typed.js
    const typed = new Typed('#typed', {
        strings: [
            'Especializado en desarrollo backend',
            'Experiencia en sistemas distribuidos',
            'Apasionado por la arquitectura de software',
            'Enfocado en soluciones escalables'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Load content
    // loadSkills();
    loadExperience();
    
    // Initialize observers after content is loaded
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
    }, 100);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function initializeObservers() {
    // Reinitialize observer for new elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

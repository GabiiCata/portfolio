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
        "period": "enero de 2024 - Presente (1 año 3 meses)",
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
        "period": "agosto de 2021 - enero de 2024 (2 años 6 meses)",
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
        "period": "febrero de 2021 - agosto de 2021 (7 meses)",
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
        "period": "octubre de 2019 - febrero de 2021 (1 año 5 meses)",
        "description": "Migración de contratos digitales a bases de datos Oracle en conjunto con Citibank Brasil y México.",
        "responsibilities": [
            "Desarrollé procesos batch en Java 8 y C++ para la migración de datos.",
            "Integré la metodología Scrum para organizar tareas y reuniones dentro del equipo."
        ]
    },
    {
        "role": "IT Consultant",
        "company": "NCR Corporation",
        "period": "marzo de 2019 - octubre de 2019 (8 meses)",
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
        "period": "noviembre de 2018 - marzo de 2019 (5 meses)",
        "description": "Mejoras en la interfaz de usuario del proyecto ISBAN Santander.",
        "responsibilities": [
            "Desarrollé mejoras en la UI utilizando AngularJS.",
            "Realicé un bootcamp inicial sobre Java e integraciones con Maven."
        ]
    },
    {
        "role": "IT Support Technician",
        "company": "Automóvil Club Argentino",
        "period": "abril de 2015 - agosto de 2018 (3 años 5 meses)",
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
    experienceContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8', 'p-4');
    experienceContainer.classList.add('flex', 'flex-col', 'gap-16', 'p-4', 'max-w-6xl', 'mx-auto');
    
    // Agrupar experiencias por año
    const experiencesByYear = {};
    experiences.forEach(exp => {
        const year = exp.period.split(' ')[2] || exp.period.split(' ')[3]; // Extraer año
        if (!experiencesByYear[year]) {
            experiencesByYear[year] = [];
        }
        experiencesByYear[year].push(exp);
    });

    // Crear filas por año, ordenadas de más reciente a más antigua
    Object.keys(experiencesByYear)
        .sort((a, b) => b - a)
        .forEach(year => {
            const yearSection = document.createElement('div');
            yearSection.className = 'experience-year-section w-full';
            
            // Añadir el año como título
            yearSection.innerHTML = `
                <h3 class="text-3xl font-bold text-blue-400 mb-8 pl-4 border-l-4 border-blue-400">${year}</h3>
                <div class="space-y-6 w-full">
                </div>
            `;
            
            const cardsContainer = yearSection.querySelector('div');
            
            experiencesByYear[year].forEach(exp => {
                const card = document.createElement('div');
                card.className = 'experience-card fade-in bg-gray-800/70 backdrop-blur-lg rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl border border-gray-700/50 flex flex-col md:flex-row gap-8 w-full';
                
                const responsibilitiesList = exp.responsibilities
                    .map(resp => `<li class="mb-2 text-gray-400 flex items-start">
                        <span class="text-blue-400 mr-2 mt-1">▹</span>
                        <span>${resp}</span>
                    </li>`)
                    .join('');

                card.innerHTML = `
                    <div class="flex-none md:w-1/3">
                        <span class="inline-block px-3 py-1 text-sm text-blue-400 bg-blue-400/10 rounded-full mb-4">${exp.period}</span>
                        <h3 class="text-2xl font-bold text-blue-400 mb-2">${exp.role}</h3>
                        <div class="text-lg font-medium text-gray-300 mb-4">${exp.company}</div>
                        <p class="text-gray-300 text-sm">${exp.description}</p>
                    </div>
                    <div class="flex-grow md:w-2/3">
                        <ul class="space-y-2 list-none text-sm">
                            ${responsibilitiesList}
                        </ul>
                    </div>
                `;
                
                cardsContainer.appendChild(card);
            });
            
            experienceContainer.appendChild(yearSection);
        });
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

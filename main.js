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
        company: 'CFOTech',
        period: '2021 - Presente',
        role: 'Java Developer Senior',
        description: 'Desarrollo de Higyrus, una app SaaS en Java 11 con Vaadin.'
    },
    {
        company: 'AUNE MAV',
        period: '2021',
        role: 'Java Developer',
        description: 'Desarrollo de un CRM con Java 11 y Spring Boot.'
    },
    {
        company: 'Citibank',
        period: '2019 - 2021',
        role: 'Backend Developer',
        description: 'Procesos batch con Java 8 y C++ para Oracle.'
    },
    {
        company: 'NCR',
        period: '2019',
        role: 'Software Developer',
        description: 'Configuración de cajeros automáticos con JavaScript.'
    },
    {
        company: 'ITR',
        period: '2018 - 2019',
        role: 'Frontend Developer',
        description: 'Desarrollo en AngularJS para ISBAN Santander.'
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
    experiences.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'experience-card fade-in';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-bold text-blue-400">${exp.company}</h3>
                    <p class="text-lg font-medium">${exp.role}</p>
                </div>
                <span class="text-gray-400">${exp.period}</span>
            </div>
            <p class="text-gray-300">${exp.description}</p>
        `;
        experienceContainer.appendChild(card);
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

const techLogos = {
    JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    Ruby: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    Vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    Angular: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg'
};

function detectTechnologies(repo) {
    const description = repo.description ? repo.description.toLowerCase() : '';
    const techs = [];
    
    if (repo.language) techs.push(repo.language);
    if (description.includes('docker')) techs.push('Docker');
    if (description.includes('mongodb')) techs.push('MongoDB');
    if (description.includes('mysql')) techs.push('MySQL');
    if (description.includes('postgresql')) techs.push('PostgreSQL');
    if (description.includes('react')) techs.push('React');
    if (description.includes('vue')) techs.push('Vue');
    if (description.includes('angular')) techs.push('Angular');
    
    return techs;
}

async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/GabiiCata/repos');
        const repos = await response.json();
        
        const projectsContainer = document.getElementById('github-projects');
        
        repos.forEach(repo => {
            if (!repo.fork && !repo.private) {
                const projectCard = createProjectCard(repo);
                projectsContainer.appendChild(projectCard);
            }
        });
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
    }
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card hover-trigger group';
    
    const technologies = detectTechnologies(repo);
    const techLogosHTML = technologies
        .filter(tech => techLogos[tech])
        .map(tech => `
            <div class="tech-item-container">
                <img 
                    src="${techLogos[tech]}" 
                    alt="${tech}" 
                    title="${tech}"
                    class="w-8 h-8 tech-logo group-hover:grayscale-0"
                />
                <span class="tech-tooltip">${tech}</span>
            </div>
        `).join('');

    card.innerHTML = `
        <div class="relative overflow-hidden rounded-t-xl mb-4 bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <div class="flex items-start justify-between">
                <h3 class="text-2xl font-bold project-title relative z-10">${repo.name}</h3>
                <span class="text-xs px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full text-blue-300">
                    ${repo.language || 'N/A'}
                </span>
            </div>
        </div>
        
        <div class="px-4 pb-4">
            <p class="text-gray-300 mb-6 text-sm leading-relaxed min-h-[60px]">
                ${repo.description || 'No description available'}
            </p>

            <div class="tech-stack-container backdrop-blur-sm">
                <p class="text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">Tecnologías</p>
                <div class="flex gap-4 flex-wrap items-center">
                    ${techLogosHTML}
                </div>
            </div>

            <div class="mt-6 flex justify-between items-center">
                <a href="${repo.html_url}" 
                   target="_blank" 
                   class="project-button">
                    <span>Ver proyecto</span>
                    <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                </a>
                <div class="flex items-center gap-2 text-gray-400">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span class="text-xs">${repo.stargazers_count} stars</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

const projects = [
    {
        name: "Sistema de Gestión de Pagos SUBE",
        description: "Microservicio desarrollado con Spring Boot para gestionar las cargas virtuales de la tarjeta SUBE. Incluye integración con múltiples servicios y manejo de transacciones distribuidas.",
        technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "GCP"],
        highlights: [
            "Arquitectura hexagonal",
            "Patrones CQRS",
            "Tests unitarios y de integración",
            "CI/CD con Jenkins"
        ],
        image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/spring-boot/spring-boot.png"
    },
    {
        name: "CRM Claro",
        description: "Refactorización y mantenimiento de un sistema CRM para la gestión de servicios de telefonía, internet y TV. Implementación de nuevos microservicios y mejoras de rendimiento.",
        technologies: ["Java", "Spring", "WebSockets", "Kubernetes"],
        highlights: [
            "Desacoplamiento de monolito",
            "Optimización de rendimiento",
            "Integración con APIs externas",
            "Monitoreo con Prometheus"
        ],
        image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png"
    },
    {
        name: "Higyrus SaaS",
        description: "Aplicación web para la gestión de inversiones desarrollada con Java y Vaadin. Implementación de arquitectura multi-tenant y contenedores Docker.",
        technologies: ["Java", "Vaadin", "Docker", "MySQL"],
        highlights: [
            "Arquitectura SaaS",
            "Multi-tenancy",
            "Seguridad por tenant",
            "Reportes en tiempo real"
        ],
        image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/java/java.png"
    }
];

function loadProjects() {
    const container = document.getElementById('github-projects');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card bg-gray-800/70 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-700/50 flex flex-col';
        
        const technologies = project.technologies
            .map(tech => `<span class="px-2 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">${tech}</span>`)
            .join('');
            
        const highlights = project.highlights
            .map(highlight => `<li class="flex items-start mb-2">
                <span class="text-blue-400 mr-2">▹</span>
                ${highlight}
            </li>`)
            .join('');

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex-grow">
                    <h3 class="text-xl font-bold text-blue-400 mb-2">${project.name}</h3>
                    <p class="text-gray-300 text-sm mb-4">${project.description}</p>
                </div>
                <img src="${project.image}" alt="${project.name}" class="w-12 h-12 object-contain ml-4">
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                ${technologies}
            </div>
            <div class="flex-grow">
                <h4 class="text-sm font-semibold text-gray-300 mb-2">Aspectos Destacados:</h4>
                <ul class="text-sm text-gray-400">
                    ${highlights}
                </ul>
            </div>
            <div class="flex justify-end mt-4">
                <button class="px-4 py-2 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                    Ver más detalles
                </button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

const GITHUB_USERNAME = 'GabiiCata';
const REPOS_TO_SHOW = 6; // Número de repos a mostrar

async function loadGitHubProjects() {
    const container = document.getElementById('github-projects');
    const loader = document.querySelector('.project-loader');
    
    try {
        loader?.classList.remove('hidden');
        
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${REPOS_TO_SHOW}`);
        const repos = await response.json();

        container.innerHTML = ''; // Limpiar contenedor

        for (const repo of repos) {
            if (!repo.fork) { // Mostrar solo repos originales, no forks
                // Obtener lenguajes usados
                const languagesResponse = await fetch(repo.languages_url);
                const languages = await languagesResponse.json();
                const mainLanguages = Object.keys(languages).slice(0, 3);

                const card = document.createElement('div');
                card.className = 'project-card fade-in bg-gray-800/70 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 border border-gray-700/50';
                
                card.innerHTML = `
                    <div class="flex flex-col h-full">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h3 class="text-xl font-bold text-blue-400 mb-2">
                                    ${repo.name}
                                </h3>
                                <p class="text-gray-300 text-sm mb-4">
                                    ${repo.description || 'No description available'}
                                </p>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="text-xs text-gray-400">
                                    ${repo.stargazers_count} ⭐
                                </span>
                                <span class="text-xs text-gray-400">
                                    ${repo.forks_count} 🔄
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${mainLanguages.map(lang => 
                                `<span class="px-2 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full">
                                    ${lang}
                                </span>`
                            ).join('')}
                        </div>
                        <div class="mt-auto pt-4 flex justify-end">
                            <a href="${repo.html_url}" 
                               target="_blank" 
                               class="inline-flex items-center px-4 py-2 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                                Ver proyecto
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                `;
                
                container.appendChild(card);
            }
        }
    } catch (error) {
        console.error('Error loading GitHub projects:', error);
        container.innerHTML = `
            <div class="text-center text-gray-400">
                <p>Error loading projects. Please try again later.</p>
            </div>
        `;
    } finally {
        loader?.classList.add('hidden');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadGitHubProjects);

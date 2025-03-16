let scene, camera, renderer, nodes, lines;
let mouseX = 0, mouseY = 0;
let stars, starsGeometry; // Add these variables

// Make technologies array globally available
window.technologies = [
    // Backend & Java Ecosystem
    { name: 'Java', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg', color: 0xf89820, group: 'backend' },
    { name: 'Spring', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg', color: 0x6db33f, group: 'backend' },
    { name: 'Hibernate', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/hibernate/hibernate-original.svg', color: 0xbcae79, group: 'backend' },
    { name: 'Maven', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/maven/maven-original.svg', color: 0xc71a36, group: 'backend' },
    { name: 'C++', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg', color: 0x00599c, group: 'backend' },
    { name: 'RabbitMQ', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/rabbitmq/rabbitmq-original.svg', color: 0xf8dc75, group: 'backend' },
    { name: 'Kafka', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/apachekafka/apachekafka-original.svg', color: 0x231f20, group: 'backend' },
    { name: 'JUnit', icon: 'https://svgicons.com/api/ogimage/?id=26052&n=junit', color: 0x25a162, group: 'backend' },
    { name: 'Mockito', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Mockito_Logo.png', color: 0x3a3a3a, group: 'backend' },
    { name: 'SonarQube', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/sonarqube/sonarqube-original.svg', color: 0x4e9bcd, group: 'backend' },
    { name: 'Swagger', icon: 'https://icon.icepanel.io/Technology/svg/Swagger.svg', color: 0x85ea2d, group: 'backend' },
    { name: 'Tomcat', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tomcat/tomcat-original.svg', color: 0xf8dc75, group: 'backend' },

    // Databases
    { name: 'PostgreSQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg', color: 0x336791, group: 'database' },
    { name: 'MySQL', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg', color: 0x00758f, group: 'database' },
    { name: 'Oracle', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/oracle/oracle-original.svg', color: 0xf80000, group: 'database' },
    { name: 'SQL Server', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', color: 0xcc2927, group: 'database' },

    // Infrastructure & Control
    { name: 'Git', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg', color: 0xf05032, group: 'infrastructure' },
    { name: 'GitHub', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg', color: 0x181717, group: 'infrastructure' },
    { name: 'GitLab', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg', color: 0xfca326, group: 'infrastructure' },
    { name: 'Docker', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg', color: 0x2496ed, group: 'infrastructure' },
    { name: 'Jenkins', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg', color: 0xd24939, group: 'infrastructure' },
    { name: 'OpenShift', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redhat/redhat-original.svg', color: 0x326ce5, group: 'infrastructure' },
    { name: 'Bitbucket', icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bitbucket-icon.png', color: 0xfca326, group: 'infrastructure' },




    // Metodologías Ágiles
    { name: 'Agile', icon: 'https://www.reshot.com/preview-assets/icons/9B42UZ3GA7/agile-looping-arrow-9B42UZ3GA7.svg', color: 0x47b4ff, group: 'methodology' },
    { name: 'Kanban', icon: 'https://www.svgrepo.com/show/374930/kanban.svg', color: 0x026aa7, group: 'methodology' },
    { name: 'Scrum', icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-scrum-ux-and-ui-icons-flaticons-lineal-color-flat-icons-2.png', color: 0x2d8c7f, group: 'methodology' },
    { name: 'Trello', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/trello/trello-plain.svg', color: 0x026aa7, group: 'methodology' },
    { name: 'Jira', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg', color: 0x0052cc, group: 'methodology' },
    { name: 'MS Teams', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg', color: 0x6264a7, group: 'methodology' },
    { name: 'Confluence', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/confluence/confluence-original.svg', color: 0x172b4d, group: 'methodology' },
    { name: 'Windows 11', icon: 'https://img.icons8.com/?size=100&id=TuXN3JNUBGOT&format=png&color=000000', color: 0x172b4d, group: 'methodology' },
    { name: 'Ubuntu', icon: 'https://cdn.worldvectorlogo.com/logos/ubuntu-4.svg', color: 0x172b4d, group: 'methodology' },
    { name: 'InteliJ', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/IntelliJ_IDEA_Icon.svg/2048px-IntelliJ_IDEA_Icon.svg.png', color: 0x172b4d, group: 'methodology' },
    { name: 'Postman', icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg', color: 0x172b4d, group: 'methodology' },
    { name: 'VS Code', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg', color: 0x172b4d, group: 'methodology' },
    { name: 'Eclipse', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Eclipse-icon-logo.svg', color: 0x172b4d, group: 'methodology' },
    

];

function createStars() {
    starsGeometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        vertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Crear contenedores de grupo
    nodes = new THREE.Group();
    lines = new THREE.Group();
    scene.add(nodes);
    scene.add(lines);

    // Crear nodos y sus conexiones
    createNodes();
    createConnections();

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 30; // Aumentar distancia de la cámara

    // Event listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Add stars creation
    createStars();

    animate();
}

function createNodes() {
    window.threejsNodes = []; // Array global para almacenar las referencias a los nodos
    window.threeCamera = camera; // Hacer la cámara accesible globalmente

    technologies.forEach((tech, index) => {
        const geometry = new THREE.SphereGeometry(0.4, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: tech.color,
            transparent: true,
            opacity: 0.15, // Hacer las esferas más transparentes
            shininess: 30
        });
        const node = new THREE.Mesh(geometry, material);

        // Reducir el radio de la esfera
        const phi = Math.acos(-1 + (2 * index) / technologies.length);
        const theta = Math.sqrt(technologies.length * Math.PI) * phi;
        const radius = 15; // Aumentado de 10 a 15
        const verticalSpread = 8; // Añadir distribución vertical

        node.position.x = radius * Math.cos(theta) * Math.sin(phi);
        node.position.y = radius * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * verticalSpread;
        node.position.z = radius * Math.cos(phi) + (Math.random() - 0.5) * verticalSpread;

        // Crear sprite para el icono y tooltip
        const map = new THREE.TextureLoader().load(tech.icon);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: map, 
            transparent: true,
            opacity: 1
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(3.5, 3.5, 1); // Aumentado de 2.5 a 3.5
        node.add(sprite);

        // Crear tooltip
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        context.font = 'bold 24px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(tech.name, 128, 32);

        const tooltipTexture = new THREE.CanvasTexture(canvas);
        const tooltipMaterial = new THREE.SpriteMaterial({
            map: tooltipTexture,
            transparent: true,
            opacity: 0
        });
        const tooltip = new THREE.Sprite(tooltipMaterial);
        tooltip.scale.set(7, 1.5, 1); // Aumentado de 5 a 7
        tooltip.position.y = 3; // Aumentado de 2 a 3
        node.add(tooltip);
        node.tooltip = tooltip;

        node.userData = { 
            originalPosition: node.position.clone(), 
            tech,
            group: tech.group
        };
        window.threejsNodes.push(node); // Añadir el nodo al array global
        nodes.add(node);
    });

    // Mejorar detector de raycast
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredNode = null;

    document.addEventListener('mousemove', (event) => {
        // Convertir coordenadas del mouse a espacio normalizado (-1 a +1)
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodes.children, true);

        // Resetear estado previo
        if (hoveredNode && hoveredNode.tooltip) {
            hoveredNode.tooltip.material.opacity = 0;
        }

        // Actualizar nuevo estado
        hoveredNode = null;
        if (intersects.length > 0) {
            const selected = intersects[0].object;
            hoveredNode = selected.type === 'Sprite' ? selected.parent : selected;
            
            if (hoveredNode && hoveredNode.tooltip) {
                hoveredNode.tooltip.material.opacity = 1;
                hoveredNode.tooltip.position.y = 2;
                // Asegurar que el tooltip siempre mire a la cámara
                hoveredNode.tooltip.lookAt(camera.position);
            }
        }
    });

    // Añadir listener para el contenedor 3D
    const container = document.getElementById('three-container');
    container.addEventListener('mouseleave', () => {
        if (hoveredNode && hoveredNode.tooltip) {
            hoveredNode.tooltip.material.opacity = 0;
        }
        hoveredNode = null;
    });
}

function createConnections() {
    const linesMaterial = new THREE.LineBasicMaterial({ 
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.2,
        linewidth: 1
    });

    // Crear conexiones basadas en grupos relacionados
    nodes.children.forEach((node1, i) => {
        nodes.children.slice(i + 1).forEach(node2 => {
            if (shouldConnect(node1.userData.tech, node2.userData.tech)) {
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    node1.position,
                    node2.position
                ]);
                const line = new THREE.Line(geometry, linesMaterial);
                lines.add(line);
            }
        });
    });
}

function shouldConnect(tech1, tech2) {
    // Lógica para determinar si dos tecnologías deberían conectarse
    const sameGroup = tech1.group === tech2.group;
    const relatedGroups = isRelatedGroup(tech1.group, tech2.group);
    return sameGroup || relatedGroups;
}

// Actualizar las relaciones de grupos
function isRelatedGroup(group1, group2) {
    const relations = {
        'backend': ['database', 'testing', 'integration', 'tools'],
        'devops': ['cloud', 'vcs', 'tools'],
        'database': ['backend', 'integration'],
        'cloud': ['devops', 'backend'],
        'testing': ['backend', 'integration', 'methodology'],
        'integration': ['backend', 'database'],
        'vcs': ['devops', 'backend'],
        'methodology': ['tools', 'testing'],
        'tools': ['methodology', 'backend', 'devops'],
        'languages': ['backend', 'testing']
    };
    return relations[group1]?.includes(group2) || relations[group2]?.includes(group1);
}

function updateConnections() {
    lines.children.forEach(line => {
        const positions = line.geometry.attributes.position.array;
        let index = 0;
        nodes.children.some(node1 => {
            return nodes.children.some(node2 => {
                if (positions[0] === node1.position.x && 
                    positions[1] === node1.position.y && 
                    positions[3] === node2.position.x && 
                    positions[4] === node2.position.y) {
                    positions[2] = node1.position.z;
                    positions[5] = node2.position.z;
                    line.geometry.attributes.position.needsUpdate = true;
                    return true;
                }
                return false;
            });
        });
    });
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Modificar la función animate para incluir actualización de tooltips
function animate() {
    requestAnimationFrame(animate);

    // Rotación más lenta para mejor visibilidad
    nodes.rotation.y += 0.001;
    lines.rotation.y += 0.001;

    // Movimiento ondulante más pronunciado
    nodes.children.forEach((node, i) => {
        const time = Date.now() * 0.0008; // Más lento
        const offset = i * 0.5;
        node.position.z = node.userData.originalPosition.z + Math.sin(time + offset) * 1.5; // Más amplitud
    });
    
    // Efecto de parallax más suave
    nodes.rotation.x = mouseY * 0.1;
    nodes.rotation.z = mouseX * 0.1;
    lines.rotation.x = mouseY * 0.1;
    lines.rotation.z = mouseX * 0.1;

    // Hacer que los tooltips siempre miren a la cámara
    nodes.children.forEach(node => {
        if (node.tooltip) {
            node.tooltip.lookAt(camera.position);
        }
    });

    // Efecto de parallax con el mouse
    nodes.rotation.x = mouseY * 0.2;
    nodes.rotation.z = mouseX * 0.2;
    lines.rotation.x = mouseY * 0.2;
    lines.rotation.z = mouseX * 0.2;

    // Add star rotation and twinkle
    if (stars) {
        stars.rotation.x += 0.0001;
        stars.rotation.y += 0.0001;

        const positions = starsGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 2] += (Math.random() - 0.5) * 0.1;
        }
        starsGeometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}

init();

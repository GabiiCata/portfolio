let scene, camera, renderer, nodes, lines;
let mouseX = 0, mouseY = 0;

const technologies = [
    // Backend & Java Ecosystem
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: 0xf89820, group: 'backend' },
    { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', color: 0x6db33f, group: 'backend' },
    { name: 'Hibernate', icon: 'https://hibernate.org/images/hibernate-logo.svg', color: 0xbcae79, group: 'backend' },
    { name: 'Maven', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg', color: 0xc71a36, group: 'backend' },

    // Containerization & Orchestration
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: 0x2496ed, group: 'devops' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: 0x326ce5, group: 'devops' },
    { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', color: 0xd24939, group: 'devops' },

    // Databases
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: 0x336791, group: 'database' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: 0x00758f, group: 'database' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: 0x47a248, group: 'database' },
    { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: 0xd82c20, group: 'database' },

    // Cloud & Infrastructure
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', color: 0xff9900, group: 'cloud' },
    { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: 0x0089d6, group: 'cloud' },

    // Testing & Quality
    { name: 'JUnit', icon: 'https://junit.org/junit5/assets/img/junit5-logo.png', color: 0x25a162, group: 'testing' },
    { name: 'SonarQube', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg', color: 0x4e9bcd, group: 'testing' },

    // Message Brokers
    { name: 'RabbitMQ', icon: 'https://www.rabbitmq.com/img/logo-rabbitmq.svg', color: 0xff6600, group: 'integration' },
    { name: 'Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', color: 0x231f20, group: 'integration' },
    
    // Version Control
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: 0xf05032, group: 'vcs' }
];

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

    camera.position.z = 25;

    // Event listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    animate();
}

function createNodes() {
    technologies.forEach((tech, index) => {
        const geometry = new THREE.SphereGeometry(0.3, 32, 32);
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
        const radius = 10; // Reducido de 15 a 10

        node.position.x = radius * Math.cos(theta) * Math.sin(phi);
        node.position.y = radius * Math.sin(theta) * Math.sin(phi);
        node.position.z = radius * Math.cos(phi);

        // Crear sprite para el icono y tooltip
        const map = new THREE.TextureLoader().load(tech.icon);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: map, 
            transparent: true,
            opacity: 1
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(2.5, 2.5, 1);
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
        tooltip.scale.set(5, 1.2, 1);
        tooltip.position.y = 2;
        node.add(tooltip);
        node.tooltip = tooltip;

        node.userData = { 
            originalPosition: node.position.clone(), 
            tech,
            group: tech.group
        };
        nodes.add(node);
    });

    // Añadir detector de raycast para interacción
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodes.children, true);

        // Resetear todos los tooltips
        nodes.children.forEach(node => {
            if (node.tooltip) node.tooltip.material.opacity = 0;
        });

        // Mostrar tooltip del nodo seleccionado
        if (intersects.length > 0) {
            const selectedNode = intersects[0].object.parent;
            if (selectedNode && selectedNode.tooltip) {
                selectedNode.tooltip.material.opacity = 1;
            }
        }
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

function isRelatedGroup(group1, group2) {
    const relations = {
        'backend': ['database', 'testing', 'integration'],
        'devops': ['cloud', 'vcs'],
        'database': ['backend', 'integration'],
        'cloud': ['devops', 'backend'],
        'testing': ['backend', 'integration'],
        'integration': ['backend', 'database'],
        'vcs': ['devops', 'backend']
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

    // Rotación suave del grupo completo
    nodes.rotation.y += 0.002;
    lines.rotation.y += 0.002;

    // Movimiento ondulante de los nodos
    nodes.children.forEach((node, i) => {
        const time = Date.now() * 0.001;
        const offset = i * 0.5;
        node.position.z = node.userData.originalPosition.z + Math.sin(time + offset) * 1; // Reducido de 2 a 1
    });
    
    // Actualizar conexiones
    updateConnections();

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

    renderer.render(scene, camera);
}

init();

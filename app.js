const year = document.querySelector("#current-year");

if (year) {
    year.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const linkedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if (linkedSections.length) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
                    });
                }
            });
        },
        { rootMargin: "-38% 0px -52% 0px", threshold: 0 }
    );

    linkedSections.forEach((section) => navObserver.observe(section));
}

const hero = document.querySelector(".hero");
const updateHeroShift = () => {
    if (!hero || prefersReducedMotion) {
        return;
    }

    const progress = Math.min(Math.max(window.scrollY / Math.max(hero.offsetHeight, 1), 0), 1);
    document.documentElement.style.setProperty("--hero-shift", `${progress * -28}px`);
};

updateHeroShift();
window.addEventListener("scroll", updateHeroShift, { passive: true });

const canvas = document.querySelector("#signal-canvas");

if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let deviceRatio = 1;
    let points = [];

    const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        deviceRatio = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.floor(width * deviceRatio);
        canvas.height = Math.floor(height * deviceRatio);
        ctx.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0);

        points = Array.from({ length: 34 }, (_, index) => ({
            x: ((index * 137) % Math.max(width, 1)) + 20,
            y: ((index * 89) % Math.max(height, 1)) + 20,
            speed: 0.18 + (index % 5) * 0.035,
            length: 34 + (index % 4) * 18
        }));
    };

    const draw = (time) => {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(242, 165, 58, 0.28)";
        ctx.fillStyle = "rgba(255, 255, 255, 0.34)";

        points.forEach((point, index) => {
            const drift = (time * point.speed * 0.02 + index * 11) % (width + point.length);
            const x = (point.x + drift) % (width + point.length) - point.length;
            const y = point.y + Math.sin(time * 0.001 + index) * 12;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + point.length, y - point.length * 0.24);
            ctx.stroke();
            ctx.fillRect(x + point.length, y - point.length * 0.24, 2, 2);
        });

        window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.requestAnimationFrame(draw);
}

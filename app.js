const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const chapters = [...document.querySelectorAll('.chapter')];
const navLinks = [...document.querySelectorAll('nav a')];
const hero = document.querySelector('.hero');
const photo = document.querySelector('.hero-photo');
const animations = new Set();
document.querySelector('#current-year').textContent = new Date().getFullYear();

// Native scrolling drives a small photo shift, progress and chapter navigation.
// No wheel interception, scroll snapping, or continuous animation loop.
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const distance = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--reading', distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0);
  let active = chapters[0].id;
  for (const chapter of chapters) {
    if (chapter.getBoundingClientRect().top <= innerHeight * .35) active = chapter.id;
  }
  navLinks.forEach(link => {
    if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if (!reducedMotion.matches && innerWidth > 760) {
    const top = hero.getBoundingClientRect().top;
    photo.style.setProperty('--photo-shift', `${Math.max(-10, Math.min(10, -top * .025))}px`);
  } else photo.style.removeProperty('--photo-shift');
}
function scheduleScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
}
addEventListener('scroll', scheduleScroll, { passive: true });
addEventListener('resize', scheduleScroll, { passive: true });
addEventListener('load', scheduleScroll, { once: true });
updateScroll();

// Every section is readable before JS runs. Animation only accompanies entry.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (reducedMotion.matches || !entry.target.animate) return;
      const sideways = entry.target.classList.contains('career-entry') || entry.target.classList.contains('hobby');
      const animation = entry.target.animate([
        { opacity: .55, transform: sideways ? 'translateX(20px)' : 'translateY(18px)' },
        { opacity: 1, transform: 'translate(0,0)' }
      ], { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)' });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  const steps = document.querySelectorAll('[data-step]');
  const stepObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('is-current', entry.isIntersecting));
  }, { rootMargin: '-15% 0px -35% 0px', threshold: .2 });
  steps.forEach(step => stepObserver.observe(step));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) animations.forEach(animation => animation.finish());
  scheduleScroll();
});

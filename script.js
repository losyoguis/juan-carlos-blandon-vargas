// Navegación móvil
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Barra de progreso de scroll
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  if (!scrollBar) return;
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  scrollBar.style.width = `${progress}%`;
});

// Animaciones por sección
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Menú activo por sección
const sectionIds = ['inicio', 'sobre-mi', 'proyectos', 'impacto', 'trayectoria', 'contacto'];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        const isMatch = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isMatch);
      });
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => activeObserver.observe(section));

// Filtro de proyectos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-selected', 'false');
    });

    button.classList.add('is-active');
    button.setAttribute('aria-selected', 'true');

    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const visible = filter === 'all' || categories.includes(filter);
      card.hidden = !visible;
    });
  });
});

// Contadores animados
const counters = document.querySelectorAll('[data-counter]');
const formatCounter = (value) => new Intl.NumberFormat('es-CO').format(value);

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.counter || 0);
      const duration = 1500;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(progress * target);
        el.textContent = formatCounter(value) + (target >= 1000 ? '+' : '');

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

// Año de footer
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

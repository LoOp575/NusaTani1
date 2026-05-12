// Dark Mode
const html = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });
}

// Mobile Menu
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
if (mobileMenu && navLinks) {
  mobileMenu.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Counter Animation
function animateCounters() {
  document.querySelectorAll('.stat-val[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(target * ease);
      if (target >= 1000000) {
        el.textContent = (val / 1000000).toFixed(1) + ' Jt';
      } else if (target >= 1000) {
        el.textContent = (val / 1000).toFixed(0) + 'K';
      } else {
        el.textContent = val;
      }
      if (p < 1) requestAnimationFrame(update);
      else {
        if (target >= 1000000) el.textContent = (target / 1000000).toFixed(1) + ' Jt';
        else if (target >= 1000) el.textContent = Math.floor(target / 1000) + 'K';
        else el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  });
}

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('stats-grid')) animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.stat-card, .commodity-card, .weather-card, .rec-card, .news-card, .ai-preview, .stats-grid').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Active nav highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  a.classList.remove('active');
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === '/') || (currentPage === 'index.html' && href === '/')) {
    a.classList.add('active');
  }
});

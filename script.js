// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ===== DARK MODE =====
const darkToggle = document.getElementById('darkToggle');
const html = document.documentElement;

// Check system preference or saved preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}

darkToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, suffix = '') {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    
    if (target >= 1000000) {
      element.textContent = (current / 1000000).toFixed(1) + 'M' + suffix.replace(' Ton', ' Ton');
    } else if (target >= 1000) {
      element.textContent = Math.floor(current / 1000) + '.' + String(current % 1000).padStart(3, '0').charAt(0) + 'K' + suffix;
    } else {
      element.textContent = current.toLocaleString('id-ID') + suffix;
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Final value
      if (target >= 1000000) {
        element.textContent = (target / 1000000).toFixed(1) + ' Juta' + suffix;
      } else {
        element.textContent = target.toLocaleString('id-ID') + suffix;
      }
    }
  }
  
  requestAnimationFrame(update);
}

// ===== SCROLL REVEAL =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

// Stats counter observer
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.stat-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          const numEl = card.querySelector('.stat-number');
          const target = parseInt(card.dataset.count);
          const suffix = card.dataset.suffix || '';
          animateCounter(numEl, target, suffix);
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 150);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
  // Set initial state
  document.querySelectorAll('.stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  statsObserver.observe(statsGrid);
}

// General reveal observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add reveal class to sections
document.querySelectorAll('.feature-card, .token-card, .community-card, .roadmap-item, .ai-feature-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i % 6 * 0.1}s`;
  revealObserver.observe(el);
});

// Observe larger sections
document.querySelectorAll('.dashboard-preview, .ai-visual, .token-visual').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== PARTICLES (Hero) =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: ${Math.random() > 0.5 ? 'rgba(22,163,74,0.3)' : 'rgba(234,179,8,0.3)'};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    `;
    container.appendChild(particle);
  }
}

createParticles();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

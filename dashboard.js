// ===== DARK MODE =====
const darkToggle = document.getElementById('darkToggle');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}

darkToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// ===== SIDEBAR TOGGLE (Mobile) =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('active');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// ===== GREETING BASED ON TIME =====
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Selamat Pagi';
  if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
  else if (hour >= 18) greeting = 'Selamat Malam';

  const h1 = document.querySelector('.header-greeting h1');
  if (h1) {
    h1.innerHTML = greeting + ', <span class="text-gradient">Pak Budi</span> \u{1F44B}';
  }
}
updateGreeting();

// ===== STAT COUNTER ANIMATION =====
function animateValue(element, start, end, duration, prefix, suffix) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeOut;

    let display = '';
    if (end >= 100000) {
      display = (current / 1000).toFixed(1) + 'K';
    } else if (end >= 1000) {
      display = current.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else {
      display = current.toFixed(0);
    }
    element.textContent = (prefix || '') + display + (suffix || '');

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// Animate stat values on load
const statValues = document.querySelectorAll('.stat-card-value');
const statData = [
  { end: 5200, prefix: 'Rp ', suffix: '' },
  { end: 52847, prefix: '', suffix: '' },
  { end: 128500, prefix: '', suffix: ' Ha' },
  { end: 2400000, prefix: '', suffix: '' }
];

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statValues.forEach((el, i) => {
        if (statData[i]) {
          const d = statData[i];
          if (d.end === 2400000) {
            // Special: show as "2.4 Juta Ton"
            let startTime = performance.now();
            function animate(now) {
              let p = Math.min((now - startTime) / 2000, 1);
              let ease = 1 - Math.pow(1 - p, 3);
              let val = (2.4 * ease).toFixed(1);
              el.textContent = val + ' Juta Ton';
              if (p < 1) requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
          } else if (d.end === 128500) {
            let startTime = performance.now();
            function animate2(now) {
              let p = Math.min((now - startTime) / 2000, 1);
              let ease = 1 - Math.pow(1 - p, 3);
              let val = (128.5 * ease).toFixed(1);
              el.textContent = val + 'K Ha';
              if (p < 1) requestAnimationFrame(animate2);
            }
            requestAnimationFrame(animate2);
          } else {
            animateValue(el, 0, d.end, 2000, d.prefix, d.suffix);
          }
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const statsSection = document.querySelector('.stats-cards');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ===== CHART ANIMATION =====
function animateChart() {
  const paths = document.querySelectorAll('.price-chart path[d]');
  paths.forEach(path => {
    if (path.getAttribute('fill') === 'none' || path.getAttribute('fill') === null) {
      const length = path.getTotalLength ? path.getTotalLength() : 1000;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'stroke-dashoffset 2s ease-in-out';
      setTimeout(() => {
        path.style.strokeDashoffset = '0';
      }, 500);
    }
  });
}

const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateChart();
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const chartCard = document.querySelector('.chart-card');
if (chartCard) {
  chartObserver.observe(chartCard);
}

// ===== CONFIDENCE BAR ANIMATION =====
const confidenceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.confidence-fill');
      fills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = width;
        }, 300);
      });
      confidenceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const aiCard = document.querySelector('.ai-card');
if (aiCard) {
  confidenceObserver.observe(aiCard);
}

// ===== BAR FILL ANIMATION =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.bar-fill');
      bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (statsSection) {
  barObserver.observe(statsSection);
}

// ===== ACTIVE NAV HIGHLIGHT =====
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function(e) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===== NOTIFICATION CLICK =====
document.querySelector('.notification-btn').addEventListener('click', function() {
  const dot = this.querySelector('.notification-dot');
  if (dot) dot.style.display = 'none';
  alert('Notifikasi:\n\n• Harga gabah naik 2.4% hari ini\n• Cuaca cerah untuk 3 hari ke depan\n• Pak Slamet mengirim pesan di forum');
});

// ===== SEARCH INTERACTION =====
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      alert('Mencari: "' + this.value + '"\n\nFitur pencarian akan segera tersedia.');
      this.value = '';
    }
  });
}

// ===== QUICK ACTION BUTTONS =====
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const text = this.querySelector('span:last-child').textContent;
    alert('Fitur "' + text + '" akan segera tersedia di update berikutnya.');
  });
});

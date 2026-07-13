/* ============================================================
   LAVANYA WARANG — PORTFOLIO
   script.js
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADER
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPercent = document.getElementById('loaderPercent');
  let pct = 0;
  const loaderInterval = setInterval(() => {
    pct += Math.floor(Math.random() * 12) + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(loaderInterval);
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
      }, 350);
    }
    loaderFill.style.width = pct + '%';
    loaderPercent.textContent = pct;
  }, 130);
  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = ''; }, 2200);

  /* ---------------------------------------------------------
     2. CUSTOM CURSOR + GLOW
  --------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorGlow = document.getElementById('cursor-glow');
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    cursorGlow.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    cursorGlow.style.opacity = 1;
  });
  window.addEventListener('mouseleave', () => { cursorGlow.style.opacity = 0; });

  function animateRing(){
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .service-card, .cert-card, .tag, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
  });

  /* ---------------------------------------------------------
     3. SCROLL PROGRESS + NAVBAR
  --------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');

  function onScroll(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
    navbar.classList.toggle('scrolled', h.scrollTop > 40);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     4. MOBILE NAV
  --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }));

  /* ---------------------------------------------------------
     5. TYPEWRITER
  --------------------------------------------------------- */
  const roles = [
    'AI/ML Engineering Student',
    'Aspiring Software Developer',
    'Python & Django Developer',
    'Data-Driven Problem Solver'
  ];
  const twEl = document.getElementById('typewriter');
  let rIdx = 0, cIdx = 0, deleting = false;

  function typeLoop(){
    const current = roles[rIdx];
    if (!deleting){
      cIdx++;
      twEl.textContent = current.slice(0, cIdx);
      if (cIdx === current.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      cIdx--;
      twEl.textContent = current.slice(0, cIdx);
      if (cIdx === 0){ deleting = false; rIdx = (rIdx + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------------------------------------------------------
     6. NEURAL-NETWORK PARTICLE CANVAS
  --------------------------------------------------------- */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let cw, ch;
  const mouse = { x: null, y: null, radius: 140 };

  function resizeCanvas(){
    cw = canvas.width = canvas.offsetWidth;
    ch = canvas.height = canvas.offsetHeight;
    initParticles();
  }

  function initParticles(){
    const count = Math.min(90, Math.floor((cw * ch) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * cw,
      y: Math.random() * ch,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function drawParticles(){
    ctx.clearRect(0, 0, cw, ch);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cw) p.vx *= -1;
      if (p.y < 0 || p.y > ch) p.vy *= -1;

      if (mouse.x !== null){
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius){
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(88,214,141,0.55)';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++){
      for (let j = i + 1; j < particles.length; j++){
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130){
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(88,214,141,${0.18 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', resizeCanvas);
  document.getElementById('hero').addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.getElementById('hero').addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resizeCanvas();
  drawParticles();

  /* ---------------------------------------------------------
     7. SCROLL REVEALS (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     8. ANIMATED COUNTERS
  --------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.counter);
      const isDecimal = el.dataset.decimal === 'true';
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (isDecimal ? val.toFixed(2) : Math.floor(val)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------------------------------------------------
     9. SKILL BARS + CIRCLES
  --------------------------------------------------------- */
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  const circles = document.querySelectorAll('.circle-fg');
  const circleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const pct = parseFloat(entry.target.dataset.pct);
        const circumference = 264;
        const offset = circumference - (pct / 100) * circumference;
        entry.target.style.strokeDashoffset = offset;
        circleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  circles.forEach(c => circleObserver.observe(c));

  /* ---------------------------------------------------------
     10. PROJECT FILTER
  --------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* 3D tilt hover on project cards */
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const rotX = ((y / rect.height) - 0.5) * -8;
      const rotY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------------------------------------------------------
     11. HIGHLIGHTS CAROUSEL
  --------------------------------------------------------- */
  const slidesWrap = document.getElementById('carouselSlides');
  const dotsWrap = document.getElementById('carouselDots');
  const slides = slidesWrap ? slidesWrap.children : [];
  let activeSlide = 0;

  if (slidesWrap){
    Array.from(slides).forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('c-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });

    function goToSlide(i){
      activeSlide = i;
      slidesWrap.style.transform = `translateX(-${i * 100}%)`;
      dotsWrap.querySelectorAll('.c-dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    setInterval(() => {
      activeSlide = (activeSlide + 1) % slides.length;
      goToSlide(activeSlide);
    }, 5000);
  }

  /* ---------------------------------------------------------
     12. CONTACT FORM (mailto handoff)
  --------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(msg){
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const subject = document.getElementById('cSubject').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !email || !subject || !message){
      showToast('Please fill in every field.');
      return;
    }

    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:lavanyawarang2@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    showToast('Opening your email client…');
    form.reset();
  });

  /* ---------------------------------------------------------
     13. GITHUB STATS — graceful fallback if external images fail
  --------------------------------------------------------- */
  function setupImageFallback(imgId, fallbackId){
    const img = document.getElementById(imgId);
    const fallback = document.getElementById(fallbackId);
    if (!img || !fallback) return;

    const timeout = setTimeout(() => {
      img.style.display = 'none';
      fallback.hidden = false;
    }, 6000);

    img.addEventListener('load', () => {
      clearTimeout(timeout);
      if (img.naturalWidth < 5){
        img.style.display = 'none';
        fallback.hidden = false;
      }
    });
    img.addEventListener('error', () => {
      clearTimeout(timeout);
      img.style.display = 'none';
      fallback.hidden = false;
    });
  }
  setupImageFallback('ghStatsImg', 'ghStatsFallback');
  setupImageFallback('ghLangImg', 'ghLangFallback');

  /* ---------------------------------------------------------
     14. MISC
  --------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});

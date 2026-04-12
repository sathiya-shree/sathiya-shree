/* ═══════════════════════════════════════════════════════════════════════════ */
/* INITIALIZATION & SETUP */
/* ═══════════════════════════════════════════════════════════════════════════ */

// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your EmailJS public key

/* ═══════════════════════════════════════════════════════════════════════════ */
/* CUSTOM CURSOR */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initCursor() {
  const dotEl = document.getElementById('cur-dot');
  const ringEl = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dotEl.style.left = mx + 'px';
    dotEl.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ringEl.style.left = rx + 'px';
    ringEl.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Change cursor style on hover
  document.addEventListener('mouseover', (e) => {
    const isInteractive = !!e.target.closest('a, button');
    document.body.classList.toggle('hov-link', isInteractive);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* NAVIGATION */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initNavigation() {
  const nav = document.getElementById('nav');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Show/hide nav
    if (scrollY > lastScrollY && scrollY > 100) {
      nav.classList.remove('vis');
    } else {
      nav.classList.add('vis');
    }
    
    // Add scroll styling
    nav.classList.toggle('sc', scrollY > 50);
    
    lastScrollY = scrollY;
    
    // Update progress bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;
    document.getElementById('prog').style.width = progress + '%';
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* HAMBURGER MENU */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.cssText = isOpen 
      ? 'display: none' 
      : 'display: flex; flex-direction: column; position: fixed; top: 66px; left: 0; right: 0; background: rgba(3, 8, 15, 0.97); padding: 2.2rem 1.8rem; gap: 1.6rem; backdrop-filter: blur(24px); z-index: 890; border-bottom: 1px solid var(--border)';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      navLinks.removeAttribute('style');
    }
  });

  if (window.innerWidth < 900) {
    navLinks.style.display = 'none';
  }
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* LOADER */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initLoader() {
  const ldName = document.getElementById('ld-name');
  const ldBar = document.getElementById('ld-bar');
  const ldPct = document.getElementById('ld-pct');
  const loader = document.getElementById('loader');
  const nav = document.getElementById('nav');
  
  // Animate name
  'Sathiya Shree'.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.innerHTML = char === ' ' ? '&nbsp;' : char;
    span.style.animationDelay = i * 0.05 + 's';
    ldName.appendChild(span);
  });

  // Animate loading bar
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 14 + 5;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      ldBar.style.width = '100%';
      ldPct.textContent = '100%';
      
      setTimeout(() => {
        loader.classList.add('out');
        nav.classList.add('vis');
      }, 450);
    }
    
    ldBar.style.width = progress + '%';
    ldPct.textContent = Math.floor(progress) + '%';
  }, 80);
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* MAGNETIC BUTTONS */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initMagneticButtons() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.btn, .btn-ghost, .nav-cta, .fsub').forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80) {
        btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
        btn.style.transition = 'transform 0.08s';
      } else {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s var(--ease2)';
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* TILT CARDS */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initTiltCards() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.prow-head, .cert-card, .exp-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (mx > 0 && mx < rect.width && my > 0 && my < rect.height) {
        const rotX = ((my / rect.height) - 0.5) * 4;
        const rotY = -(((mx / rect.width) - 0.5) * 4);
        card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(2px)`;
        card.style.transition = 'transform 0.05s';
      } else {
        card.style.transform = '';
        card.style.transition = 'transform 0.7s var(--ease2)';
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* SECTION DOTS */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initSectionDots() {
  const dotsContainer = document.getElementById('sec-dots');
  
  SECTIONS.forEach((section, i) => {
    const dot = document.createElement('div');
    dot.className = 'sdot';
    dot.addEventListener('click', () => {
      const element = document.getElementById(section.id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  // Update active dot on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    const dots = document.querySelectorAll('.sdot');
    
    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const isActive = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
        dots[i].classList.toggle('act', isActive);
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* FORM HANDLING */
/* ═══════════════════════════════════════════════════════════════════════════ */

function initForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fname = document.getElementById('cf-fname')?.value || '';
    const lname = document.getElementById('cf-lname')?.value || '';
    const email = document.getElementById('cf-email')?.value || '';
    const phone = document.getElementById('cf-phone')?.value || '';
    const message = document.getElementById('cf-message')?.value || '';

    const btn = form.querySelector('button');
    const btnTxt = btn.querySelector('span');

    btn.disabled = true;
    btnTxt.textContent = 'Sending...';
    btn.style.background = 'var(--gold3)';

    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'sathiyashree03@gmail.com',
        from_name: `${fname} ${lname}`,
        from_email: email,
        phone: phone,
        message: message
      });

      showToast('✓ Message sent successfully!');
      btn.style.background = 'var(--gold2)';

      // Clear form
      ['cf-fname', 'cf-lname', 'cf-email', 'cf-phone', 'cf-message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });

      setTimeout(() => {
        btn.disabled = false;
        btnTxt.textContent = 'Send Message →';
        btn.style.background = '';
      }, 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast('✗ Send failed — try emailing directly');
      btn.disabled = false;
      btnTxt.textContent = 'Send Message →';
    }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* UTILITIES */
/* ═══════════════════════════════════════════════════════════════════════════ */

function copyEmail(e) {
  if (e) e.preventDefault();
  navigator.clipboard.writeText('sathiyashree03@gmail.com')
    .then(() => showToast('✓ Email copied to clipboard'));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function drawCertCanvas(canvas, label, accent, height) {
  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 500;
  
  canvas.width = width;
  canvas.height = height;

  // Background
  ctx.fillStyle = '#060d18';
  ctx.fillRect(0, 0, width, height);

  // Grid lines
  ctx.strokeStyle = 'rgba(74, 127, 165, 0.06)';
  ctx.lineWidth = 1;
  
  for (let x = 0; x < width; x += 22) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  for (let y = 0; y < height; y += 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Concentric circles
  const cx = height / 2, cy = height / 2;
  [height * 0.45, height * 0.32, height * 0.2].forEach((r, i) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = accent + ['88', '55', '33'][i];
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, height * 0.09, 0, Math.PI * 2);
  ctx.fillStyle = accent + '28';
  ctx.fill();

  // Radial gradient
  const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, height * 0.5);
  grd.addColorStop(0, accent + '18');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  // Text
  ctx.font = "10px 'DM Mono', monospace";
  ctx.fillStyle = accent + 'cc';
  ctx.fillText(label.toUpperCase(), height + 16, cy - 4);

  ctx.font = "8px 'DM Mono', monospace";
  ctx.fillStyle = 'rgba(240, 234, 216, 0.28)';
  ctx.fillText('VERIFIED CREDENTIAL', height + 16, cy + 13);

  // Corner mark
  ctx.strokeStyle = accent + '40';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width - 18, 4);
  ctx.lineTo(width - 4, 4);
  ctx.lineTo(width - 4, 18);
  ctx.stroke();
}

function drawAllCerts() {
  CERTS.filter(c => c.feat).forEach((c, i) => {
    const el = document.getElementById('cf-' + i);
    if (el) drawCertCanvas(el, c.is, c.ac, 120);
  });

  CERTS.filter(c => !c.feat).forEach((c, i) => {
    const el = document.getElementById('cr-' + i);
    if (el) drawCertCanvas(el, c.is, c.ac, 100);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* MAIN INITIALIZATION */
/* ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavigation();
  initHamburger();
  initMagneticButtons();
  initTiltCards();
  initSectionDots();
  initForm();
  drawAllCerts();
});

// Handle tab clicks for skills
document.addEventListener('click', (e) => {
  const tab = e.target.closest('.stab');
  if (!tab) return;

  const inner = document.getElementById('subpage-inner');
  inner?.querySelectorAll('.stab').forEach(b => b.classList.remove('act'));
  inner?.querySelectorAll('.sk-pan').forEach(p => p.classList.remove('act'));
  
  tab.classList.add('act');
  const panel = inner?.querySelector('#panel-' + tab.dataset.tab);
  if (panel) panel.classList.add('act');
});

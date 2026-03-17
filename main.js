/* ============================================================
   main.js  —  All application logic
   ============================================================
   Reads from data.js, builds DOM, drives all interactions.
   You should NOT need to edit this file unless adding new
   features — all content lives in data.js instead.
   ============================================================ */

/* ═══════════════════════════════════
   LOADER
═══════════════════════════════════ */
function initLoader() {
  const nameEl = document.getElementById('ld-name');
  const pctEl  = document.getElementById('ld-pct');

  PERSONAL.name.split('').forEach((c, i) => {
    const s = document.createElement('span');
    s.innerHTML         = c === ' ' ? '&nbsp;' : c;
    s.style.animationDelay = i * 0.055 + 's';
    nameEl.appendChild(s);
  });

  let lp = 0;
  const iv = setInterval(() => {
    lp += Math.random() * 13 + 4;
    if (lp >= 100) {
      lp = 100;
      clearInterval(iv);
      setTimeout(() => {
        document.getElementById('loader').classList.add('out');
        document.getElementById('nav').classList.add('vis');
        document.getElementById('sr').classList.add('show');
        // Boot 3D scenes for home page
        setTimeout(() => {
          make3DScene('hero-bg3d',    'hero');
          make3DScene('about-bg3d',   'wave');
          make3DScene('contact-bg3d', 'sphere');
        }, 100);
        initReveal('p-home');
        setTimeout(countUpStats, 700);
      }, 480);
    }
    pctEl.textContent = Math.floor(lp) + '%';
  }, 80);
}

/* ═══════════════════════════════════
   ROUTER
═══════════════════════════════════ */
let curPage      = 'home';
let transitioning = false;
const PAGE_NUMS   = { home:'01', projects:'02', skills:'03', certs:'04' };

function goTo(pid) {
  if (pid === curPage || transitioning) return;
  transitioning = true;
  const curtain = document.getElementById('curtain');
  curtain.className = 'cin';

  setTimeout(() => {
    const cur  = document.getElementById('p-' + curPage);
    const next = document.getElementById('p-' + pid);
    cur.classList.remove('act');
    cur.style.display = 'none';
    next.style.display = 'block';
    void next.offsetHeight;
    next.classList.add('act');
    next.scrollTop = 0;

    curPage = pid;
    updateNav();
    initReveal('p-' + pid);

    // Lazy-init 3D for pages not yet visited
    if (pid === 'projects' && !document.querySelector('#proj-bg3d canvas'))   make3DScene('proj-bg3d',   'dna');
    if (pid === 'skills'   && !document.querySelector('#skills-bg3d canvas')) make3DScene('skills-bg3d', 'wave');
    if (pid === 'certs'    && !document.querySelector('#certs-bg3d canvas'))  make3DScene('certs-bg3d',  'sphere');

    // Redraw cert canvases (they need layout to be settled)
    if (pid === 'certs') setTimeout(() => { renderCertCanvases(); countCertStats(); }, 200);

    curtain.className = 'cout';
    setTimeout(() => { curtain.className = ''; transitioning = false; }, 540);
  }, 520);
}

function updateNav() {
  ['home','projects','skills','certs','contact'].forEach(id => {
    const el = document.getElementById('nl-' + id);
    if (el) el.classList.toggle('act', id === curPage);
  });
  document.getElementById('nav-pg').innerHTML = `<b>${PAGE_NUMS[curPage] || '01'}</b> / 04`;
}

function scrollToContact() {
  if (curPage !== 'home') {
    goTo('home');
    setTimeout(() => {
      const el = document.getElementById('contact-anchor');
      if (el) document.getElementById('p-home').scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }, 1200);
  } else {
    const el = document.getElementById('contact-anchor');
    if (el) document.getElementById('p-home').scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}

/* ═══════════════════════════════════
   CURSORS
═══════════════════════════════════ */
function initCursors() {
  const dotEl   = document.getElementById('cur-dot');
  const ringEl  = document.getElementById('cur-ring');
  const rotEl   = document.getElementById('cur-rot');
  const crossEl = document.getElementById('cur-cross');
  const labelEl = document.getElementById('cur-label');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dotEl.style.left = mx + 'px';
    dotEl.style.top  = my + 'px';
  });

  (function af() {
    rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
    ringEl.style.left  = rx + 'px'; ringEl.style.top  = ry + 'px';
    rotEl.style.left   = mx + 'px'; rotEl.style.top   = my + 'px';
    crossEl.style.left = mx + 'px'; crossEl.style.top = my + 'px';
    labelEl.style.left = mx + 'px'; labelEl.style.top = my + 'px';
    requestAnimationFrame(af);
  })();

  document.addEventListener('mouseover', e => {
    const b = e.target.closest('a, button');
    const p = e.target.closest('.prow-header');
    const h = e.target.closest('.page-title, .ph-h');
    const t = e.target.closest('.tile, .cert-h, .cert-card, .exp-card');
    document.body.classList.toggle('hov-proj',    !!p);
    document.body.classList.toggle('hov-heading', !!h && !p);
    document.body.classList.toggle('hov-tile',    !!t && !p && !h);
    document.body.classList.toggle('hov-link',    !!b && !p && !h && !t);
  });
}

/* ═══════════════════════════════════
   SCROLL PROGRESS + BTT + NAV HIDE
═══════════════════════════════════ */
function initScroll() {
  const progEl = document.getElementById('prog');
  const navEl  = document.getElementById('nav');
  const bttEl  = document.getElementById('btt');

  document.querySelectorAll('.page').forEach(page => {
    page.addEventListener('scroll', () => {
      if (!page.classList.contains('act')) return;
      const pct = page.scrollTop / (page.scrollHeight - page.clientHeight) * 100;
      progEl.style.width = pct + '%';
      navEl.classList.toggle('sc',   page.scrollTop > 60);
      bttEl.classList.toggle('show', page.scrollTop > 400);
    }, { passive: true });
  });

  // Photo parallax on home scroll
  document.getElementById('p-home').addEventListener('scroll', function () {
    const wrap = document.getElementById('hero-photo-wrap');
    if (wrap) wrap.style.transform = `translateY(${this.scrollTop * 0.18}px)`;
  }, { passive: true });
}

/* ═══════════════════════════════════
   INTERSECTION REVEAL SYSTEM
═══════════════════════════════════ */
const revObservers = new Map();

function initReveal(pageId) {
  const page = document.getElementById(pageId);
  if (!page) return;

  if (revObservers.has(pageId)) revObservers.get(pageId).disconnect();

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.08, root: page });

  page.querySelectorAll('.fu, .fl, .fsc').forEach(el => {
    el.classList.remove('in');
    obs.observe(el);
  });
  setTimeout(() => {
    page.querySelectorAll('.fu, .fl, .fsc').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) el.classList.add('in');
    });
  }, 60);

  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('on'), 200);
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4, root: page });

  page.querySelectorAll('.sk-b, .soft-b').forEach(b => {
    b.classList.remove('on');
    barObs.observe(b);
  });

  revObservers.set(pageId, obs);
}

/* ═══════════════════════════════════
   COUNT-UP ANIMATIONS
═══════════════════════════════════ */
function countUpStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suf || '';
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(n + 1, target);
      el.textContent = n + suffix;
      if (n >= target) clearInterval(iv);
    }, 55);
  });
}
function countCertStats() {
  document.querySelectorAll('[data-ccount]').forEach(el => {
    const target = +el.dataset.ccount;
    const suffix = el.dataset.suf || '';
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(n + 1, target);
      el.textContent = n + suffix;
      if (n >= target) clearInterval(iv);
    }, 55);
  });
}

// Observe stats row and trigger when visible
function initStatsObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { countUpStats(); obs.disconnect(); }
    });
  }, { threshold: 0.3, root: document.getElementById('p-home') });
  document.querySelectorAll('.stats-row').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════
   TILT EFFECT
═══════════════════════════════════ */
function initTilt() {
  document.querySelectorAll('.prow-header, .cert-h, .cert-card, .exp-card, .tile').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      c.style.transform  = `perspective(800px) rotateX(${((e.clientY - r.top) / r.height - 0.5) * 4}deg) rotateY(${-((e.clientX - r.left) / r.width - 0.5) * 4}deg) translateZ(3px)`;
      c.style.transition = 'transform .05s';
    });
    c.addEventListener('mouseleave', () => {
      c.style.transform  = '';
      c.style.transition = 'transform .8s cubic-bezier(.22,1,.36,1)';
    });
  });
}

/* ═══════════════════════════════════
   MAGNETIC BUTTONS
═══════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll('.btn, .btn-ghost, .nav-cta, .fsub').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform  = `translate(${(e.clientX - r.left - r.width  / 2) * 0.25}px,${(e.clientY - r.top  - r.height / 2) * 0.25}px)`;
      b.style.transition = 'transform .08s';
    });
    b.addEventListener('mouseleave', () => {
      b.style.transform  = '';
      b.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
    });
  });
}

/* ═══════════════════════════════════
   MOBILE NAV
═══════════════════════════════════ */
function initMobileNav() {
  const hbg = document.getElementById('hamburger');
  const nlEl = document.getElementById('nav-links');

  hbg.addEventListener('click', () => {
    const isOpen = nlEl.style.display === 'flex';
    nlEl.style.cssText = isOpen ? 'display:none' :
      'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(10,10,10,.97);padding:2rem 1.5rem;gap:1.5rem;backdrop-filter:blur(20px);z-index:899;border-bottom:1px solid rgba(240,237,230,.08)';
  });
  window.addEventListener('resize', () => {
    if (innerWidth >= 960) {
      nlEl.removeAttribute('style');
      hbg.style.display = 'none';
    } else if (!nlEl.style.display) {
      nlEl.style.display = 'none';
    }
  });
  if (innerWidth < 960) hbg.style.display = 'flex';
}

/* ═══════════════════════════════════
   UTILITIES
═══════════════════════════════════ */
function copyEmail(e) {
  if (e) e.preventDefault();
  navigator.clipboard.writeText(PERSONAL.email)
    .then(() => showToast('✓ Email copied to clipboard'));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ═══════════════════════════════════
   DOM BUILDERS — read from data.js
═══════════════════════════════════ */

function buildMarquee() {
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];
  document.getElementById('mqt').innerHTML =
    items.map(i => `<span class="mqi"><span class="mqs">✦</span>${i}</span>`).join('');
}

function buildTiles() {
  const container = document.getElementById('tiles');
  TILES.forEach(t => {
    const b = document.createElement('button');
    b.className = 'tile fu';
    b.innerHTML = `
      <span class="t-num">${t.num}</span>
      <span class="t-name">${t.name}</span>
      <span class="t-sub">${t.sub}</span>
      <span class="t-arr">↗</span>`;
    b.onclick = () => t.pid ? goTo(t.pid) : scrollToContact();
    container.appendChild(b);
  });
}

function buildExperience() {
  document.getElementById('exp-grid').innerHTML = EXPERIENCE.map((x, i) => `
    <div class="exp-card fu" style="transition-delay:${i * 0.12}s">
      <span class="exp-badge">${x.badge}</span>
      <div class="exp-dot"></div>
      <div class="exp-role">${x.role}</div>
      <div class="exp-org">${x.org}</div>
      <div class="exp-period">${x.period}</div>
      <div class="exp-desc">${x.desc}</div>
    </div>`).join('');
}

function buildContactLinks() {
  document.getElementById('ct-links').innerHTML = CONTACT_LINKS.map(lk => `
    <div class="ct-lnk" ${lk.copyEmail ? 'onclick="copyEmail(event)"' : ''}>
      ${!lk.copyEmail
        ? `<a href="${lk.href}" target="${lk.href.startsWith('http') ? '_blank' : ''}" style="position:absolute;inset:0;z-index:5;cursor:none"></a>`
        : ''}
      <div class="ct-fill"></div>
      <span class="ci">${lk.icon}</span>
      <div class="ctx">
        <span class="ck">${lk.label}</span>
        <span class="cv">${lk.value}</span>
      </div>
      <span class="ca">↗</span>
    </div>`).join('');
}

/* ── Projects ── */
const openCases = new Set();

function buildProjects() {
  document.getElementById('proj-list').innerHTML = PROJECTS.map((p, i) => `
    <div class="prow fu" style="transition-delay:${i * 0.07}s" id="prow-${i}">
      <div class="prow-header">
        <div class="pr-n">${p.num}</div>
        <div>
          <div class="pr-cat">${p.cat}</div>
          <div class="pr-t">${p.title}</div>
          <div class="pr-imp">⚡ ${p.imp}</div>
          <div class="pr-d">${p.desc}</div>
          <div class="pr-tags">${p.tags.map(t => `<span class="prtag">${t}</span>`).join('')}</div>
        </div>
        <div class="pr-acts">
          ${p.github ? `<a class="pr-lnk" href="${p.github}" target="_blank">GitHub ↗</a>` : ''}
          ${p.demo   ? `<a class="pr-lnk" href="${p.demo}"   target="_blank">Live ↗</a>` : ''}
          <button class="pr-expand-btn" onclick="toggleCase(${i})">
            Case Study <span class="ex-arrow">↓</span>
          </button>
        </div>
      </div>
      <div class="case-panel" id="case-${i}">
        <div class="case-inner">
          <div class="case-thumb" id="case-thumb-${i}">
            <canvas id="proj-canvas-${i}"></canvas>
            <div class="case-thumb-overlay"></div>
          </div>
          <div class="case-content">
            <div>
              <div class="case-block-title">The Problem</div>
              <div class="case-block-body">${p.study.problem}</div>
            </div>
            <div>
              <div class="case-block-title">The Approach</div>
              <div class="case-block-body">${p.study.approach}</div>
            </div>
            <div>
              <div class="case-block-title">The Outcome</div>
              <div class="case-block-body">${p.study.outcome}</div>
              <div class="case-metrics">
                ${p.study.metrics.map(m => `
                  <div class="case-metric">
                    <span class="cm-n">${m.n}</span>
                    <span class="cm-l">${m.l}</span>
                  </div>`).join('')}
              </div>
            </div>
            ${p.github ? `<a class="case-cta" href="${p.github}" target="_blank">View Repository ↗</a>` : ''}
            ${p.demo   ? `<a class="case-cta" href="${p.demo}"   target="_blank" style="margin-top:.5rem;background:var(--teal)">Live Demo ↗</a>` : ''}
          </div>
        </div>
      </div>
    </div>`).join('');
}

function toggleCase(idx) {
  const prow  = document.getElementById('prow-' + idx);
  const isOpen = openCases.has(idx);

  if (isOpen) {
    prow.classList.remove('open');
    openCases.delete(idx);
  } else {
    prow.classList.add('open');
    openCases.add(idx);
    setTimeout(() => {
      const canvas = document.getElementById('proj-canvas-' + idx);
      if (canvas && !canvas.dataset.drawn) {
        canvas.dataset.drawn = '1';
        drawProjectPlaceholder(canvas, PROJECTS[idx].title, PROJECTS[idx].tags, PROJECTS[idx].accentColor);
      }
    }, 80);
  }
}

/* ── Skills ── */
function buildSkills() {
  const groups = ['Languages', 'Frameworks', 'Tools'];
  document.getElementById('panel-prof').innerHTML = `<div class="sk-grps">
    ${groups.map((g, gi) => `
      <div class="sg-card fu" style="transition-delay:${gi * 0.08}s">
        <div class="sg-hd">${g}</div>
        ${SKILLS_PROF.filter(s => s.group === g).map(s => `
          <div class="sk-row">
            <span class="sk-nm">${s.name}</span>
            <div class="sk-bw"><div class="sk-b" data-p="${s.p / 100}"></div></div>
          </div>`).join('')}
      </div>`).join('')}
  </div>`;

  const renderPills = (id, data) => {
    document.getElementById(id).innerHTML = data.map(p => `
      <div class="pill">
        <span class="p-ico">${p.icon}</span>
        <div><span class="p-name">${p.name}</span><span class="p-sub">${p.sub}</span></div>
      </div>`).join('');
  };
  renderPills('pills-lang',  SKILLS_LANGS);
  renderPills('pills-fw',    SKILLS_FRAMEWORKS);
  renderPills('pills-tools', SKILLS_TOOLS);

  document.getElementById('soft-grid').innerHTML = SKILLS_SOFT.map(s => `
    <div class="soft-card fu">
      <span class="soft-icon">${s.icon}</span>
      <div class="soft-name">${s.name}</div>
      <div class="soft-bw"><div class="soft-b" data-p="${s.p / 100}"></div></div>
    </div>`).join('');

  // Tab switching
  document.querySelectorAll('.stab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stab').forEach(b => b.classList.remove('act'));
      document.querySelectorAll('.sk-pan').forEach(p => p.classList.remove('act'));
      btn.classList.add('act');
      const panel = document.getElementById('panel-' + btn.dataset.tab);
      panel.classList.add('act');
      panel.querySelectorAll('.sk-b, .soft-b').forEach(b => {
        b.classList.remove('on');
        setTimeout(() => b.classList.add('on'), 120);
      });
      panel.querySelectorAll('.fu').forEach(el => {
        el.classList.remove('in');
        setTimeout(() => el.classList.add('in'), 50);
      });
    });
  });
}

/* ── Certifications ── */
function buildCerts() {
  const featured = CERTS.filter(c => c.featured);
  const rest     = CERTS.filter(c => !c.featured);

  document.getElementById('cert-feat').innerHTML = featured.map((c, i) => `
    <a class="cert-h fu" href="${c.link}" target="_blank" style="transition-delay:${i * 0.1}s">
      <canvas class="cert-h-canvas" id="cert-feat-canvas-${i}"></canvas>
      <div class="cert-h-body">
        <div class="cert-hb">${c.num} · Featured</div>
        <div class="cert-hn">${c.name}</div>
        <div class="cert-hi">${c.issuer}</div>
        <div class="cert-hy">${c.year}</div>
      </div>
      <div class="cert-ha">↗</div>
    </a>`).join('');

  document.getElementById('cert-grid').innerHTML = rest.map((c, i) => `
    <a class="cert-card fu" href="${c.link}" target="_blank" style="transition-delay:${i * 0.07}s">
      <canvas class="cert-card-canvas" id="cert-card-canvas-${i}"></canvas>
      <div class="cert-card-body">
        <div class="cert-num">${c.num}</div>
        <div class="cert-cn">${c.name}</div>
        <div class="cert-ci">${c.issuer}</div>
        <div class="cert-cy">${c.year}</div>
      </div>
      <div class="cert-ca">↗</div>
    </a>`).join('');
}

function renderCertCanvases() {
  const featured = CERTS.filter(c => c.featured);
  const rest     = CERTS.filter(c => !c.featured);

  featured.forEach((c, i) => {
    const canvas = document.getElementById('cert-feat-canvas-' + i);
    if (canvas) drawCertPlaceholder(canvas, c.issuer, c.accent || '#c9903a', true);
  });
  rest.forEach((c, i) => {
    const canvas = document.getElementById('cert-card-canvas-' + i);
    if (canvas) drawCertPlaceholder(canvas, c.issuer, c.accent || '#c9903a', false);
  });
}

/* ═══════════════════════════════════
   BOOT — run everything
═══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Build all dynamic content from data.js
  buildMarquee();
  buildTiles();
  buildExperience();
  buildContactLinks();
  buildProjects();
  buildSkills();
  buildCerts();

  // Wire up UI systems
  initCursors();
  initScroll();
  initMobileNav();
  initStatsObserver();
  initLoader();   // loader last — it fires the page reveal chain

  // Cert canvases need a brief delay for layout
  setTimeout(renderCertCanvases, 350);

  // Tilt + magnetic need elements to exist first
  setTimeout(() => { initTilt(); initMagnetic(); }, 100);
});

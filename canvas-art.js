/* ============================================================
   canvas-art.js  —  Procedural placeholder art
   ============================================================
   Generates branded canvas visuals for:
     - Certification cards  (drawCertPlaceholder)
     - Project case study thumbnails  (drawProjectPlaceholder)

   No external images needed. Art is drawn with the Canvas 2D
   API using the portfolio's gold/dark colour palette.
   ============================================================ */

/**
 * Draw a branded certification placeholder onto a <canvas>.
 * @param {HTMLCanvasElement} canvas
 * @param {string}  label       — issuer name (e.g. "Amazon Web Services")
 * @param {string}  accentColor — brand hex (e.g. "#FF9900")
 * @param {boolean} isLarge     — true for featured (tall) cards
 */
function drawCertPlaceholder(canvas, label, accentColor, isLarge) {
  const ctx = canvas.getContext('2d');
  const w   = canvas.width  = canvas.offsetWidth  || (isLarge ? 480 : 340);
  const h   = canvas.height = isLarge ? 140 : 100;

  // Dark gradient background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0e0d0b');
  bg.addColorStop(1, '#1a1410');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Diagonal accent stripe
  const stripeW = w * 0.38;
  const grad    = ctx.createLinearGradient(0, 0, stripeW, h);
  grad.addColorStop(0, accentColor + '18');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(stripeW, 0);
  ctx.lineTo(stripeW * 0.7, h);
  ctx.lineTo(0, h);
  ctx.fill();

  // Subtle dot grid
  ctx.fillStyle = 'rgba(240,237,230,0.04)';
  for (let x = 12; x < w; x += 20) {
    for (let y = 10; y < h; y += 20) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Circular badge on the left
  const cx = isLarge ? 60 : 44;
  const cy = h / 2;
  const cr = isLarge ? 28 : 20;
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.strokeStyle = accentColor + '60';
  ctx.lineWidth   = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, cr * 0.6, 0, Math.PI * 2);
  ctx.fillStyle = accentColor + '22';
  ctx.fill();

  // Issuer label text
  ctx.font      = `${isLarge ? 11 : 9}px 'DM Mono', monospace`;
  ctx.fillStyle = accentColor + 'cc';
  ctx.fillText(label.toUpperCase(), cx + cr + 14, cy - (isLarge ? 8 : 6));

  ctx.font      = `${isLarge ? 9 : 7.5}px 'DM Mono', monospace`;
  ctx.fillStyle = 'rgba(240,237,230,0.3)';
  ctx.fillText('CREDENTIAL · VERIFIED', cx + cr + 14, cy + (isLarge ? 10 : 7));

  // Top-right corner bracket
  ctx.strokeStyle = accentColor + '30';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(w - 20, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, 20);
  ctx.stroke();
}

/**
 * Draw a branded project thumbnail onto a <canvas>.
 * @param {HTMLCanvasElement} canvas
 * @param {string}   title       — project title
 * @param {string[]} tags        — tech stack tags
 * @param {string}   accentColor — hex accent colour
 */
function drawProjectPlaceholder(canvas, title, tags, accentColor) {
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  const rw   = rect.width  || 400;
  const rh   = rect.height || 280;

  canvas.width  = rw * dpr;
  canvas.height = rh * dpr;
  canvas.style.width  = '100%';
  canvas.style.height = '100%';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // Background
  const bg = ctx.createLinearGradient(0, 0, rw, rh);
  bg.addColorStop(0, '#0a0a0a');
  bg.addColorStop(1, '#141210');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, rw, rh);

  // Perspective grid lines
  ctx.strokeStyle = 'rgba(201,144,58,0.05)';
  ctx.lineWidth   = 1;
  for (let x = 0; x < rw; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, rh); ctx.stroke();
  }
  for (let y = 0; y < rh; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(rw, y); ctx.stroke();
  }

  // Large ghost number (project index)
  ctx.font         = `bold ${rh * 0.65}px 'Special Elite', cursive`;
  ctx.fillStyle    = 'rgba(201,144,58,0.04)';
  ctx.textBaseline = 'middle';
  ctx.fillText('01', rw * 0.1, rh * 0.52);

  // Radial accent glow
  const grd = ctx.createRadialGradient(rw * 0.75, rh * 0.5, 0, rw * 0.75, rh * 0.5, rw * 0.4);
  grd.addColorStop(0, accentColor + '20');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, rw, rh);

  // Diagonal accent line
  ctx.strokeStyle = accentColor + '40';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(0, rh * 0.3);
  ctx.lineTo(rw * 0.6, rh * 0.9);
  ctx.stroke();

  // Project title text
  ctx.font         = `400 ${Math.min(18, rw / 16)}px 'Playfair Display', serif`;
  ctx.fillStyle    = 'rgba(240,237,230,0.55)';
  ctx.textBaseline = 'top';
  ctx.fillText(title.substring(0, 22), 24, rh * 0.72);

  // Tag chips along bottom
  let tx = 24;
  ctx.font = '300 8px "DM Mono", monospace';
  (tags || []).slice(0, 3).forEach(tag => {
    const tw = ctx.measureText(tag).width + 16;
    ctx.fillStyle   = 'rgba(201,144,58,0.1)';
    ctx.strokeStyle = 'rgba(201,144,58,0.25)';
    ctx.lineWidth   = 1;
    ctx.fillRect(tx, rh * 0.84, tw, 16);
    ctx.strokeRect(tx, rh * 0.84, tw, 16);
    ctx.fillStyle = 'rgba(201,144,58,0.8)';
    ctx.fillText(tag, tx + 8, rh * 0.84 + 4);
    tx += tw + 8;
  });

  // Corner brackets
  ctx.strokeStyle = accentColor + '50';
  ctx.lineWidth   = 1.5;
  ctx.beginPath(); ctx.moveTo(rw - 30, 8); ctx.lineTo(rw - 8, 8); ctx.lineTo(rw - 8, 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8, rh - 30); ctx.lineTo(8, rh - 8); ctx.lineTo(30, rh - 8); ctx.stroke();
}

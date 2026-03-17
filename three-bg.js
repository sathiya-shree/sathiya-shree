/* ============================================================
   three-bg.js  —  3D WebGL background scenes
   ============================================================
   Uses Three.js (loaded via CDN in index.html).
   Four scene types:
     'hero'   — floating wireframe icosahedra + particles
     'wave'   — animated rippling wire grid
     'dna'    — double helix rotating strands
     'sphere' — geodesic sphere with orbiting rings
   ============================================================ */

/**
 * Attach a Three.js animated background to a container element.
 * @param {string} containerId  — id of the .bg3d div
 * @param {string} sceneType   — 'hero' | 'wave' | 'dna' | 'sphere'
 * @returns {{ stop, resize }}  — control handles
 */
function make3DScene(containerId, sceneType) {
  const container = document.getElementById(containerId);
  if (!container || !window.THREE) return null;

  // Guard: don't double-init
  if (container.querySelector('canvas')) return null;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.classList.add('bg3d-canvas');

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.z = 5;

  const clock = new THREE.Clock();
  let animFn;

  /* ── SCENE BUILDERS ───────────────────────────────────── */

  if (sceneType === 'hero') {
    // Floating wireframe icosahedra network + particle field
    const geo = new THREE.IcosahedronGeometry(1, 1);
    for (let i = 0; i < 18; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xc9903a, wireframe: true, transparent: true, opacity: 0.06,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8 - 4
      );
      m.scale.setScalar(Math.random() * 1.5 + 0.3);
      m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      m.userData = {
        rx: Math.random() * 0.004 - 0.002,
        ry: Math.random() * 0.004 - 0.002,
        vy: (Math.random() - 0.5) * 0.006,
      };
      scene.add(m);
    }

    // Large slow-spinning torus ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(6, 0.015, 2, 80),
      new THREE.MeshBasicMaterial({ color: 0xc9903a, transparent: true, opacity: 0.08 })
    );
    ring.rotation.set(0.4, 0.2, 0);
    scene.add(ring);

    // Particle field
    const pPos = new Float32Array(400 * 3);
    for (let i = 0; i < pPos.length; i++) pPos[i] = (Math.random() - 0.5) * 30;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xc9903a, size: 0.04, transparent: true, opacity: 0.35,
    })));

    animFn = () => {
      const t = clock.getElapsedTime();
      ring.rotation.z = t * 0.04;
      scene.children.forEach(obj => {
        if (obj.userData.ry !== undefined) {
          obj.rotation.x += obj.userData.rx;
          obj.rotation.y += obj.userData.ry;
          obj.position.y += obj.userData.vy;
          if (obj.position.y >  8) obj.position.y = -8;
          if (obj.position.y < -8) obj.position.y =  8;
        }
      });
    };

  } else if (sceneType === 'wave') {
    // Animated rippling wire-mesh plane
    const planeGeo = new THREE.PlaneGeometry(20, 12, 40, 24);
    const plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
      color: 0xc9903a, wireframe: true, transparent: true, opacity: 0.07,
    }));
    plane.rotation.x = -Math.PI * 0.35;
    plane.position.set(0, -1, -2);
    scene.add(plane);

    const posAttr = planeGeo.attributes.position;
    const origY   = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) origY[i] = posAttr.getY(i);

    animFn = () => {
      const t = clock.getElapsedTime();
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i), z = posAttr.getZ(i);
        posAttr.setY(i, origY[i] + Math.sin(x * 0.6 + t * 0.8) * 0.35 + Math.sin(z * 0.4 + t * 0.6) * 0.2);
      }
      posAttr.needsUpdate = true;
    };

  } else if (sceneType === 'dna') {
    // Double-helix strands with connector rungs
    const curve1 = [], curve2 = [];
    const connectors = [];
    for (let i = 0; i < 80; i++) {
      const t = i / 80, y = (t - 0.5) * 16, r = 1.8;
      const a1 = t * Math.PI * 6, a2 = a1 + Math.PI;
      curve1.push(new THREE.Vector3(Math.cos(a1) * r, y, Math.sin(a1) * r));
      curve2.push(new THREE.Vector3(Math.cos(a2) * r, y, Math.sin(a2) * r));
      if (i % 8 === 0) {
        connectors.push([
          new THREE.Vector3(Math.cos(a1) * r, y, Math.sin(a1) * r),
          new THREE.Vector3(Math.cos(a2) * r, y, Math.sin(a2) * r),
        ]);
      }
    }
    const mkLine = (pts, color, opacity) => {
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      return new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
    };
    const group = new THREE.Group();
    group.add(mkLine(curve1, 0xc9903a, 0.15));
    group.add(mkLine(curve2, 0xe0a84a, 0.08));
    connectors.forEach(([a, b]) => group.add(mkLine([a, b], 0xc9903a, 0.10)));
    scene.add(group);

    animFn = () => { group.rotation.y = clock.getElapsedTime() * 0.12; };

  } else if (sceneType === 'sphere') {
    // Geodesic sphere + concentric orbiting rings
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2, 2),
      new THREE.MeshBasicMaterial({ color: 0xc9903a, wireframe: true, transparent: true, opacity: 0.07 })
    );
    scene.add(sphere);

    const rings = [];
    [2.6, 3.2, 3.8].forEach((r, i) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.012, 2, 64),
        new THREE.MeshBasicMaterial({ color: 0xc9903a, transparent: true, opacity: 0.06 - i * 0.01 })
      );
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.z = Math.random() * Math.PI;
      ring.userData = { speed: 0.008 - i * 0.002 };
      scene.add(ring);
      rings.push(ring);
    });

    animFn = () => {
      const t = clock.getElapsedTime();
      sphere.rotation.y = t * 0.06;
      sphere.rotation.x = t * 0.03;
      rings.forEach(r => { r.rotation.z += r.userData.speed; r.rotation.x += r.userData.speed * 0.5; });
    };

  } else {
    // Fallback: simple rotating particle cloud
    const pPos = new Float32Array(300 * 3);
    for (let i = 0; i < pPos.length; i++) pPos[i] = (Math.random() - 0.5) * 20;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xc9903a, size: 0.06, transparent: true, opacity: 0.4,
    })));
    animFn = () => { scene.rotation.y = clock.getElapsedTime() * 0.04; };
  }

  /* ── RESIZE ───────────────────────────────────────────── */
  function resize() {
    const w = container.offsetWidth, h = container.offsetHeight || 300;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── RENDER LOOP ──────────────────────────────────────── */
  let raf;
  function loop() {
    raf = requestAnimationFrame(loop);
    if (animFn) animFn();
    renderer.render(scene, camera);
  }
  loop();

  return {
    stop:   () => cancelAnimationFrame(raf),
    resize: resize,
  };
}

// Funzioni condivise dai template Reel di Battute Gelate.
const $ = (id) => document.getElementById(id);
const cl = (x) => Math.max(0, Math.min(1, x));
const ease = (x) => 1 - Math.pow(1 - cl(x), 3);
const easeIO = (x) => { x = cl(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = (x) => { x = cl(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const hlWords = (s) => s.replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');
const pad2 = (n) => String(n).padStart(2, '0');
const END_LEN = 1.9; // durata della chiusura "SEGUI": corta, per non perdere chi guarda
// numeri casuali ripetibili (stesso seme = stesso video)
function rng(seed) { let s = (seed * 2654435761) >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

const GRAIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='360'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.9 0'/></filter><rect width='360' height='360' filter='url(%23n)'/></svg>\")";

// Struttura fissa: sfondo con profondità, testata, barra di avanzamento, overlay di congelamento, chiusura.
let SH = [];
function baseLayer(fmtLabel, handle, endText, opts) {
  opts = opts || {};
  const b = document.body, r = rng(11);
  // frammenti di ghiaccio che salgono lenti sullo sfondo, su tre piani di profondità
  SH = Array.from({ length: 16 }, (_, k) => ({ x: r() * 1080, y: r() * 2200, s: 40 + r() * 150, v: 14 + r() * 46, rot: r() * 360, vr: (r() - 0.5) * 40, kind: k % 4 }));
  const shape = (o) => {
    const st = `stroke="var(--fg)" stroke-width="${Math.max(4, 700 / o.s)}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
    const g = [`<rect x="14" y="14" width="72" height="72" rx="18" ${st}/><path d="M30 34 q14 -8 30 -2" ${st}/>`,
      `<path d="M50 10 V90 M10 50 H90 M22 22 L78 78 M78 22 L22 78" ${st}/>`,
      `<path d="M50 12 L86 80 H14 Z" ${st}/>`, `<circle cx="50" cy="50" r="34" ${st}/>`][o.kind];
    return `<svg class="shard" width="${o.s}" height="${o.s}" viewBox="0 0 100 100" style="opacity:${0.05 + (o.v - 14) / 46 * 0.11}">${g}</svg>`;
  };
  b.insertAdjacentHTML('afterbegin', `
    <div id="bgc"><div id="glow"></div><div id="grid"></div><div id="shards">${SH.map(shape).join('')}</div><div id="vig"></div><div id="grain"></div></div>`);
  b.insertAdjacentHTML('beforeend', `
    <div class="logo"><span>BATTUTE GELATE</span><span class="tag">${fmtLabel}</span></div>
    ${opts.noProg ? '' : '<div id="prog"><b id="progB"></b></div>'}
    <div id="frostAll"></div>
    <svg id="crackAll" viewBox="0 0 1080 1920" preserveAspectRatio="none"><g stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M0 260 L150 330 L220 250 L350 360 L420 310"/><path d="M1080 220 L930 320 L880 250 L720 350"/>
      <path d="M0 1560 L160 1500 L230 1600 L380 1520"/><path d="M1080 1620 L920 1540 L860 1640 L700 1560"/></g></svg>
    <div id="stampAll">BRRR!</div>
    <div id="flashAll"></div>
    <div id="endAll"><div id="endM"></div><div class="t1">${endText}</div><div class="t2">SEGUI ${handle.toUpperCase()}</div></div>`);
  $('endM').innerHTML = gelo('ride', 300);
}

// Effetto congelamento: p = secondi dall'inizio della battuta (null = spento)
function freeze(p, stampPos) {
  const on = p !== null && p >= 0;
  const fz = on ? ease(p / 0.25) : 0;
  $('frostAll').style.opacity = fz; $('crackAll').style.opacity = fz;
  $('flashAll').style.opacity = on && p < 0.14 ? 0.85 * (1 - p / 0.14) : 0;
  const st = $('stampAll');
  st.style.display = on ? 'block' : 'none';
  if (on) {
    st.style.left = stampPos[0] + 'px'; st.style.top = stampPos[1] + 'px';
    st.style.transform = `rotate(-10deg) scale(${2.2 - 1.2 * back((p - 0.12) / 0.28)})`;
    st.style.opacity = cl((p - 0.12) * 8);
  }
  return on && p < 0.4 ? Math.sin(p * 95) * 16 * (1 - p / 0.4) : 0; // scossa
}

function endCard(t, start) {
  const e = $('endAll');
  if (t < start) { e.style.display = 'none'; return false; }
  const p = t - start; e.style.display = 'flex';
  e.style.clipPath = `circle(${ease(p / 0.38) * 150}% at 50% 60%)`;
  $('endM').style.transform = `scale(${back((p - 0.08) / 0.36)}) rotate(${Math.sin(t * 6) * 6}deg)`;
  const t1 = e.querySelector('.t1'), t2 = e.querySelector('.t2');
  t1.style.transform = `translateY(${(1 - back((p - 0.16) / 0.36)) * 120}px)`; t1.style.opacity = cl((p - 0.16) * 8);
  t2.style.transform = `scale(${back((p - 0.3) / 0.34) * (1 + 0.04 * Math.sin(t * 9))}) rotate(-2deg)`; t2.style.opacity = cl((p - 0.3) * 8);
  freeze(null);
  return true;
}

function bgTick(t) {
  $('grid').style.transform = `translate(${-(t * 30) % 120}px, ${-(t * 30) % 120}px)`;
  const el = $('shards').children;
  for (let k = 0; k < SH.length; k++) {
    const o = SH[k]; const y = ((o.y - t * o.v) % 2300 + 2300) % 2300 - 200;
    el[k].style.transform = `translate(${o.x + Math.sin(t * 0.6 + k) * 22}px, ${y}px) rotate(${o.rot + t * o.vr}deg)`;
  }
  $('glow').style.transform = `translate(${Math.sin(t * 0.5) * 60}px, ${Math.cos(t * 0.4) * 60}px)`;
  const pb = $('progB'); if (pb) pb.style.width = (100 * cl(t / ((window.DUR || 20) - END_LEN))) + '%';
}

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1080px; height: 1920px; overflow: hidden; }
  body { background: var(--bg); color: var(--fg); position: relative; font-family: var(--f-testo); -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }
  #bgc { position: absolute; inset: 0; overflow: hidden; transition: none; }
  #glow { position: absolute; inset: -160px; background:
      radial-gradient(ellipse 900px 800px at 18% 12%, rgba(255,255,255,0.26), rgba(255,255,255,0) 70%),
      radial-gradient(ellipse 1000px 900px at 88% 92%, rgba(10,15,61,0.34), rgba(10,15,61,0) 70%); }
  #grid { position: absolute; inset: -200px; background-image:
      linear-gradient(var(--line) 3px, transparent 3px), linear-gradient(90deg, var(--line) 3px, transparent 3px);
    background-size: 120px 120px; }
  #shards { position: absolute; inset: 0; }
  .shard { position: absolute; left: 0; top: 0; }
  #vig { position: absolute; inset: 0; background: radial-gradient(ellipse at center, rgba(10,15,61,0) 58%, rgba(10,15,61,0.22) 100%); }
  #grain { position: absolute; inset: 0; background-image: ${GRAIN}; opacity: 0.16; mix-blend-mode: overlay; }
  .logo { position: absolute; top: 120px; left: 70px; display: flex; align-items: center; gap: 16px; z-index: 15;
    font-family: var(--f-logo); font-size: 34px; letter-spacing: 1px; color: var(--fg); }
  .logo .tag { font-family: var(--f-mono); font-size: 24px; background: var(--inchiostro); color: #fff; padding: 6px 14px; border-radius: 10px; letter-spacing: 1px; }
  #prog { position: absolute; top: 78px; left: 70px; right: 70px; height: 12px; border-radius: 6px; background: rgba(10,15,61,0.28); z-index: 15; overflow: hidden; }
  #progB { display: block; height: 100%; width: 0; background: var(--alt); border-radius: 6px; }
  .hl { background: var(--limone); color: var(--inchiostro); padding: 0 16px; border-radius: 16px; display: inline-block; transform: rotate(-2deg); box-shadow: 0 7px 0 var(--inchiostro); }
  .theme-limone .hl { background: var(--cobalto); color: #fff; }
  .sticker { position: absolute; left: 70px; background: var(--sticker); color: var(--stickerfg); font-family: var(--f-titolo); font-weight: 700; z-index: 14;
    font-size: 38px; padding: 12px 26px; border-radius: 999px; border: 5px solid var(--inchiostro); box-shadow: 0 8px 0 var(--inchiostro); }
  #frostAll { position: absolute; inset: 0; z-index: 18; pointer-events: none; opacity: 0;
    background: radial-gradient(ellipse at center, rgba(234,246,255,0) 55%, rgba(234,246,255,0.85) 100%); }
  #crackAll { position: absolute; inset: 0; z-index: 19; pointer-events: none; opacity: 0; }
  #stampAll { position: absolute; z-index: 21; display: none; font-family: var(--f-logo); font-size: 96px; color: var(--limone);
    -webkit-text-stroke: 7px var(--inchiostro); paint-order: stroke fill; }
  #flashAll { position: absolute; inset: 0; background: #fff; z-index: 25; pointer-events: none; opacity: 0; }
  #endAll { position: absolute; inset: 0; z-index: 30; background: var(--kin); color: var(--kinfg); display: none; flex-direction: column; align-items: center; justify-content: center; gap: 46px; text-align: center; padding: 0 90px; }
  #endAll .t1 { font-family: var(--f-titolo); font-weight: 700; font-size: 96px; line-height: 1.02; letter-spacing: -2px; text-wrap: balance; }
  #endAll .t2 { font-family: var(--f-logo); font-size: 40px; background: var(--limone); color: var(--inchiostro); padding: 22px 40px 14px; border-radius: 22px; border: 6px solid var(--inchiostro); box-shadow: 0 10px 0 var(--inchiostro); }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${BASE_CSS}</style>`);

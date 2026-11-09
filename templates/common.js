// Funzioni condivise dai template Reel di Battute Gelate.
const $ = (id) => document.getElementById(id);
const cl = (x) => Math.max(0, Math.min(1, x));
const ease = (x) => 1 - Math.pow(1 - cl(x), 3);
const easeIO = (x) => { x = cl(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = (x) => { x = cl(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const hlWords = (s) => s.replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>');
const pad2 = (n) => String(n).padStart(2, '0');

// Struttura fissa: sfondo a griglia, testata, overlay di congelamento, chiusura.
function baseLayer(fmtLabel, handle, endText) {
  const b = document.body;
  b.insertAdjacentHTML('afterbegin', `
    <div id="bgc"><div id="grid"></div></div>`);
  b.insertAdjacentHTML('beforeend', `
    <div class="logo"><span>BATTUTE GELATE</span><span class="tag">${fmtLabel}</span></div>
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
  e.style.clipPath = `circle(${ease(p / 0.45) * 150}% at 50% 60%)`;
  $('endM').style.transform = `scale(${back((p - 0.1) / 0.4)}) rotate(${Math.sin(t * 6) * 6}deg)`;
  freeze(null);
  return true;
}

function bgTick(t) { $('grid').style.transform = `translate(${-(t * 30) % 120}px, ${-(t * 30) % 120}px)`; }

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1080px; height: 1920px; overflow: hidden; }
  body { background: var(--bg); color: var(--fg); position: relative; font-family: var(--f-testo); }
  #bgc { position: absolute; inset: 0; overflow: hidden; transition: none; }
  #grid { position: absolute; inset: -200px; background-image:
      linear-gradient(var(--line) 3px, transparent 3px), linear-gradient(90deg, var(--line) 3px, transparent 3px);
    background-size: 120px 120px; }
  .logo { position: absolute; top: 120px; left: 70px; display: flex; align-items: center; gap: 16px; z-index: 15;
    font-family: var(--f-logo); font-size: 34px; letter-spacing: 1px; color: var(--fg); }
  .logo .tag { font-family: var(--f-mono); font-size: 24px; background: var(--inchiostro); padding: 6px 14px; border-radius: 10px; letter-spacing: 1px; }
  .hl { background: var(--limone); color: var(--inchiostro); padding: 0 16px; border-radius: 16px; display: inline-block; transform: rotate(-2deg); }
  .sticker { position: absolute; left: 70px; background: var(--sticker); color: var(--stickerfg); font-family: var(--f-titolo); font-weight: 700; z-index: 14;
    font-size: 38px; padding: 12px 26px; border-radius: 999px; border: 5px solid var(--inchiostro); box-shadow: 0 8px 0 var(--inchiostro); }
  #frostAll { position: absolute; inset: 0; z-index: 18; pointer-events: none; opacity: 0;
    background: radial-gradient(ellipse at center, rgba(234,246,255,0) 55%, rgba(234,246,255,0.85) 100%); }
  #crackAll { position: absolute; inset: 0; z-index: 19; pointer-events: none; opacity: 0; }
  #stampAll { position: absolute; z-index: 21; display: none; font-family: var(--f-logo); font-size: 96px; color: var(--limone);
    -webkit-text-stroke: 7px var(--inchiostro); paint-order: stroke fill; }
  #flashAll { position: absolute; inset: 0; background: #fff; z-index: 25; pointer-events: none; opacity: 0; }
  #endAll { position: absolute; inset: 0; z-index: 30; background: var(--ghiacciolo); display: none; flex-direction: column; align-items: center; justify-content: center; gap: 46px; text-align: center; padding: 0 90px; }
  #endAll .t1 { font-family: var(--f-titolo); font-weight: 700; font-size: 96px; line-height: 1.02; letter-spacing: -2px; text-wrap: balance; }
  #endAll .t2 { font-family: var(--f-logo); font-size: 40px; background: var(--limone); color: var(--inchiostro); padding: 22px 40px 14px; border-radius: 22px; border: 6px solid var(--inchiostro); box-shadow: 0 10px 0 var(--inchiostro); }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${BASE_CSS}</style>`);

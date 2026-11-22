// CHE NUMERI: base comune dei Reel (font, temi di colore, logo, grana, fonte, chiusura).
// Tre temi che si alternano post dopo post: carta (chiaro), arancio, nero. La pressa e' sempre nera.
// I template sono disegnati con i colori originali (sfondo #0B0B10, testo #F4F4F6, evidenza #C8FF2E, focus #FF5B4A):
// recolor() li traduce nei colori del tema scelto, sia nei CSS sia nel canvas.
const BRAND = { nome: 'CHE NUMERI' };
const THEMES = {
  carta:   { bg: '#F2EFE8', ink: '#121212', mute: '#7A746B', hi: '#FF4A1C', top: '#FF4A1C', foc: '#2F5BFF', neu: ['#E3DDD1', '#CFC8BA', '#B5AD9E'], shadow: [70, 50, 30], over: [18, 18, 18], blend: 'multiply', grain: .10, vig: 'rgba(120,90,50,.16)', amb: ['rgba(255,74,28,.07)', 'rgba(47,91,255,.05)'], mark: ['#121212', '#FF4A1C'] },
  arancio: { bg: '#FF4A1C', ink: '#121212', mute: '#7A1E06', hi: '#FFF4EA', top: '#FFF4EA', foc: '#1D3DE6', neu: ['#D2400F', '#AE320A', '#842506'], shadow: [90, 15, 0], over: [18, 18, 18], blend: 'multiply', grain: .12, vig: 'rgba(110,20,0,.28)', amb: ['rgba(255,190,120,.18)', 'rgba(150,20,0,.20)'], mark: ['#121212', '#FFF4EA'] },
  nero:    { bg: '#121212', ink: '#F2EFE8', mute: '#8F897F', hi: '#FF4A1C', top: '#FF4A1C', foc: '#5B82FF', neu: ['#4A4744', '#2E2C2A', '#1C1B1A'], shadow: [0, 0, 0], over: [242, 239, 232], blend: 'screen', grain: .09, vig: 'rgba(0,0,0,.55)', amb: ['rgba(255,74,28,.08)', 'rgba(91,130,255,.06)'], mark: ['#F2EFE8', '#FF4A1C'] },
};
let TH = THEMES.nero;
const hex2rgb = (h) => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
const rgb2hex = (c) => '#' + c.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => rgb2hex(hex2rgb(a).map((v, i) => v + (hex2rgb(b)[i] - v) * t));
function themeMap() {
  const top = TH.top, foc = TH.foc;
  // nel tema nero i colori dei template restano quelli pensati per lo scuro, cambia solo l'accento
  const M = {
    '#0B0B10': TH.bg, '#121216': mix(TH.bg, TH.ink, .03), '#141418': mix(TH.bg, TH.ink, .04), '#15161C': mix(TH.bg, TH.ink, .05),
    '#F4F4F6': TH.ink, '#8B8B99': TH.mute,
    '#C8FF2E': top, '#E4FF8A': mix(top, '#FFFFFF', .45), '#E9FF9A': mix(top, '#FFFFFF', .5),
    '#7FA61A': mix(top, '#000000', .35), '#8FBF10': mix(top, '#000000', .25), '#9BD10F': mix(top, '#000000', .2), '#7DA414': mix(top, '#000000', .35), '#6E8F0E': mix(top, '#000000', .45), '#4F6608': mix(top, '#000000', .6),
    '#FF5B4A': foc, '#FF9A8E': mix(foc, '#FFFFFF', .4), '#A8301F': mix(foc, '#000000', .4),
    '#4A4A58': TH.neu[0], '#3A3A46': TH.neu[0], '#2C2C36': TH.neu[1], '#191920': TH.neu[2],
    // hype: il tramonto "synthwave" diventa nero e arancio
    '#2A0838': '#2A140C', '#1A0626': '#1C0E09', '#0B0614': '#120B08', '#07030C': '#0B0806', '#5A0F44': '#5A1E0C', '#7A1450': '#7A2A10',
    '#FF3E9A': '#FF4A1C', '#FF2E8A': '#E8360E', '#FF5A8A': '#FF6A3D', '#FF6FB0': '#FF7A4D', '#FFE08A': '#FFE6C2', '#FF8A3D': '#FF7A3D',
  };
  const R = { '255,62,154': '255,74,28', '255,120,200': '255,150,100', '200,255,46': hex2rgb(top).join(','), '255,91,74': hex2rgb(foc).join(','), '11,11,16': hex2rgb(TH.bg).join(','), '255,255,255': TH.over.join(','), '0,0,0': TH.shadow.join(',') };
  return { M, R };
}
let TMAP = themeMap();
function recolor(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/#[0-9a-fA-F]{6}\b/g, (h) => TMAP.M[h.toUpperCase()] || h)
    .replace(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,/g, (m, r, g, b) => { const k = `${r},${g},${b}`; return TMAP.R[k] ? `rgba(${TMAP.R[k]},` : m; });
}
// i colori scritti nel canvas e negli stili passano tutti da recolor()
(function patch() {
  const P = CanvasRenderingContext2D.prototype;
  for (const k of ['fillStyle', 'strokeStyle', 'shadowColor']) {
    const d = Object.getOwnPropertyDescriptor(P, k);
    Object.defineProperty(P, k, { set(v) { d.set.call(this, recolor(v)); }, get() { return d.get.call(this); }, configurable: true });
  }
  const acs = CanvasGradient.prototype.addColorStop;
  CanvasGradient.prototype.addColorStop = function (o, c) { return acs.call(this, o, recolor(c)); };
  const S = CSSStyleDeclaration.prototype;
  for (const k of ['background', 'backgroundColor', 'color', 'borderColor', 'boxShadow', 'textShadow', 'filter', 'fill', 'stroke']) {
    const d = Object.getOwnPropertyDescriptor(S, k); if (!d || !d.set) continue;
    Object.defineProperty(S, k, { set(v) { d.set.call(this, recolor(v)); }, get() { return d.get.call(this); }, configurable: true });
  }
})();
function setTheme(name) {
  TH = THEMES[name] || THEMES.nero; TMAP = themeMap();
  const r = document.documentElement.style;
  for (const k of ['bg', 'ink', 'mute', 'hi', 'top', 'foc']) r.setProperty('--' + k, TH[k]);
  r.setProperty('--vig', TH.vig); r.setProperty('--blend', TH.blend); r.setProperty('--grain', TH.grain);
  r.setProperty('--amb1', TH.amb[0]); r.setProperty('--amb2', TH.amb[1]);
  r.setProperty('--dim', mix(TH.bg, TH.bg, 0) + 'D9'); r.setProperty('--onTop', TH.bg);
  // i CSS dei template sono scritti con i colori originali: li traduco
  document.querySelectorAll('style:not([data-base])').forEach(st => { st.textContent = recolor(st.textContent); });
}
const $ = (id) => document.getElementById(id);
const cl = (x) => Math.max(0, Math.min(1, x));
const ease = (x) => 1 - Math.pow(1 - cl(x), 3);
const easeIO = (x) => { x = cl(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = (x) => { x = cl(x); const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = (n, dec) => Number(n).toLocaleString('it-IT', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
function rng(seed) { let s = (seed * 2654435761) >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
const END_LEN = 2.2;
const GRAIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='9'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")";

document.head.insertAdjacentHTML('beforeend', `<style data-base>
@font-face { font-family: "Shoulders"; src: url("fonts/BigShoulders-Bold.ttf"); font-weight: 700; }
@font-face { font-family: "Shoulders"; src: url("fonts/BigShoulders-Regular.ttf"); font-weight: 400; }
@font-face { font-family: "Geist"; src: url("fonts/GeistMono-Bold.ttf"); font-weight: 700; }
@font-face { font-family: "Geist"; src: url("fonts/GeistMono-Regular.ttf"); font-weight: 400; }
@font-face { font-family: "Serif"; src: url("fonts/InstrumentSerif-Italic.ttf"); font-style: italic; }
@font-face { font-family: "Outfit"; src: url("fonts/Outfit-Bold.ttf"); font-weight: 700; }
@font-face { font-family: "Brico"; src: url("fonts/BricolageGrotesque-Bold.ttf"); font-weight: 700; }
@font-face { font-family: "Outfit"; src: url("fonts/Outfit-Regular.ttf"); font-weight: 400; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1920px; overflow: hidden; }
body { background: var(--bg); color: var(--ink); position: relative; font-family: "Outfit"; -webkit-font-smoothing: antialiased; }
#amb { position: absolute; inset: -200px; background:
  radial-gradient(ellipse 800px 700px at 30% 30%, var(--amb1), transparent 70%),
  radial-gradient(ellipse 900px 800px at 80% 80%, var(--amb2), transparent 70%); }
#grain { position: absolute; inset: 0; background-image: ${GRAIN}; opacity: var(--grain); mix-blend-mode: var(--blend); z-index: 40; pointer-events: none; }
#vig { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 45%, transparent 55%, var(--vig)); z-index: 39; pointer-events: none; }
.brand { position: absolute; top: 92px; left: 70px; right: 70px; display: flex; align-items: center; justify-content: space-between; z-index: 30; }
.brand .w { display: flex; align-items: center; gap: 14px; font-family: "Shoulders"; font-weight: 700; font-size: 38px; letter-spacing: 3px; }
.brand .lg { display: inline-block; font-family: "Brico"; font-weight: 700; font-size: 46px; letter-spacing: -2px; line-height: 1; }
.brand .lg b { color: var(--hi); }
.brand .n { font-family: "Geist"; font-size: 24px; color: var(--mute); letter-spacing: 2px; }
.src { position: absolute; left: 70px; right: 70px; bottom: 96px; font-family: "Geist"; font-size: 22px; color: var(--mute); letter-spacing: 1px; z-index: 30; line-height: 1.4; }
.ser { font-family: "Serif"; font-style: italic; font-weight: 400; color: var(--hi); text-transform: none; letter-spacing: -1px; }
#hk { position: absolute; top: 196px; left: 70px; right: 70px; z-index: 20; }
#hk .k { font-family: "Geist"; font-weight: 700; font-size: 26px; letter-spacing: 5px; color: var(--hi); margin-bottom: 18px; }
#hk .t { font-family: "Shoulders"; font-weight: 700; font-size: 118px; line-height: .9; text-transform: uppercase; letter-spacing: -1px; }
#hk .t .ser { font-size: 134px; }
#cap { position: absolute; top: 210px; left: 70px; right: 70px; z-index: 20; font-family: "Shoulders"; font-weight: 700; font-size: 112px; line-height: .92; text-transform: uppercase; letter-spacing: -1px; }
#cap .ln { position: absolute; left: 0; right: 0; top: 0; }
#cap .w { display: inline-block; margin-right: .22em; will-change: transform; }
#cap .ser { font-size: 1.14em; }
#cap.big { font-size: 128px; }
.src { opacity: .75; }
#dim { position: absolute; inset: 0; z-index: 44; background: var(--dim); backdrop-filter: blur(10px); opacity: 0; pointer-events: none; }
#qq { position: absolute; left: 70px; right: 70px; top: 660px; z-index: 45; font-family: "Shoulders"; font-weight: 700; font-size: 150px; line-height: .88; text-transform: uppercase; opacity: 0; }
#qq .ser { font-size: 168px; }
#qq2 { position: absolute; left: 74px; top: 1010px; z-index: 45; font-family: "Geist"; font-weight: 700; font-size: 40px; background: var(--ink); color: var(--bg); padding: 16px 26px; border-radius: 14px; opacity: 0; }
#end { position: absolute; inset: 0; z-index: 50; background: var(--bg); display: none; flex-direction: column; justify-content: center; padding: 0 90px; gap: 40px; }
#end .a { font-family: "Shoulders"; font-weight: 700; font-size: 150px; line-height: .9; text-transform: uppercase; }
#end .b { font-family: "Outfit"; font-size: 48px; color: var(--mute); line-height: 1.2; }
#end .c { align-self: flex-start; font-family: "Geist"; font-weight: 700; font-size: 38px; background: var(--top); color: var(--onTop); padding: 22px 34px; border-radius: 16px; }
</style>`);

// carica subito i font, cosi' le misure dei testi sono giuste
window.FONTS_READY = Promise.all(['700 100px Shoulders', '700 40px Geist', '400 40px Geist', 'italic 100px Serif', '700 40px Outfit', '400 40px Outfit', '40px "Noto Color Emoji"', '700 40px Brico'].map(f => document.fonts.load(f, 'Aàè1')));
// logo: la scritta CHE NUMERI! (come la foto profilo), col punto esclamativo nel colore d'accento
const MARK = () => `<span class="lg">che numeri<b>!</b></span>`;
function base(reel, handle) {
  setTheme(reel.tema || (reel.template === 'pressa' ? 'nero' : 'carta'));
  const b = document.body;
  b.insertAdjacentHTML('afterbegin', '<div id="amb"></div>');
  b.insertAdjacentHTML('beforeend', `
    <div class="brand"><div class="w">${MARK()}</div><div class="n">N.${String(reel.numero || 1).padStart(2, '0')}</div></div>
    <div class="src">${reel.fonte ? 'FONTE: ' + reel.fonte : ''}</div>
    <div id="vig"></div><div id="grain"></div><div id="dim"></div><div id="qq"></div><div id="qq2"></div>
    <div id="end"><div class="a">${reel.fine_titolo || 'Ogni giorno<br>un <span class="ser">dato</span><br>che non sapevi'}</div><div class="b">${reel.fine || ''}</div><div class="c">SEGUI ${handle.toUpperCase()}</div></div>`);
}
const hl = (s) => String(s).replace(/\*([^*]+)\*/g, '<span class="ser">$1</span>');
// FRASI: una frase alla volta in alto, parola per parola, come un sottotitolo che racconta il dato.
// La prima e' il gancio (reel.hook), le altre sono reel.frasi; i tempi li decide il template con setFrasi([...]).
let FR = [], FR_T = [];
function hookBlock(reel) {
  const hook = (reel.hook || []).join(' ');
  FR = [hook].concat(reel.frasi || []);
  document.body.insertAdjacentHTML('beforeend', `<div id="cap"></div>`);
  $('cap').innerHTML = FR.map((f, i) => `<div class="ln" data-i="${i}">${String(f).split(/\s+/).map(w => {
    const acc = /^\*.*\*[.,!?:]*$/.test(w) || /^\*/.test(w) || /\*[.,!?:]*$/.test(w);
    return `<span class="w${acc ? ' ser' : ''}">${w.replace(/\*/g, '')}</span>`; }).join('')}</div>`).join('');
  // le parole di un accento su piu' parole (*quasi 10 volte*) restano tutte in corsivo
  $('cap').querySelectorAll('.ln').forEach((ln, i) => { let on = false; const raw = String(FR[i]).split(/\s+/);
    ln.querySelectorAll('.w').forEach((w, k) => { const r = raw[k] || ''; if (r.startsWith('*')) on = true; if (on) w.classList.add('ser'); if (/\*[.,!?:]*$/.test(r)) on = false; }); });
  // ogni frase si adatta: il gancio al massimo ~3 righe, le altre ~2 righe
  $('cap').querySelectorAll('.ln').forEach((ln, i) => {
    ln.style.display = 'block'; let fs = i === 0 ? 124 : 104; ln.style.fontSize = fs + 'px';
    while (ln.offsetHeight > (i === 0 ? 370 : 215) && fs > 56) { fs -= 4; ln.style.fontSize = fs + 'px'; }
    ln.style.display = 'none';
  });
  FR_T = [0];
  window.FR_T = FR_T;
}
function setFrasi(times) { FR_T = [FR[0] ? 0 : -1].concat(times).slice(0, FR.length); window.FR_T = FR_T; }
function hookAnim(t, hideAt) {
  const cap = $('cap'); if (!cap) return;
  let cur = -1; FR_T.forEach((ti, i) => { if (ti >= 0 && t >= ti) cur = i; });
  if (hideAt && t >= hideAt) cur = -1;
  cap.querySelectorAll('.ln').forEach((ln, i) => {
    const st = FR_T[i], nx = FR_T.slice(i + 1).find(x => x > st);
    const visible = i === cur || (nx && t >= nx && t < nx + 0.22 && i === cur - 1);
    ln.style.display = visible ? 'block' : 'none';
    if (!visible) return;
    const outP = nx ? ease((t - nx) / 0.15) : 0;
    ln.style.opacity = 1 - outP; ln.style.transform = `translateY(${-outP * 40}px)`;
    ln.querySelectorAll('.w').forEach((w, k) => {
      const p = st === 0 && i === 0 ? 1 : (t - st - 0.14 - k * 0.045) / 0.32;
      w.style.opacity = cl(p * 2.5); w.style.transform = `translateY(${(1 - ease(p)) * 50}px)`;
    });
  });
}
// la domanda resta su una riga per ogni riga scritta (rimpicciolisce se serve) e l'etichetta sta sempre sotto, mai sopra le parole
function fitDomanda(q, q2, minTop) {
  q.style.whiteSpace = 'nowrap';
  const W = q.clientWidth, k = Math.min(1, W / q.scrollWidth);
  if (k < 1) {
    q.style.fontSize = parseFloat(getComputedStyle(q).fontSize) * k + 'px';
    q.querySelectorAll('.ser').forEach(e => e.style.fontSize = parseFloat(getComputedStyle(e).fontSize) * k + 'px');
  }
  q2.style.top = Math.max(minTop, q.offsetTop + q.offsetHeight + 60) + 'px';
}
// domanda finale che chiede un commento
function domanda(t, start, reel) {
  const q = $('qq'), q2 = $('qq2'), d = $('dim');
  if (!reel.domanda) return;
  if (!q.innerHTML) { q.innerHTML = reel.domanda.map(hl).join('<br>'); q2.textContent = reel.domanda2 || ''; fitDomanda(q, q2, 1010); }
  const p = (t - start) / 0.45;
  d.style.opacity = cl(p); q.style.opacity = cl(p * 2); q.style.transform = `translateY(${(1 - ease(p)) * 60}px)`;
  q2.style.opacity = cl((p - 0.6) * 2); q2.style.transform = `scale(${back(p - 0.6)})`;
}
function endCard(t, start) {
  const e = $('end'); if (t < start) { e.style.display = 'none'; return false; }
  const p = t - start; e.style.display = 'flex';
  e.style.clipPath = `inset(${(1 - easeIO(p / 0.45)) * 100}% 0 0 0)`;
  [...e.children].forEach((c, i) => { const q = (p - 0.15 - i * 0.12) / 0.4; c.style.opacity = cl(q * 3); c.style.transform = `translateY(${(1 - ease(q)) * 80}px)`; });
  return true;
}

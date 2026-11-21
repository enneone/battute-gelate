// DATI ALLA MANO: base comune dei Reel (font, colori, logo, grana, fonte, chiusura).
const BRAND = { nome: 'DATI ALLA MANO', lime: '#C8FF2E', corallo: '#FF5B4A', bg: '#0B0B10', ink: '#F4F4F6', grigio: '#8B8B99' };
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

document.head.insertAdjacentHTML('beforeend', `<style>
@font-face { font-family: "Shoulders"; src: url("fonts/BigShoulders-Bold.ttf"); font-weight: 700; }
@font-face { font-family: "Shoulders"; src: url("fonts/BigShoulders-Regular.ttf"); font-weight: 400; }
@font-face { font-family: "Geist"; src: url("fonts/GeistMono-Bold.ttf"); font-weight: 700; }
@font-face { font-family: "Geist"; src: url("fonts/GeistMono-Regular.ttf"); font-weight: 400; }
@font-face { font-family: "Serif"; src: url("fonts/InstrumentSerif-Italic.ttf"); font-style: italic; }
@font-face { font-family: "Outfit"; src: url("fonts/Outfit-Bold.ttf"); font-weight: 700; }
@font-face { font-family: "Outfit"; src: url("fonts/Outfit-Regular.ttf"); font-weight: 400; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1920px; overflow: hidden; }
body { background: ${BRAND.bg}; color: ${BRAND.ink}; position: relative; font-family: "Outfit"; -webkit-font-smoothing: antialiased; }
#amb { position: absolute; inset: -200px; background:
  radial-gradient(ellipse 800px 700px at 30% 30%, rgba(200,255,46,0.07), transparent 70%),
  radial-gradient(ellipse 900px 800px at 80% 80%, rgba(255,91,74,0.07), transparent 70%); }
#grain { position: absolute; inset: 0; background-image: ${GRAIN}; opacity: .09; mix-blend-mode: screen; z-index: 40; pointer-events: none; }
#vig { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,.55)); z-index: 39; pointer-events: none; }
.brand { position: absolute; top: 92px; left: 70px; right: 70px; display: flex; align-items: center; justify-content: space-between; z-index: 30; }
.brand .w { display: flex; align-items: center; gap: 14px; font-family: "Shoulders"; font-weight: 700; font-size: 38px; letter-spacing: 3px; }
.brand .g { display: flex; align-items: flex-end; gap: 4px; height: 30px; }
.brand .g i { width: 8px; background: ${BRAND.lime}; border-radius: 2px; display: block; }
.brand .n { font-family: "Geist"; font-size: 24px; color: ${BRAND.grigio}; letter-spacing: 2px; }
.src { position: absolute; left: 70px; right: 70px; bottom: 96px; font-family: "Geist"; font-size: 22px; color: ${BRAND.grigio}; letter-spacing: 1px; z-index: 30; line-height: 1.4; }
.ser { font-family: "Serif"; font-style: italic; font-weight: 400; color: ${BRAND.lime}; text-transform: none; letter-spacing: -1px; }
#end { position: absolute; inset: 0; z-index: 50; background: ${BRAND.bg}; display: none; flex-direction: column; justify-content: center; padding: 0 90px; gap: 40px; }
#end .a { font-family: "Shoulders"; font-weight: 700; font-size: 150px; line-height: .9; text-transform: uppercase; }
#end .b { font-family: "Outfit"; font-size: 48px; color: ${BRAND.grigio}; line-height: 1.2; }
#end .c { align-self: flex-start; font-family: "Geist"; font-weight: 700; font-size: 38px; background: ${BRAND.lime}; color: #0B0B10; padding: 22px 34px; border-radius: 16px; }
</style>`);

function base(reel, handle) {
  const b = document.body;
  b.insertAdjacentHTML('afterbegin', '<div id="amb"></div>');
  b.insertAdjacentHTML('beforeend', `
    <div class="brand"><div class="w"><div class="g"><i style="height:40%"></i><i style="height:70%"></i><i style="height:100%"></i></div>${BRAND.nome}</div><div class="n">N.${String(reel.numero || 1).padStart(2, '0')}</div></div>
    <div class="src">${reel.fonte ? 'FONTE: ' + reel.fonte : ''}</div>
    <div id="vig"></div><div id="grain"></div>
    <div id="end"><div class="a">${reel.fine_titolo || 'Ogni giorno<br>un <span class="ser">dato</span><br>che non sapevi'}</div><div class="b">${reel.fine || ''}</div><div class="c">SEGUI ${handle.toUpperCase()}</div></div>`);
}
function endCard(t, start) {
  const e = $('end'); if (t < start) { e.style.display = 'none'; return false; }
  const p = t - start; e.style.display = 'flex';
  e.style.clipPath = `inset(${(1 - easeIO(p / 0.45)) * 100}% 0 0 0)`;
  [...e.children].forEach((c, i) => { const q = (p - 0.15 - i * 0.12) / 0.4; c.style.opacity = cl(q * 3); c.style.transform = `translateY(${(1 - ease(q)) * 80}px)`; });
  return true;
}

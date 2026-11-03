// "Gelo": la mascotte. Un cubetto di ghiaccio con 3 espressioni: "furbo", "gelato", "ride".
function gelo(expr, size) {
  expr = expr || 'furbo'; size = size || 200;
  const eyes = {
    furbo: '<path d="M62 92 q12 -10 24 0" stroke="#0A0F3D" stroke-width="9" fill="none" stroke-linecap="round"/>' +
           '<circle cx="134" cy="90" r="10" fill="#0A0F3D"/>',
    gelato: '<path d="M58 84 l26 14 M58 98 l26 -14" stroke="#0A0F3D" stroke-width="8" stroke-linecap="round"/>' +
            '<path d="M120 84 l26 14 M120 98 l26 -14" stroke="#0A0F3D" stroke-width="8" stroke-linecap="round"/>',
    ride: '<path d="M60 96 q12 -16 24 0" stroke="#0A0F3D" stroke-width="9" fill="none" stroke-linecap="round"/>' +
          '<path d="M120 96 q12 -16 24 0" stroke="#0A0F3D" stroke-width="9" fill="none" stroke-linecap="round"/>' +
          '<path d="M58 104 q-6 14 2 22" stroke="#4FF0C0" stroke-width="7" fill="none" stroke-linecap="round"/>'
  }[expr];
  const mouth = {
    furbo: '<path d="M78 128 q26 18 52 -4" stroke="#0A0F3D" stroke-width="9" fill="none" stroke-linecap="round"/>',
    gelato: '<rect x="72" y="120" width="60" height="22" rx="8" fill="#fff" stroke="#0A0F3D" stroke-width="6"/>' +
            '<path d="M87 120 v22 M102 120 v22 M117 120 v22" stroke="#0A0F3D" stroke-width="4"/>',
    ride: '<path d="M70 120 q32 40 64 0 z" fill="#0A0F3D"/><path d="M84 132 q18 12 36 0" fill="#FF4F9A"/>'
  }[expr];
  const cheeks = expr === 'gelato'
    ? '<ellipse cx="56" cy="122" rx="12" ry="7" fill="#7FB8FF"/><ellipse cx="150" cy="122" rx="12" ry="7" fill="#7FB8FF"/>'
    : '<ellipse cx="56" cy="122" rx="12" ry="7" fill="#FF4F9A" opacity="0.55"/><ellipse cx="150" cy="122" rx="12" ry="7" fill="#FF4F9A" opacity="0.55"/>';
  return `<svg width="${size}" height="${size}" viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="28" width="174" height="170" rx="40" fill="#0A0F3D"/>
    <rect x="12" y="14" width="174" height="170" rx="40" fill="#EAF6FF" stroke="#0A0F3D" stroke-width="8"/>
    <path d="M36 40 q30 -12 70 -4" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M150 34 l10 14" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
    <path d="M24 150 q60 22 150 0 v18 q-6 16 -40 16 h-70 q-34 0 -40 -16 z" fill="#BFE3FF"/>
    ${eyes}${mouth}${cheeks}
  </svg>`;
}
window.gelo = gelo;

"""Audio dei Reel di Dati alla mano: musica di sottofondo generata e suoni curati, in stereo.

La musica e' una base elettronica in La minore (La- Fa Do Sol) a 118 BPM:
cassa morbida, hi-hat, basso pulsato, accordi di pad e un arpeggio leggero.
Si apre con il filtro chiuso durante il gancio, si "apre" al primo dato e
sfuma sulla chiusura. Si abbassa da sola (ducking) quando suona un effetto.
"""
import numpy as np
from scipy.signal import butter, sosfilt, lfilter
import wave

SR = 44100
BPM = 118
BEAT = 60 / BPM
rng = np.random.default_rng(11)

# La minore pentatonica, per le note dei grafici (in armonia con la base)
PENTA = [440.0, 523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66]
PROG = [  # (basso, accordo) per battuta
    (55.0, [220.0, 261.63, 329.63]),    # La-
    (43.65, [174.61, 220.0, 261.63]),   # Fa
    (65.41, [196.0, 261.63, 329.63]),   # Do
    (49.0, [196.0, 246.94, 293.66]),    # Sol
]


def t_axis(d):
    return np.arange(int(d * SR)) / SR


def env(n, a=0.005, r=0.2, sustain=None):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4))
    return e * np.exp(-t / r) if sustain is None else e


def lp(x, f, order=2):
    return sosfilt(butter(order, min(f, SR / 2 - 100) / (SR / 2), 'low', output='sos'), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f / (SR / 2), 'high', output='sos'), x)


def bp(x, f1, f2):
    return sosfilt(butter(2, [f1 / (SR / 2), f2 / (SR / 2)], 'band', output='sos'), x)


def saw(f, t, det=0.0):
    ph = (f * (1 + det)) * t
    return 2 * (ph - np.floor(ph + 0.5))


def reverb(x, mix=0.25, decay=1.6):
    """Riverbero semplice: piu' linee di ritardo con retroazione, poi filtro."""
    out = np.zeros(len(x) + int(SR * decay))
    out[:len(x)] += x
    wet = np.zeros_like(out)
    for d, g in [(0.0297, .7), (0.0371, .68), (0.0411, .66), (0.0437, .64), (0.053, .6), (0.067, .55)]:
        n = int(d * SR)
        b = np.zeros(n + 1); b[0] = 1
        a = np.zeros(n + 1); a[0] = 1; a[n] = -g * 0.92
        wet += lfilter(b, a, np.pad(x, (0, len(out) - len(x))))
    wet = lp(wet / 6, 6000)
    return out * (1 - mix) + wet * mix


# ---------- effetti ----------
def sfx_whoosh(d=0.5):
    t = t_axis(d); n = len(t)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    # rumore filtrato che sale e scende di frequenza
    for k in range(0, n, 512):
        seg = noise[k:k + 512]
        c = 300 + 5000 * np.sin(np.pi * (k / n)) ** 2
        out[k:k + 512] = seg
    out = bp(out, 400, 7000) * np.sin(np.pi * t / d) ** 2
    return lp(out, 6000) * 0.5


def sfx_pop():
    t = t_axis(0.12); f = 900 * np.exp(-t * 30) + 420
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 38)
    return x * 0.45


def sfx_tick():
    t = t_axis(0.06)
    x = np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 90) + bp(rng.standard_normal(len(t)), 2000, 6000) * np.exp(-t * 140) * 0.4
    return x * 0.22


def sfx_hit():
    t = t_axis(0.9); f = 80 * np.exp(-t * 9) + 38
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 4.5)
    crack = hp(rng.standard_normal(len(t)), 1500) * np.exp(-t * 40) * 0.35
    x = sub * 0.9 + crack
    return reverb(x, 0.3, 1.4)[: int(1.6 * SR)] * 0.8


def sfx_bell(f0=1046.5):
    t = t_axis(1.6)
    x = sum(a * np.sin(2 * np.pi * f0 * r * t) * np.exp(-t * dcy) for r, a, dcy in [(1, 1, 2.2), (2.76, .45, 4), (5.4, .25, 7), (8.9, .1, 10)])
    return reverb(x * env(len(t), 0.002, 99, True), 0.35, 1.6)[: int(2.4 * SR)] * 0.22


def sfx_note(i):
    f = PENTA[i % len(PENTA)]
    t = t_axis(0.7)
    x = (np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 20)) * np.exp(-t * 6)
    return reverb(x * env(len(t), 0.002, 99, True), 0.3, 1.0)[: int(1.4 * SR)] * 0.28


def sfx_riser(d=1.2):
    t = t_axis(d)
    f = 200 * (2 ** (3 * t / d))
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.2
    noise = hp(rng.standard_normal(len(t)), 2000) * 0.25
    return (tone + noise) * (t / d) ** 2 * 0.6


def sfx_impact():
    t = t_axis(0.5)
    x = lp(rng.standard_normal(len(t)), 2500) * np.exp(-t * 14) * 0.6
    return reverb(x, 0.25, 0.8)[: int(0.9 * SR)]


def sfx_swish():
    t = t_axis(0.25)
    x = bp(rng.standard_normal(len(t)), 2500, 9000) * np.sin(np.pi * t / 0.25) ** 3
    return x * 0.12


def sfx_buzz():
    t = t_axis(0.3)
    return lp(saw(110, t), 1200) * np.exp(-t * 6) * 0.2


SFX = {
    'whoosh': sfx_whoosh(), 'pop': sfx_pop(), 'tick': sfx_tick(), 'hit': sfx_hit(), 'slam': sfx_hit(), 'ding': sfx_bell(),
    'hiss': sfx_riser(), 'riser': sfx_riser(), 'crunch': sfx_impact(), 'impact': sfx_impact(), 'swish': sfx_swish(), 'buzz': sfx_buzz(),
    'ice': sfx_bell(1568), 'click': sfx_tick(),
}
for _i in range(8):
    SFX[f'n{_i}'] = sfx_note(_i)


# ---------- musica ----------
def music(d, open_at=2.0, close_at=None):
    n = int((d + 0.5) * SR); t = np.arange(n) / SR
    L = np.zeros(n); R = np.zeros(n)
    bar = 4 * BEAT
    # cassa (4/4) e hi-hat in levare
    kick = (lambda tt: np.sin(2 * np.pi * np.cumsum(60 * np.exp(-tt * 25) + 45) / SR) * np.exp(-tt * 9))(t_axis(0.35))
    hat = hp(rng.standard_normal(int(0.05 * SR)), 7000) * np.exp(-t_axis(0.05) * 70) * 0.25
    duck = np.ones(n)
    b = 0
    while b * BEAT < d + 0.5:
        s = int(b * BEAT * SR)
        if b * BEAT >= open_at - 0.01:
            k = kick[: n - s] * 0.55; L[s:s + len(k)] += k; R[s:s + len(k)] += k
            dk = 1 - 0.45 * np.exp(-t_axis(BEAT) * 10)[: n - s]; duck[s:s + len(dk)] *= dk
        h = int((b + 0.5) * BEAT * SR)
        if h < n:
            hh = hat[: n - h]; L[h:h + len(hh)] += hh * 0.9; R[h:h + len(hh)] += hh * 1.1
        b += 1
    # basso pulsato in ottavi e pad di accordi
    bass = np.zeros(n); pad_l = np.zeros(n); pad_r = np.zeros(n); arp = np.zeros(n)
    nb = int(np.ceil((d + 0.5) / bar))
    for i in range(nb):
        root, chord = PROG[i % 4]
        s, e = int(i * bar * SR), min(n, int((i + 1) * bar * SR))
        if s >= n:
            break
        tt = np.arange(e - s) / SR
        for k in range(8):  # ottavi
            a = int(k * BEAT / 2 * SR)
            seg = tt[a: a + int(BEAT / 2 * SR)] - tt[a] if a < len(tt) else np.array([])
            if len(seg):
                bass[s + a: s + a + len(seg)] += saw(root * 2, seg) * np.exp(-seg * 6)
        for j, f in enumerate(chord):
            pad_l[s:e] += saw(f, tt, -0.004 * (j + 1))
            pad_r[s:e] += saw(f, tt, 0.004 * (j + 1))
        for k in range(16):  # arpeggio in sedicesimi
            a = int(k * BEAT / 4 * SR)
            if a >= len(tt):
                break
            f = chord[k % 3] * 2
            seg = np.arange(min(int(0.2 * SR), len(tt) - a)) / SR
            arp[s + a: s + a + len(seg)] += np.sin(2 * np.pi * f * seg) * np.exp(-seg * 18)
    # filtro che si apre al primo dato
    cut = np.clip((t - (open_at - 1.2)) / 1.2, 0, 1)
    bass = lp(bass, 400) * 0.35
    pad_l = lp(pad_l, 1600) * 0.05; pad_r = lp(pad_r, 1600) * 0.05
    arp = lp(arp, 5000) * 0.07
    closed = lambda x: lp(x, 350)
    pad_l = closed(pad_l) * (1 - cut) + pad_l * cut; pad_r = closed(pad_r) * (1 - cut) + pad_r * cut
    L += (bass * cut + pad_l + arp * cut * 0.9) * duck
    R += (bass * cut + pad_r + arp * cut * 1.1) * duck
    # sfumatura finale
    fade = np.ones(n)
    if close_at:
        fade = np.clip(1 - (t - close_at) / 1.8, 0.0, 1)
    fin = np.clip(1 - (t - d + 0.4) / 0.4, 0, 1)
    return L * fade * fin, R * fade * fin


def make_audio(path, duration, sounds, open_at=2.0, close_at=None, music_on=True):
    n = int((duration + 0.5) * SR)
    L = np.zeros(n); R = np.zeros(n)
    if music_on:
        mL, mR = music(duration, open_at, close_at)
        # ducking della musica sotto gli effetti forti
        duck = np.ones(n)
        for s in sounds:
            if s['k'] in ('hit', 'slam', 'impact', 'crunch', 'ding'):
                a = int(s['t'] * SR); k = 1 - 0.55 * np.exp(-t_axis(0.8) * 4)
                duck[a:a + len(k)] *= k[: max(0, n - a)]
        L += mL[:n] * duck * 0.8; R += mR[:n] * duck * 0.8
    for s in sounds:
        x = SFX.get(s['k'])
        if x is None:
            continue
        a = int(s['t'] * SR)
        if a >= n:
            continue
        seg = x[: n - a]
        pan = 0.5 + 0.18 * np.sin(s['t'] * 7)  # leggera apertura stereo
        L[a:a + len(seg)] += seg * (1 - pan) * 2 * 0.9
        R[a:a + len(seg)] += seg * pan * 2 * 0.9
    # limitatore morbido e normalizzazione
    st = np.stack([L, R], 1)
    st = np.tanh(st * 1.4) / np.tanh(1.4)
    st = st / max(1e-9, np.abs(st).max()) * 0.89
    pcm = (st * 32767).astype('<i2')
    with wave.open(str(path), 'w') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

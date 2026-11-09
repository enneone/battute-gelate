"""Battute Gelate: genera Reel (MP4), caroselli e post (PNG) dai template di brand.
Uso:
  python3 render.py reel [indici...]     -> output/reel/*.mp4
  python3 render.py still IDX t1 t2 ...  -> anteprime PNG di un Reel
  python3 render.py grafiche             -> output/caroselli e output/post
"""
import json, subprocess, sys, wave, struct, math, random
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).parent
TPL = ROOT / "templates"
OUT = ROOT / "output"
FPS, SR = 30, 44100
DATA = json.loads((ROOT / "contenuti.json").read_text())
SCRATCH = Path("/tmp/claude-0/-home-claude/bb1d1ddb-9fa6-5321-9687-93abb65b20dc/scratchpad")
rnd = random.Random(7)


# ---------- effetti sonori sintetici ----------
def env_tone(freqs, dur, decay, vol):
    n = int(dur * SR); out = []; ph = [0.0] * len(freqs)
    for k in range(n):
        x = k / SR; v = 0.0
        for j, f in enumerate(freqs):
            ph[j] += 2 * math.pi * f / SR; v += math.sin(ph[j]) / (j + 1)
        out.append(v * vol * math.exp(-x * decay) * min(1, k / 80))
    return out


def whoosh():
    n = int(0.3 * SR); out = []; lp = 0.0
    for k in range(n):
        x = k / n; lp += (0.02 + 0.3 * x) * (rnd.uniform(-1, 1) - lp)
        out.append(lp * 0.7 * math.sin(math.pi * x))
    return out


def ice():
    n = int(0.6 * SR); out = []; prev = 0.0; p1 = p2 = 0.0
    for k in range(n):
        x = k / n; s = rnd.uniform(-1, 1); hp = s - prev; prev = s
        p1 += 2 * math.pi * 2093 / SR; p2 += 2 * math.pi * 3136 / SR
        out.append(hp * 0.55 * math.exp(-x * 22) + (math.sin(p1) * 0.22 + math.sin(p2) * 0.14) * math.exp(-x * 5) * min(1, k / 200))
    return out


def slam():
    n = int(0.35 * SR); out = []; ph = 0.0
    for k in range(n):
        x = k / SR; f = 140 * math.exp(-x * 9) + 45; ph += 2 * math.pi * f / SR
        out.append(math.sin(ph) * 0.8 * math.exp(-x * 9) + rnd.uniform(-1, 1) * 0.25 * math.exp(-x * 40))
    return out


def buzz():
    n = int(0.28 * SR); out = []; ph = 0.0
    for k in range(n):
        ph += 2 * math.pi * 110 / SR; v = 1.0 if math.sin(ph) > 0 else -1.0
        out.append(v * 0.18 * (1 - k / n))
    return out


SFX = {"whoosh": whoosh(), "ice": ice(), "slam": slam(), "buzz": buzz(),
       "pop": env_tone([520, 780], 0.09, 40, 0.35), "click": env_tone([2400], 0.025, 120, 0.25),
       "tick": env_tone([1000], 0.06, 60, 0.35), "ding": env_tone([1568, 2349], 0.6, 6, 0.3)}


def make_audio(path, duration, sounds):
    buf = [0.0] * int((duration + 0.5) * SR)
    for s in sounds:
        n0 = int(s["t"] * SR)
        for k, v in enumerate(SFX[s["k"]]):
            if n0 + k < len(buf): buf[n0 + k] += v
    with wave.open(str(path), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b"".join(struct.pack("<h", int(max(-1, min(1, v)) * 30000)) for v in buf))


# ---------- Reel ----------
def load_reel(page, reel):
    page.goto((TPL / (reel.get("template", "reel") + ".html")).as_uri()); page.evaluate("document.fonts.ready")
    page.evaluate("t => document.body.classList.add('theme-' + t)", reel.get("tema", "cobalto"))
    info = page.evaluate("([r, h]) => setup(r, h)", [reel, DATA["handle"]])
    page.evaluate("d => window.DUR = d", info["duration"])
    return info


def render_reel(page, reel):
    info = load_reel(page, reel); dur = info["duration"]
    d = OUT / "reel"; wav = d / f"{reel['id']}.wav"; make_audio(wav, dur, info["sounds"])
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS),
                           "-c:v", "mjpeg", "-i", "-", "-i", str(wav), "-c:v", "libx264", "-preset", "veryfast",
                           "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest",
                           "-movflags", "+faststart", str(d / f"{reel['id']}.mp4")], stdin=subprocess.PIPE)
    for f in range(int(dur * FPS)):
        page.evaluate("t => setTime(t)", f / FPS)
        ff.stdin.write(page.screenshot(type="jpeg", quality=92))
    ff.stdin.close(); ff.wait(); wav.unlink()
    render_cover(page, reel)
    print(reel["id"], f"{dur:.1f}s", flush=True)


def render_cover(page, reel):
    """Copertina con il testo dentro la zona 3:4 che si vede nella griglia del profilo."""
    load_reel(page, dict(reel, template="copertina"))
    page.screenshot(path=str(OUT / "copertine" / f"{reel['id']}.jpg"), type="jpeg", quality=90)


# ---------- grafiche ----------
def render_graphics(page):
    page.set_viewport_size({"width": 1080, "height": 1350})
    for c in DATA["caroselli"]:
        page.goto((TPL / "grafiche.html").as_uri()); page.evaluate("document.fonts.ready")
        n = page.evaluate("([c, h]) => setupCarosello(c, h)", [c, DATA["handle"]])
        d = OUT / "caroselli" / c["id"]; d.mkdir(parents=True, exist_ok=True)
        for i in range(n):
            page.evaluate("i => showSlide(i)", i); page.wait_for_timeout(50)
            page.screenshot(path=str(d / f"{i + 1:02d}.png"))
        print(c["id"], n, "slide", flush=True)
    for p in DATA["post"]:
        page.goto((TPL / "grafiche.html").as_uri()); page.evaluate("document.fonts.ready")
        page.evaluate("([p, h]) => setupPost(p, h)", [p, DATA["handle"]]); page.wait_for_timeout(50)
        page.screenshot(path=str(OUT / "post" / f"{p['id']}.png"))
        print(p["id"], flush=True)


if __name__ == "__main__":
    mode, args = sys.argv[1], sys.argv[2:]
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path="/usr/bin/google-chrome")
        page = b.new_page(viewport={"width": 1080, "height": 1920})
        if mode == "reel":
            for i in ([int(a) for a in args] or range(len(DATA["reel"]))):
                render_reel(page, DATA["reel"][i])
        elif mode == "still":
            reel = DATA["reel"][int(args[0])]; load_reel(page, reel)
            for t in args[1:]:
                page.evaluate("t => setTime(t)", float(t))
                page.screenshot(path=str(SCRATCH / f"st_{args[0]}_{t}.png"))
        elif mode == "copertine":
            for i in ([int(a) for a in args] or range(len(DATA["reel"]))):
                render_cover(page, DATA["reel"][i])
        elif mode == "grafiche":
            render_graphics(page)
        b.close()

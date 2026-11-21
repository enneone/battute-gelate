"""Dati alla mano: genera i Reel dai template in questa cartella.
Uso: python3 render.py reel [indici...] | still IDX t1 t2 ..."""
import json, subprocess, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(Path(__file__).parent.parent))
import render as R0  # effetti sonori del progetto principale

ROOT = Path(__file__).parent
OUT = ROOT / "output"; (OUT / "reel").mkdir(parents=True, exist_ok=True)
DATA = json.loads((ROOT / "contenuti.json").read_text())
FPS = 30
R0.SFX["hit"] = [a + b for a, b in zip(R0.SFX["slam"], R0.SFX["ding"] + [0.0] * len(R0.SFX["slam"]))]


def load(page, reel):
    page.goto((ROOT / f"{reel['template']}.html").as_uri()); page.evaluate("document.fonts.ready")
    page.wait_for_timeout(150)
    return page.evaluate("([r, h]) => setup(r, h)", [reel, DATA["handle"]])


def render_reel(page, reel):
    info = load(page, reel); dur = info["duration"]
    wav = OUT / "reel" / f"{reel['id']}.wav"; R0.make_audio(wav, dur, info["sounds"])
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                           "-i", str(wav), "-c:v", "libx264", "-preset", "veryfast", "-crf", "17", "-pix_fmt", "yuv420p", "-c:a", "aac",
                           "-b:a", "160k", "-shortest", "-movflags", "+faststart", str(OUT / "reel" / f"{reel['id']}.mp4")], stdin=subprocess.PIPE)
    for f in range(int(dur * FPS)):
        page.evaluate("t => setTime(t)", f / FPS)
        ff.stdin.write(page.screenshot(type="jpeg", quality=93))
    ff.stdin.close(); ff.wait(); wav.unlink()
    print(reel["id"], f"{dur:.1f}s", flush=True)


if __name__ == "__main__":
    mode, args = sys.argv[1], sys.argv[2:]
    with sync_playwright() as pw:
        b = pw.chromium.launch(executable_path="/usr/bin/google-chrome")
        page = b.new_page(viewport={"width": 1080, "height": 1920})
        if mode == "reel":
            for i in ([int(a) for a in args] or range(len(DATA["reel"]))): render_reel(page, DATA["reel"][i])
        else:
            reel = DATA["reel"][int(args[0])]; load(page, reel)
            for t in args[1:]:
                page.evaluate("t => setTime(t)", float(t)); page.screenshot(path=str(R0.SCRATCH / f"d_{args[0]}_{t}.png"))
        b.close()

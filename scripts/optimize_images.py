#!/usr/bin/env python3
"""Genereer webp-varianten van de saloon-foto's.

De originele bestanden blijven staan (data verwijst er nog naar); de
componenten gebruiken <picture> met de webp-variant als eerste keuze.

Gebruik: python3 scripts/optimize_images.py
"""
from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public" / "images"
MANIFEST = ROOT / "src" / "image-manifest.json"

MAX_WIDTH = 1600
QUALITY = 80

manifest: dict[str, str] = {}
saved = 0

for source in sorted(IMAGES.iterdir()):
    if source.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
        continue

    target = source.with_suffix(".webp")
    before = source.stat().st_size

    with Image.open(source) as image:
        image = image.convert("RGBA" if image.mode in {"RGBA", "LA", "P"} else "RGB")
        if image.width > MAX_WIDTH:
            height = round(image.height * MAX_WIDTH / image.width)
            image = image.resize((MAX_WIDTH, height), Image.LANCZOS)
        image.save(target, "WEBP", quality=QUALITY, method=6)

    after = target.stat().st_size
    if after >= before:
        target.unlink(missing_ok=True)
        continue

    manifest[source.name] = f"images/{target.name}"
    saved += before - after

MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"{len(manifest)} afbeeldingen geoptimaliseerd, {saved / 1024 / 1024:.1f} MB bespaard.")
#!/usr/bin/env node
/**
 * Turns the hero fly-through video into the WebP image sequence that
 * src/components/hero-sequence.tsx scrubs on scroll.
 *
 * Scrubbing a <video> by setting currentTime stutters (seeks snap to keyframes,
 * and Safari decodes slowly), so every frame is pre-rendered as a still and
 * drawn to a canvas instead. Two sets are written:
 *
 *   public/images/hero/frames/landscape/NNN.webp  1600x900, full frame
 *   public/images/hero/frames/portrait/NNN.webp   720x1280, centre 9:16 crop
 *
 * The portrait set exists because covering a phone screen with a 16:9 frame
 * only shows its middle third; cropping first keeps that third sharp at a
 * fraction of the bytes.
 *
 * Needs ffmpeg on PATH (or FFMPEG=/path/to/ffmpeg):
 *
 *   node scripts/extract-hero-frames.mjs path/to/video.mp4
 *
 * Then update HERO_FRAME_COUNT in hero-sequence.tsx if the count changed.
 */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/hero/frames");
const FFMPEG = process.env.FFMPEG || "ffmpeg";

const LANDSCAPE = { width: 1600, height: 900, quality: 70 };
const PORTRAIT = { width: 720, height: 1280, quality: 72 };

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

async function main() {
  const video = process.argv[2];
  if (!video) {
    console.error("usage: node scripts/extract-hero-frames.mjs <video.mp4>");
    process.exit(1);
  }

  const scratch = await mkdtemp(path.join(tmpdir(), "hero-frames-"));
  try {
    execFileSync(
      FFMPEG,
      ["-v", "error", "-i", video, "-an", path.join(scratch, "%03d.png")],
      { stdio: "inherit" },
    );

    const frames = (await readdir(scratch)).filter((f) => f.endsWith(".png")).sort();
    const landscapeDir = path.join(OUT_DIR, "landscape");
    const portraitDir = path.join(OUT_DIR, "portrait");
    await rm(OUT_DIR, { recursive: true, force: true });
    await mkdir(landscapeDir, { recursive: true });
    await mkdir(portraitDir, { recursive: true });

    let landscapeBytes = 0;
    let portraitBytes = 0;

    for (const [index, frame] of frames.entries()) {
      const input = path.join(scratch, frame);
      const name = `${String(index).padStart(3, "0")}.webp`;
      const { width, height } = await sharp(input).metadata();

      const landscapeOut = path.join(landscapeDir, name);
      await sharp(input)
        .resize(LANDSCAPE.width, LANDSCAPE.height, { fit: "cover" })
        .webp({ quality: LANDSCAPE.quality, effort: 6 })
        .toFile(landscapeOut);
      landscapeBytes += (await stat(landscapeOut)).size;

      const cropWidth = Math.round((height * PORTRAIT.width) / PORTRAIT.height);
      const portraitOut = path.join(portraitDir, name);
      await sharp(input)
        .extract({
          left: Math.round((width - cropWidth) / 2),
          top: 0,
          width: cropWidth,
          height,
        })
        .resize(PORTRAIT.width, PORTRAIT.height)
        .webp({ quality: PORTRAIT.quality, effort: 6 })
        .toFile(portraitOut);
      portraitBytes += (await stat(portraitOut)).size;
    }

    console.log(`${frames.length} frames`);
    console.log(`landscape ${LANDSCAPE.width}x${LANDSCAPE.height}: ${kb(landscapeBytes)}`);
    console.log(`portrait  ${PORTRAIT.width}x${PORTRAIT.height}: ${kb(portraitBytes)}`);
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

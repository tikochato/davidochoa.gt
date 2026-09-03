#!/usr/bin/env node
/**
 * Builds static AVIF/WebP variants under public/images/opt plus a manifest.
 *
 * Everything is generated ahead of time and committed, so nothing goes through
 * a hosted image-transformation service at runtime. Re-run after adding or
 * replacing anything in public/images:
 *
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "public/images");
const OUT_DIR = path.join(ROOT, "public/images/opt");
const MANIFEST = path.join(ROOT, "src/data/image-manifest.json");

// Widest real display is ~460px (gallery card) / ~420px (slide), so 1200 covers
// a 2.5x device pixel ratio with headroom. Nothing is upscaled.
const WIDTHS = [480, 800, 1200];

const CONTENT = [
  "8amotors.jpg",
  "opaline.jpg",
  "hirewar.jpg",
  "slide-1.jpg",
  "slide-2.jpg",
  "slide-3.jpg",
  "slide-4.jpg",
];

// The hero is a WebGL texture magnified up to ~2x by the parallax push, so it
// keeps its full 1800x1200 resolution and only changes container format.
const HERO = "hero.jpg";

// The depth map is sampled once per mesh vertex and the mesh is at most
// 112x100, so 510x340 is well past what the effect can resolve. Keeping the
// aspect at exactly 3:2 matters: resize() derives the fit from this image.
const DEPTH_SRC = "hero/depth.webp";
const DEPTH_WIDTH = 510;
const DEPTH_HEIGHT = 340;

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`;

async function size(file) {
  return (await stat(file)).size;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const manifest = {};
  let before = 0;
  let after = 0;

  for (const file of CONTENT) {
    const input = path.join(SRC_DIR, file);
    const base = path.basename(file, path.extname(file));
    const image = sharp(input);
    const meta = await image.metadata();
    before += await size(input);

    const entry = {
      width: meta.width,
      height: meta.height,
      avif: [],
      webp: [],
    };

    for (const width of WIDTHS) {
      if (width > meta.width) continue;
      const resized = sharp(input).resize({ width, withoutEnlargement: true });

      const avifName = `${base}-${width}.avif`;
      const webpName = `${base}-${width}.webp`;
      await resized
        .clone()
        .avif({ quality: 58, effort: 6 })
        .toFile(path.join(OUT_DIR, avifName));
      await resized
        .clone()
        .webp({ quality: 78 })
        .toFile(path.join(OUT_DIR, webpName));

      entry.avif.push({ w: width, src: `/images/opt/${avifName}` });
      entry.webp.push({ w: width, src: `/images/opt/${webpName}` });
      after += await size(path.join(OUT_DIR, avifName));
    }

    // Guarantee the largest variant exists even for sources narrower than 480.
    if (entry.avif.length === 0) {
      const avifName = `${base}-${meta.width}.avif`;
      const webpName = `${base}-${meta.width}.webp`;
      await sharp(input).avif({ quality: 58, effort: 6 }).toFile(path.join(OUT_DIR, avifName));
      await sharp(input).webp({ quality: 78 }).toFile(path.join(OUT_DIR, webpName));
      entry.avif.push({ w: meta.width, src: `/images/opt/${avifName}` });
      entry.webp.push({ w: meta.width, src: `/images/opt/${webpName}` });
      after += await size(path.join(OUT_DIR, avifName));
    }

    manifest[`/images/${file}`] = entry;
    console.log(`${file}  ${meta.width}x${meta.height}  ${entry.avif.length} widths`);
  }

  // Hero: same pixels, cheaper containers.
  const heroInput = path.join(SRC_DIR, HERO);
  const heroMeta = await sharp(heroInput).metadata();
  const heroBefore = await size(heroInput);
  await sharp(heroInput).avif({ quality: 62, effort: 6 }).toFile(path.join(OUT_DIR, "hero.avif"));
  await sharp(heroInput).webp({ quality: 80 }).toFile(path.join(OUT_DIR, "hero.webp"));
  await sharp(heroInput)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT_DIR, "hero.jpg"));

  manifest["/images/hero.jpg"] = {
    width: heroMeta.width,
    height: heroMeta.height,
    avif: [{ w: heroMeta.width, src: "/images/opt/hero.avif" }],
    webp: [{ w: heroMeta.width, src: "/images/opt/hero.webp" }],
    fallback: "/images/opt/hero.jpg",
  };

  console.log(
    `\nhero.jpg  ${kb(heroBefore)} -> avif ${kb(await size(path.join(OUT_DIR, "hero.avif")))}` +
      `  webp ${kb(await size(path.join(OUT_DIR, "hero.webp")))}` +
      `  jpeg ${kb(await size(path.join(OUT_DIR, "hero.jpg")))}`,
  );

  // Depth map: lossless so no compression artefact can deform the mesh.
  const depthInput = path.join(SRC_DIR, DEPTH_SRC);
  const depthBefore = await size(depthInput);
  await sharp(depthInput)
    .resize({ width: DEPTH_WIDTH, height: DEPTH_HEIGHT, fit: "fill" })
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(OUT_DIR, "hero-depth.webp"));
  console.log(
    `depth.webp  ${kb(depthBefore)} (1800x1200) -> ` +
      `${kb(await size(path.join(OUT_DIR, "hero-depth.webp")))} (${DEPTH_WIDTH}x${DEPTH_HEIGHT})`,
  );

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `\ncontent images: ${kb(before)} of JPEG -> ${kb(after)} of AVIF across all widths`,
  );
  console.log(`manifest: ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

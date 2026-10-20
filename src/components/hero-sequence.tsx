"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";

// Pre-rendered by scripts/extract-hero-frames.mjs from the fly-through video.
// A canvas image sequence instead of scrubbing <video>.currentTime, which
// snaps to keyframes and stutters badly in Safari.
const HERO_FRAME_COUNT = 124;
const FRAME_SETS = {
  landscape: { dir: "/images/hero/frames/landscape", width: 1600, height: 900 },
  portrait: { dir: "/images/hero/frames/portrait", width: 720, height: 1280 },
} as const;
type FrameSet = keyof typeof FRAME_SETS;

const LOAD_CONCURRENCY = 6;

const frameSrc = (set: FrameSet, index: number) =>
  `${FRAME_SETS[set].dir}/${String(index).padStart(3, "0")}.webp`;

type HeroSequenceProps = {
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

export function HeroSequence({ progress, reducedMotion }: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Null until mounted: the poster is server-rendered from the landscape set
  // so the first paint never waits on JavaScript, but frames only start
  // streaming once the real set is known, so phones never fetch landscape.
  const [frameSet, setFrameSet] = useState<FrameSet | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-aspect-ratio: 1/1)");
    const update = () => setFrameSet(query.matches ? "portrait" : "landscape");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frameSet || reducedMotion) return;
    const set = frameSet;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    const canvasElement = canvas;
    const ctx = context;

    let disposed = false;
    let frame = 0;
    let drawnIndex = -1;
    const images: (HTMLImageElement | undefined)[] = new Array(HERO_FRAME_COUNT);

    const targetIndex = () =>
      Math.round(clamp(progress.get()) * (HERO_FRAME_COUNT - 1));

    // Frames stream in coarse-to-fine, so before everything has arrived the
    // nearest loaded neighbour stands in for the one that is still missing.
    const nearestLoaded = (index: number) => {
      for (let offset = 0; offset < HERO_FRAME_COUNT; offset += 1) {
        if (images[index - offset]) return index - offset;
        if (images[index + offset]) return index + offset;
      }
      return -1;
    };

    const draw = () => {
      frame = 0;
      const index = nearestLoaded(targetIndex());
      const image = images[index];
      if (!image || index === drawnIndex) return;
      drawnIndex = index;

      const { width, height } = canvasElement;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      ctx.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
      if (!disposed) setReady(true);
    };

    const scheduleDraw = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const { width, height } = canvasElement.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvasElement.width = Math.round(width * pixelRatio);
      canvasElement.height = Math.round(height * pixelRatio);
      ctx.imageSmoothingQuality = "high";
      drawnIndex = -1;
      scheduleDraw();
    };

    // Every 16th frame first, then 8th, 4th... so a fast scroll on a slow
    // connection still moves through the whole flight, just at a lower rate.
    // The last frame goes early so the end of the flight is never a stand-in.
    const order: number[] = [0, HERO_FRAME_COUNT - 1];
    const queued = new Set<number>(order);
    for (let step = 16; step >= 1; step /= 2) {
      for (let index = 0; index < HERO_FRAME_COUNT; index += step) {
        if (!queued.has(index)) {
          queued.add(index);
          order.push(index);
        }
      }
    }

    let cursor = 0;
    const loadNext = async (): Promise<void> => {
      while (!disposed && cursor < order.length) {
        const index = order[cursor];
        cursor += 1;
        const image = new window.Image();
        image.decoding = "async";
        image.src = frameSrc(set, index);
        try {
          await image.decode();
        } catch {
          continue;
        }
        if (disposed) return;
        images[index] = image;
        // draw() skips the work unless this frame is now the closest one.
        scheduleDraw();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvasElement);
    const unsubscribe = progress.on("change", scheduleDraw);
    resize();
    for (let worker = 0; worker < LOAD_CONCURRENCY; worker += 1) void loadNext();

    return () => {
      disposed = true;
      unsubscribe();
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      setReady(false);
    };
  }, [frameSet, progress, reducedMotion]);

  const posterSet = frameSet ?? "landscape";
  const poster = FRAME_SETS[posterSet];

  return (
    <div className="absolute inset-0 bg-canvas" aria-hidden="true">
      <img
        src={frameSrc(posterSet, 0)}
        alt=""
        width={poster.width}
        height={poster.height}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full transition-opacity duration-300 motion-reduce:hidden"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </div>
  );
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

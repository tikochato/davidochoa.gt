import manifest from "@/data/image-manifest.json";

type Variant = { w: number; src: string };
type Entry = {
  width: number;
  height: number;
  avif: Variant[];
  webp: Variant[];
  fallback?: string;
};

const images = manifest as Record<string, Entry>;

const srcSet = (variants: Variant[]) =>
  variants.map((variant) => `${variant.src} ${variant.w}w`).join(", ");

type ResponsiveImageProps = {
  /** Path of the original file, e.g. "/images/opaline.jpg". */
  src: string;
  alt: string;
  /** Rendered widths, so the browser can pick the cheapest variant. */
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Serves the AVIF/WebP variants produced by scripts/optimize-images.mjs.
 *
 * Deliberately not next/image: these are pre-built static files, so no hosted
 * image-transformation quota is consumed. The original stays as the <img> src
 * and is only ever fetched by a browser that supports neither format.
 */
export function ResponsiveImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: ResponsiveImageProps) {
  const entry = images[src];

  if (!entry) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet(entry.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(entry.webp)} sizes={sizes} />
      <img
        src={entry.fallback ?? src}
        alt={alt}
        width={entry.width}
        height={entry.height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}

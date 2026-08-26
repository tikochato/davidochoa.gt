import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "David Ochoa — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#07090c",
          color: "#eef4f7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5ad0e6",
          }}
        >
          <span>Guatemala</span>
          <span>davidochoa.gt</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, lineHeight: 0.95, letterSpacing: -2 }}>
            David Ochoa
          </div>
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 28,
              color: "#8b9caa",
              maxWidth: 860,
            }}
          >
            Senior Software Engineer · AI agents, APIs, web apps
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

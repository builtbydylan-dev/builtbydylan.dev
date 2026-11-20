import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  bg: "#08090c",
  surface: "#0d1015",
  line: "#2a323d",
  fg: "#e8ebef",
  muted: "#9ba4b1",
  faint: "#747d8a",
  accent: "#5cf59a",
  sky: "#82c8ff",
};

/** Cached so the image can be prerendered at build time instead of on every request. */
async function loadFonts() {
  "use cache";
  const [geist, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/geist-600.woff")),
    readFile(join(process.cwd(), "assets/og/jetbrains-mono-400.woff")),
  ]);
  return { geist: new Uint8Array(geist), mono: new Uint8Array(mono) };
}

export default async function OpengraphImage() {
  const fonts = await loadFonts();
  const geist = fonts.geist.buffer as ArrayBuffer;
  const mono = fonts.mono.buffer as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: C.bg,
          backgroundImage: `radial-gradient(ellipse 70% 60% at 50% 0%, rgba(92,245,154,0.16), transparent 70%)`,
          color: C.fg,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontFamily: "JetBrains Mono", fontSize: 30 }}>
          <span style={{ color: C.accent }}>❯&nbsp;</span>
          <span>builtbydylan</span>
          <span style={{ color: C.faint }}>.dev</span>
          <span style={{ color: C.accent }}>_</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.04, letterSpacing: "-0.04em", maxWidth: 980 }}>
            Websites that work as hard as you do
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: C.muted, maxWidth: 940, lineHeight: 1.35 }}>
            Fast, modern websites for local businesses &amp; startups.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${C.line}`,
            paddingTop: 28,
            fontFamily: "JetBrains Mono",
            fontSize: 24,
            color: C.muted,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ color: C.accent }}>$&nbsp;</span>
            <span>ls services/ →&nbsp;</span>
            <span style={{ color: C.sky }}>marketing-sites/&nbsp;&nbsp;care-and-maintenance/</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geist, style: "normal", weight: 600 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}

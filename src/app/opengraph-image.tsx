import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.shortName} (${profile.nickname}) — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview shown when the site is shared on LinkedIn, WhatsApp, etc.
const dataUri = async (file: string) =>
  `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand", file))).toString("base64")}`;

export default async function OpengraphImage() {
  const [logo, kancil] = await Promise.all([dataUri("logo.png"), dataUri("kancil.png")]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 15% 10%, #3b2a6b 0%, #07070c 55%), #07070c",
          color: "#f2f2f7",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <img src={kancil} width={180} height={239} style={{ position: "absolute", right: 64, top: 48 }} alt="" />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logo} width={64} height={64} style={{ borderRadius: 64 }} alt="" />
          <div style={{ fontSize: 32, fontWeight: 600 }}>{profile.nickname}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ fontSize: 44, marginTop: 18, color: "#a78bfa" }}>{`${profile.role} · Laravel · REST APIs · Next.js`}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9a9aae" }}>
          <div>{profile.location}</div>
          <div style={{ color: "#34d399" }}>{`● ${profile.availability}`}</div>
        </div>
      </div>
    ),
    size,
  );
}

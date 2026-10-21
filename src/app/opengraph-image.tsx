import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.shortName} (${profile.nickname}) — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview shown when the site is shared on LinkedIn, WhatsApp, etc.
export default function OpengraphImage() {
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              background: "linear-gradient(135deg, #a78bfa, #f472b6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontStyle: "italic",
              color: "white",
            }}
          >
            J
          </div>
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

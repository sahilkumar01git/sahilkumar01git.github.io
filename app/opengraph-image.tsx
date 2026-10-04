import { ImageResponse } from "next/og";

export const alt = "Sahil Kumar | Generative AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#120c2c",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#a391ff" }}>Generative AI Engineer</div>
        <div style={{ marginTop: 24, fontSize: 84, fontWeight: 800, lineHeight: 1.1 }}>Sahil Kumar</div>
        <div style={{ marginTop: 28, fontSize: 36, color: "#b9b3d6" }}>RAG systems, multi-agent apps and LLM engineering.</div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Field Notes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#E8E4DC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 88,
            color: "#1F2937",
            fontWeight: 600,
          }}
        >
          Field Notes
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#6B6459",
            letterSpacing: 1,
          }}
        >
          A daily log, filed automatically
        </div>
      </div>
    ),
    { ...size }
  );
}

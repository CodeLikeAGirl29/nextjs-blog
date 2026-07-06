import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "nodejs"; // needs fs access via getPostBySlug
export const alt = "Field Notes entry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  const displayText = post.quote ?? post.excerpt ?? post.title;
  const displayAuthor = post.author;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#E8E4DC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "2px solid #4A6C6F",
              color: "#33494B",
              padding: "6px 16px",
              borderRadius: "2px",
              fontSize: 22,
              letterSpacing: 2,
            }}
          >
            {post.date}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#6B6459", letterSpacing: 2 }}>
            FIELD NOTES
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 48,
              lineHeight: 1.3,
              color: "#1F2937",
              fontStyle: "italic",
            }}
          >
            &ldquo;{displayText.length > 180 ? `${displayText.slice(0, 180)}…` : displayText}&rdquo;
          </div>
          {displayAuthor && (
            <div style={{ display: "flex", fontSize: 28, color: "#6B6459" }}>
              — {displayAuthor}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 20, color: "#6B6459" }}>
          field-notes-nextjs.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

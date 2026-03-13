import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge"
};

export default function handler(req) {

  const { searchParams } = new URL(req.url);

  const title =
    searchParams.get("title") || "Fantabrand Properties News";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg,#4c1d95,#7c3aed)",
          color: "white",
          fontFamily: "sans-serif"
        }}
      >

        <div
          style={{
            fontSize: 32,
            marginBottom: 30,
            opacity: 0.9
          }}
        >
          Fantabrand Properties
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            lineHeight: 1.2
          }}
        >
          {title}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 22,
            opacity: 0.8
          }}
        >
          Real Estate Investment News
        </div>

      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
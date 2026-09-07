import { ImageResponse } from "next/og";

export const alt = "Andrés Hernández — Senior Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ background: "#f7f7f4", color: "#171717", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "76px 84px", fontFamily: "Arial, Helvetica, sans-serif" }}><div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ color: "#315c4c", fontSize: 28, fontWeight: 600 }}>Andrés Hernández</div><div style={{ fontSize: 68, fontWeight: 500, letterSpacing: -2 }}>Senior Web Developer</div><div style={{ color: "#62625f", fontSize: 30 }}>WordPress · E-commerce · Cannabis technology</div></div><div style={{ color: "#315c4c", fontSize: 26 }}>andreshernandez.ar</div></div>, { width: size.width, height: size.height });
}

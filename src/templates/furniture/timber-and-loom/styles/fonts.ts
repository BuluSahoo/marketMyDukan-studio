import { Fraunces, Manrope } from "next/font/google";

export const timberSerif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-timber-serif",
  display: "swap",
});

export const timberSans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-timber-sans",
  display: "swap",
});


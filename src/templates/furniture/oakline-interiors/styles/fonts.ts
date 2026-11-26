import { Cormorant_Garamond, DM_Sans } from "next/font/google";

export const oaklineDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-oakline-display",
  display: "swap",
});

export const oaklineSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oakline-sans",
  display: "swap",
});


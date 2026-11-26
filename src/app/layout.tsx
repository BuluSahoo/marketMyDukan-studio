import type { Metadata, Viewport } from "next";
import { StyledComponentsRegistry } from "@/lib/StyledComponentsRegistry";

export const metadata: Metadata = {
  title: { default: "MarketMyDukan Studio", template: "%s | MarketMyDukan Studio" },
  description:
    "Professionally designed websites for every kind of business — crafted by MarketMyDukan, a digital agency.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

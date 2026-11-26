import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AgencyProviders } from "@/components/layout/AgencyProviders";
import { siteConfig } from "@/config/site";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F6F2",
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <AgencyProviders fontClassName={`${heading.variable} ${body.variable}`}>
      {children}
    </AgencyProviders>
  );
}


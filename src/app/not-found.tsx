import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AgencyProviders } from "@/components/layout/AgencyProviders";
import { PageShell } from "@/components/layout/PageShell";
import { NotFoundContent } from "@/components/ui/NotFoundContent";

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

export default function NotFoundPage() {
  return (
    <AgencyProviders fontClassName={`${heading.variable} ${body.variable}`}>
      <PageShell>
        <NotFoundContent />
      </PageShell>
    </AgencyProviders>
  );
}

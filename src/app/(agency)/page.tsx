import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/sections/Hero";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { FeaturedTemplates } from "@/components/sections/FeaturedTemplates";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <CategoryShowcase />
      <FeaturedTemplates />
      <HowItWorks />
      <WhyUs />
      <Services />
      <FinalCta />
    </PageShell>
  );
}


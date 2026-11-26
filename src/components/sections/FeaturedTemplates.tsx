"use client";

import { ArrowRight } from "lucide-react";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TemplateCard } from "@/components/ui/TemplateCard";
import { ButtonLink } from "@/components/ui/Button";
import { categories } from "@/templates/categories";
import { getFeaturedTemplates } from "@/data/showcase-templates";

const Grid = styled.ul`
  display: grid;
  gap: 1.25rem;
  ${media.tablet} { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; }
  ${media.desktop} { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  li { min-width: 0; }
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  ${media.tablet} { margin-top: 3rem; }
`;

const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

export function FeaturedTemplates() {
  return (
    <Section id="templates" $tone="white" aria-labelledby="templates-title">
      <Container>
        <SectionHeading
          id="templates-title"
          eyebrow="Featured designs"
          title="Explore Our Website Designs"
          description="Thoughtfully crafted starting points — each one fully customised to your brand before launch."
        />
        <Grid>
          {getFeaturedTemplates().map((template, i) => (
            <li key={template.slug}>
              <Reveal delay={(i % 3) * 0.06}>
                <TemplateCard
                  template={template}
                  categoryName={categoryName(template.categorySlug)}
                  ctaHref={`/templates/${template.categorySlug}`}
                />
              </Reveal>
            </li>
          ))}
        </Grid>
        <FooterRow>
          <ButtonLink href="/templates" variant="secondary">
            Explore All Templates <ArrowRight size={18} aria-hidden />
          </ButtonLink>
        </FooterRow>
      </Container>
    </Section>
  );
}


"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { categories } from "@/templates/categories";
import { getCatalogTemplatesByCategory } from "@/data/template-catalog";
import { getTemplatesForCategory } from "@/data/showcase-templates";

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  ${media.tablet} { gap: 1.25rem; }
  ${media.desktop} { grid-template-columns: repeat(5, minmax(0, 1fr)); }

  li { min-width: 0; }
`;

export function CategoryShowcase() {
  return (
    <Section id="categories" aria-labelledby="categories-title">
      <Container>
        <SectionHeading
          id="categories-title"
          eyebrow="Categories"
          title="Find the Perfect Website for Your Business"
          description="Every industry has its own rhythm. Start with a design made for yours."
        />
        <Grid>
          {categories.map((category, i) => {
            const showcaseList = getTemplatesForCategory(category.slug);
            const cover = showcaseList[0];
            if (!cover) return null;
            const count = getCatalogTemplatesByCategory(category.slug).length || showcaseList.length;
            return (
              <li key={category.slug}>
                <Reveal delay={(i % 5) * 0.05}>
                  <CategoryCard category={category} cover={cover} count={count} />
                </Reveal>
              </li>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}


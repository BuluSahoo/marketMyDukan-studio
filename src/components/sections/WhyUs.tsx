"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { reasons } from "@/data/home-content";

const Layout = styled.div`
  display: grid;
  gap: 2.5rem;
  ${media.desktop} {
    grid-template-columns: 0.8fr 1.2fr;
    gap: 5rem;
    align-items: start;
  }
`;

const Sticky = styled.div`
  ${media.desktop} {
    position: sticky;
    top: calc(${({ theme }) => theme.layout.headerHeight} + 2rem);
  }
`;

const List = styled.ul`
  display: grid;
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 1.25rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);

  h3 { font-size: 1.1875rem; ${media.tablet} { font-size: 1.3125rem; } }
  p { margin-top: 0.375rem; color: rgba(255, 255, 255, 0.68); }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(231, 163, 62, 0.16);
  color: ${({ theme }) => theme.colors.accent};
`;

export function WhyUs() {
  return (
    <Section id="why-us" $tone="dark" aria-labelledby="why-title">
      <Container>
        <Layout>
          <Sticky>
            <SectionHeading
              id="why-title"
              light
              eyebrow="Why MarketMyDukan"
              title="A website partner that understands your business"
              description="We are not a template factory. We pair industry-ready designs with real people who care how your website performs."
            />
          </Sticky>
          <List>
            {reasons.map(({ title, description, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <Item>
                  <IconWrap aria-hidden>
                    <Icon size={22} />
                  </IconWrap>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </Item>
              </Reveal>
            ))}
          </List>
        </Layout>
      </Container>
    </Section>
  );
}


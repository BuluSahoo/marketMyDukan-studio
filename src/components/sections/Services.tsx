"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/home-content";

const Grid = styled.ul`
  display: grid;
  gap: 1rem;
  ${media.tablet} { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
  ${media.desktop} { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  li { min-width: 0; }
`;

const Card = styled.article`
  height: 100%;
  padding: 1.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: border-color ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
  }

  h3 { margin-top: 1.25rem; font-size: 1.1875rem; }
  p { margin-top: 0.625rem; font-size: 0.9375rem; color: ${({ theme }) => theme.colors.muted}; }
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(231, 163, 62, 0.16);
  color: ${({ theme }) => theme.colors.text};
`;

export function Services() {
  return (
    <Section id="services" $tone="white" aria-labelledby="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title="Everything your business needs to grow online"
          description="From the first page to your first hundred customers, one team looks after it all."
        />
        <Grid>
          {services.map(({ title, description, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06}>
                <Card>
                  <IconWrap aria-hidden>
                    <Icon size={22} />
                  </IconWrap>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}


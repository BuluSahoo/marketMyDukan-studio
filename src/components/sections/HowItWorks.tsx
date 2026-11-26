"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/data/home-content";

const List = styled.ol`
  display: grid;
  gap: 1.25rem;
  ${media.desktop} { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
`;

const Step = styled.li`
  position: relative;
  height: 100%;
  padding: 1.75rem 1.5rem 2rem;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  ${media.tablet} { padding: 2.25rem 2rem 2.5rem; }

  h3 { margin-top: 1.5rem; font-size: 1.375rem; }
  p { margin-top: 0.75rem; color: ${({ theme }) => theme.colors.muted}; }
`;

const Number = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 1.25rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: rgba(231, 163, 62, 0.22);
  user-select: none;
`;

const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.accent};
`;

export function HowItWorks() {
  return (
    <Section id="how-it-works" aria-labelledby="how-title">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="From idea to live website in three simple steps"
          description="No technical headaches. You focus on your business — we handle everything else."
        />
        <List>
          {steps.map(({ number, title, description, icon: Icon }, i) => (
            <Reveal key={number} delay={i * 0.08}>
              <Step>
                <Number aria-hidden>{number}</Number>
                <IconWrap aria-hidden>
                  <Icon size={24} />
                </IconWrap>
                <h3>
                  <span className="sr-only">Step {number}: </span>
                  {title}
                </h3>
                <p>{description}</p>
              </Step>
            </Reveal>
          ))}
        </List>
      </Container>
    </Section>
  );
}


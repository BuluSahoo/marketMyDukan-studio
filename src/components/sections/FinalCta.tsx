"use client";

import { ArrowRight, Mail } from "lucide-react";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const Panel = styled.div`
  position: relative;
  overflow: hidden;
  padding: 3rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.accent};
  text-align: center;

  ${media.tablet} { padding: 5rem 3rem; }

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(23, 23, 23, 0.14);
    pointer-events: none;
  }
  &::before { width: 420px; height: 420px; top: -220px; left: -120px; }
  &::after { width: 520px; height: 520px; bottom: -320px; right: -140px; }
`;

const Inner = styled.div`
  position: relative;
  max-width: 40rem;
  margin-inline: auto;

  h2 { font-size: clamp(1.875rem, 6vw, 3rem); text-wrap: balance; }
  p { margin-top: 1rem; font-size: 1.0625rem; color: rgba(23, 23, 23, 0.78); }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
  ${media.tablet} { flex-direction: row; justify-content: center; }
`;

const Dark = styled.span`
  display: contents;
  a {
    background: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.card};
  }
  a:hover { background: #000; }
`;

export function FinalCta() {
  return (
    <Section id="contact" aria-labelledby="cta-title">
      <Container>
        <Reveal>
          <Panel>
            <Inner>
              <h2 id="cta-title">Ready to Take Your Business Online?</h2>
              <p>
                Tell us about your business and we will recommend the right design, a clear price
                and a launch timeline — no obligation.
              </p>
              <Actions>
                <Dark>
                  <ButtonLink href={`mailto:${siteConfig.contact.email}`}>
                    Let&apos;s Build Your Website <ArrowRight size={18} aria-hidden />
                  </ButtonLink>
                </Dark>
                <ButtonLink href={`mailto:${siteConfig.contact.email}`} variant="secondary">
                  <Mail size={18} aria-hidden /> {siteConfig.contact.email}
                </ButtonLink>
              </Actions>
            </Inner>
          </Panel>
        </Reveal>
      </Container>
    </Section>
  );
}


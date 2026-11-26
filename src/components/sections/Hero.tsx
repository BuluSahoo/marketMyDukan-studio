"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { showcaseTemplates } from "@/data/showcase-templates";

const find = (slug: string) => {
  const t = showcaseTemplates.find((x) => x.slug === slug);
  if (!t) throw new Error(`Missing showcase template: ${slug}`);
  return t;
};

const desktopTemplate = find("oakline-interiors");
const mobileTemplate = find("maison-vela");
const cardTemplate = find("saffron-and-co");

const Section = styled.section`
  padding: 2.5rem 0 4rem;
  overflow: hidden;
  ${media.tablet} { padding: 4rem 0 5rem; }
  ${media.desktop} { padding: 5rem 0 7rem; }
`;

const Grid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: center;

  ${media.desktop} {
    grid-template-columns: 1.02fr 1fr;
    gap: 4rem;
  }
`;

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  &::before {
    content: "";
    width: 28px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Title = styled.h1`
  font-size: clamp(2.25rem, 8.5vw, 3.75rem);
  text-wrap: balance;

  span { display: inline; }
  ${media.tablet} { span { display: block; } }

  em {
    font-style: normal;
    box-shadow: inset 0 -0.16em 0 ${({ theme }) => theme.colors.accent};
  }
`;

const Lead = styled.p`
  max-width: 34rem;
  margin-top: 1.5rem;
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted};
  ${media.tablet} { font-size: 1.1875rem; }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
  ${media.tablet} { flex-direction: row; }
`;

const Checks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.muted};

  ${media.tablet} { flex-direction: row; flex-wrap: wrap; gap: 0.5rem 1.5rem; }

  li { display: flex; align-items: center; gap: 0.5rem; }
  svg { color: ${({ theme }) => theme.colors.accent}; flex-shrink: 0; }
`;

/* Showcase composition: desktop browser + phone + small card, positioned in % so it scales as one unit */
const Stage = styled.div`
  position: relative;
  width: 100%;
  max-width: 38rem;
  margin-inline: auto;
  aspect-ratio: 1 / 0.95;

  &::before {
    content: "";
    position: absolute;
    inset: 8% 0 0 8%;
    border-radius: ${({ theme }) => theme.radii.lg};
    background: rgba(231, 163, 62, 0.18);
  }
`;

const shadow = "0 2px 4px rgba(23,23,23,0.06), 0 24px 56px rgba(23,23,23,0.16)";

const Desktop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 80%;
  aspect-ratio: 4 / 3;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${shadow};
  background: ${({ theme }) => theme.colors.card};
`;

const Phone = styled(motion.div)`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30%;
  aspect-ratio: 9 / 19;
  border: clamp(3px, 0.9vw, 6px) solid ${({ theme }) => theme.colors.text};
  border-radius: clamp(14px, 3.5vw, 26px);
  overflow: hidden;
  box-shadow: ${shadow};
  background: ${({ theme }) => theme.colors.card};
`;

const MiniCard = styled(motion.div)`
  position: absolute;
  left: 5%;
  bottom: 2%;
  width: 40%;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${shadow};
  background: ${({ theme }) => theme.colors.card};
`;

const float = (delay: number, distance: number) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" as const },
});

export function Hero() {
  return (
    <Section aria-labelledby="hero-title">
      <Container>
        <Grid>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>Website design studio</Eyebrow>
            <Title id="hero-title">
              <span>Your Business Deserves </span>
              <span>
                a <em>Better</em> Website.
              </span>
            </Title>
            <Lead>
              Explore professionally designed websites for your business. Choose your
              favourite design and let us bring it to life.
            </Lead>
            <Actions>
              <ButtonLink href="/templates">
                Explore Templates <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/#contact" variant="secondary">
                Talk to Our Team
              </ButtonLink>
            </Actions>
            <Checks>
              <li><Check size={16} aria-hidden /> 10 industry categories</li>
              <li><Check size={16} aria-hidden /> Mobile-first designs</li>
              <li><Check size={16} aria-hidden /> Launch in days</li>
            </Checks>
          </motion.div>

          <Stage role="group" aria-label="Examples of website designs">
            <Desktop {...float(0, 6)}>
              <Image
                src={desktopTemplate.image}
                alt={desktopTemplate.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 31vw, 80vw"
              />
            </Desktop>
            <MiniCard {...float(1.5, 8)}>
              <Image src={cardTemplate.image} alt={cardTemplate.imageAlt} fill sizes="(min-width: 1024px) 16vw, 40vw" />
            </MiniCard>
            <Phone {...float(0.8, 10)}>
              <Image
                src={mobileTemplate.mobileImage}
                alt={`${mobileTemplate.name} mobile website design`}
                fill
                sizes="(min-width: 1024px) 12vw, 30vw"
              />
            </Phone>
          </Stage>
        </Grid>
      </Container>
    </Section>
  );
}

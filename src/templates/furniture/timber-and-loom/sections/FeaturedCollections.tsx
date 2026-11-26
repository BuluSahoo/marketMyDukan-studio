"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styled from "styled-components";
import { timberCollections, type TimberCategory } from "../data/timber-data";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  scroll-margin-top: ${t.layout.headerHeight};

  ${timberMedia.tablet} {
    padding: 6rem 0;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.5rem;

  ${timberMedia.tablet} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  span.eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.accent};
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3.125rem);
  }

  p {
    max-width: 34ch;
    color: ${t.colors.muted};
    font-size: 0.9375rem;
  }
`;

/* Asymmetric editorial layout: 1 wide hero collection on left + 2 stacked on right */
const Bento = styled.div`
  display: grid;
  gap: 1.25rem;

  ${timberMedia.desktop} {
    grid-template-columns: 1.25fr 1fr;
    gap: 1.5rem;
  }
`;

const SideStack = styled.div`
  display: grid;
  gap: 1.25rem;
  ${timberMedia.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${timberMedia.desktop} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.button<{ $tall?: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  min-height: ${({ $tall }) => ($tall ? "360px" : "250px")};
  padding: 0;
  border: 1px solid ${t.colors.border};
  border-radius: ${t.radii.md};
  overflow: hidden;
  background: ${t.colors.card};
  text-align: left;

  ${timberMedia.desktop} {
    min-height: ${({ $tall }) => ($tall ? "540px" : "258px")};
  }

  img {
    object-fit: cover;
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover img {
    transform: scale(1.04);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(23, 24, 23, 0.08) 25%, rgba(23, 24, 23, 0.9) 100%);
  }
`;

const Overlay = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem;

  span.num {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.accent};
  }

  h3 {
    margin-top: 0.35rem;
    font-size: 1.625rem;
    color: ${t.colors.text};
  }

  p {
    margin-top: 0.4rem;
    max-width: 36ch;
    font-size: 0.875rem;
    color: ${t.colors.muted};
  }

  span.icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: ${t.radii.pill};
    border: 1px solid ${t.colors.borderStrong};
    background: rgba(23, 24, 23, 0.7);
    color: ${t.colors.text};
  }
`;

interface Props {
  onSelectCategory: (cat: TimberCategory) => void;
}

export function FeaturedCollections({ onSelectCategory }: Props) {
  const [lead, second, third] = timberCollections;
  if (!lead || !second || !third) return null;

  return (
    <Section id="tl-collections" aria-labelledby="tl-collections-title">
      <TimberContainer>
        <Head>
          <div>
            <span className="eyebrow">Curated Chapters</span>
            <h2 id="tl-collections-title">Featured Collections</h2>
          </div>
          <p>Three distinct material studies pairing dark seasoned timber with natural loom weaves.</p>
        </Head>

        <Bento>
          <Card type="button" $tall onClick={() => onSelectCategory(lead.categoryFilter)}>
            <Image
              src={lead.image}
              alt={lead.title}
              fill
              sizes="(min-width: 1024px) 55vw, 94vw"
            />
            <Overlay>
              <div>
                <span className="num">{lead.eyebrow}</span>
                <h3>{lead.title}</h3>
                <p>{lead.description}</p>
              </div>
              <span className="icon" aria-hidden>
                <ArrowUpRight size={18} />
              </span>
            </Overlay>
          </Card>

          <SideStack>
            {[second, third].map((col) => (
              <Card key={col.id} type="button" onClick={() => onSelectCategory(col.categoryFilter)}>
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 94vw"
                />
                <Overlay>
                  <div>
                    <span className="num">{col.eyebrow}</span>
                    <h3>{col.title}</h3>
                    <p>{col.description}</p>
                  </div>
                  <span className="icon" aria-hidden>
                    <ArrowUpRight size={18} />
                  </span>
                </Overlay>
              </Card>
            ))}
          </SideStack>
        </Bento>
      </TimberContainer>
    </Section>
  );
}


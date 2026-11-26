"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";

const Wrap = styled.div<{ $center?: boolean; $light?: boolean }>`
  max-width: 44rem;
  margin: 0 auto 2.5rem 0;
  text-align: ${({ $center }) => ($center ? "center" : "left")};
  ${({ $center }) => ($center ? "margin-inline: auto;" : "")}

  ${media.tablet} { margin-bottom: 3.5rem; }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $light, theme }) => ($light ? theme.colors.accent : theme.colors.muted)};
  }
  .eyebrow::before {
    content: "";
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
  }

  h2 {
    font-size: clamp(1.75rem, 5.5vw, 2.75rem);
    text-wrap: balance;
  }

  p {
    margin-top: 1rem;
    font-size: 1rem;
    color: ${({ $light, theme }) => ($light ? "rgba(255,255,255,0.7)" : theme.colors.muted)};
    ${media.tablet} { font-size: 1.0625rem; }
  }
`;

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, center, light, id }: Props) {
  return (
    <Wrap $center={center} $light={light}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </Wrap>
  );
}


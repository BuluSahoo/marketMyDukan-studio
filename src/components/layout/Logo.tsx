"use client";

import Link from "next/link";
import styled from "styled-components";

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
  min-height: 44px;
  align-items: center;

  strong { font-weight: inherit; }
  span { color: ${({ theme }) => theme.colors.accent}; }
  small {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export function Logo() {
  return (
    <LogoLink href="/" aria-label="MarketMyDukan Studio home">
      <strong>
        Market<span>My</span>Dukan
      </strong>
      <small>Studio</small>
    </LogoLink>
  );
}


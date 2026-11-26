"use client";

import { createGlobalStyle } from "styled-components";
import { oaklineTheme as t } from "./theme";

/**
 * Isolated global reset scoped for the Oakline Interiors preview experience.
 * Independent from the MarketMyDukan Studio agency styles.
 */
export const OaklineGlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
    background: ${t.colors.cream};
    color: ${t.colors.espresso};
    font-family: ${t.fonts.sans};
    font-size: 1rem;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: ${t.fonts.display};
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.015em;
  }

  p { margin: 0; }
  ul, ol { margin: 0; padding: 0; list-style: none; }
  img, svg { display: block; max-width: 100%; }
  button { font: inherit; color: inherit; cursor: pointer; }
  a { color: inherit; text-decoration: none; }

  .oak-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  :focus-visible {
    outline: 2px solid ${t.colors.oak};
    outline-offset: 3px;
    border-radius: 3px;
  }

  ::selection {
    background: ${t.colors.oak};
    color: ${t.colors.white};
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

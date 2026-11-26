"use client";

import { createGlobalStyle } from "styled-components";
import { timberTheme as t } from "./theme";

/**
 * Isolated dark editorial reset for Timber & Loom.
 * Independent from the agency site and from Oakline Interiors.
 */
export const TimberGlobalStyle = createGlobalStyle`
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
    background: ${t.colors.bg};
    color: ${t.colors.text};
    font-family: ${t.fonts.sans};
    font-size: 1rem;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: ${t.fonts.serif};
    font-weight: 500;
    line-height: 1.06;
    letter-spacing: -0.02em;
  }

  p { margin: 0; }
  ul, ol { margin: 0; padding: 0; list-style: none; }
  img, svg { display: block; max-width: 100%; }
  button { font: inherit; color: inherit; cursor: pointer; }
  a { color: inherit; text-decoration: none; }

  .tl-sr-only {
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
    outline: 2px solid ${t.colors.accent};
    outline-offset: 3px;
    border-radius: 3px;
  }

  ::selection {
    background: ${t.colors.accent};
    color: ${t.colors.bg};
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;


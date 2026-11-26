export const theme = {
  colors: {
    background: "#F7F6F2",
    text: "#171717",
    accent: "#E7A33E",
    accentHover: "#D4922E",
    card: "#FFFFFF",
    muted: "#777777",
    border: "#E8E6E0",
  },
  fonts: {
    heading: "var(--font-heading), system-ui, sans-serif",
    body: "var(--font-body), system-ui, sans-serif",
  },
  space: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.5rem",
    6: "2rem",
    7: "3rem",
    8: "4rem",
    9: "6rem",
    10: "8rem",
  },
  radii: { sm: "8px", md: "14px", lg: "24px", pill: "999px" },
  shadows: {
    card: "0 1px 2px rgba(23,23,23,0.04), 0 8px 24px rgba(23,23,23,0.05)",
    cardHover: "0 2px 4px rgba(23,23,23,0.05), 0 16px 40px rgba(23,23,23,0.09)",
  },
  breakpoints: { tablet: 768, desktop: 1024, wide: 1440 },
  layout: { maxWidth: "1240px", headerHeight: "72px" },
  transitions: { base: "200ms cubic-bezier(0.22, 1, 0.36, 1)" },
} as const;

export type AppTheme = typeof theme;

/** Mobile-first media helpers: `${media.tablet} { ... }` */
export const media = {
  tablet: `@media (min-width: ${theme.breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${theme.breakpoints.desktop}px)`,
  wide: `@media (min-width: ${theme.breakpoints.wide}px)`,
} as const;


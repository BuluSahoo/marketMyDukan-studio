export const oaklineTheme = {
  colors: {
    cream: "#FAF6F0",
    linen: "#F2ECE1",
    white: "#FFFFFF",
    espresso: "#1E1B18",
    umber: "#6B6258",
    oak: "#9E6B43",
    oakHover: "#845633",
    walnut: "#231E1A",
    sage: "#4A5D4E",
    border: "#E5DDD0",
  },
  fonts: {
    display: "var(--font-oakline-display), Georgia, serif",
    sans: "var(--font-oakline-sans), system-ui, sans-serif",
  },
  radii: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    pill: "999px",
  },
  shadows: {
    soft: "0 2px 12px rgba(30, 27, 24, 0.05)",
    elevated: "0 16px 40px rgba(30, 27, 24, 0.1)",
  },
  layout: {
    maxWidth: "1320px",
    headerHeight: "76px",
  },
  breakpoints: {
    tablet: 768,
    desktop: 1024,
  },
  transitions: {
    base: "240ms cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export type OaklineTheme = typeof oaklineTheme;

export const oakMedia = {
  tablet: `@media (min-width: ${oaklineTheme.breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${oaklineTheme.breakpoints.desktop}px)`,
} as const;


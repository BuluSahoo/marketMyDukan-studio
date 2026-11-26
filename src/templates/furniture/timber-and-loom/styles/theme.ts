export const timberTheme = {
  colors: {
    bg: "#171817",
    bgSecondary: "#222522",
    card: "#292C29",
    cardElevated: "#303430",
    text: "#F4F0E8",
    muted: "#A6A39B",
    accent: "#B68A5A",
    accentHover: "#C99D6B",
    border: "rgba(244, 240, 232, 0.11)",
    borderStrong: "rgba(244, 240, 232, 0.24)",
  },
  fonts: {
    serif: "var(--font-timber-serif), Georgia, serif",
    sans: "var(--font-timber-sans), system-ui, sans-serif",
  },
  radii: {
    none: "0px",
    sm: "6px",
    md: "12px",
    lg: "18px",
    pill: "999px",
  },
  shadows: {
    card: "0 10px 30px rgba(0, 0, 0, 0.32)",
    elevated: "0 24px 60px rgba(0, 0, 0, 0.5)",
  },
  layout: {
    maxWidth: "1360px",
    headerHeight: "76px",
  },
  breakpoints: {
    tablet: 768,
    desktop: 1024,
  },
  transitions: {
    base: "260ms cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export const timberMedia = {
  tablet: `@media (min-width: ${timberTheme.breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${timberTheme.breakpoints.desktop}px)`,
} as const;


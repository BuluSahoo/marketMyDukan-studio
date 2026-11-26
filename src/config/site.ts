export const siteConfig = {
  name: "MarketMyDukan Studio",
  shortName: "MarketMyDukan",
  description:
    "Professionally designed websites for every kind of business — crafted by MarketMyDukan, a digital agency.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Website Templates", href: "/templates" },
    { label: "Categories", href: "/#categories" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Contact", href: "/#contact" },
  ],
  cta: { label: "Get a Website", href: "/#contact" },
  footerServices: ["Website Development", "E-commerce Websites", "Business Websites", "Digital Marketing"],
  // Placeholder contact details — replace before launch.
  contact: {
    email: "hello@marketmydukan.com",
    phone: "+91 00000 00000",
    location: "India",
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];

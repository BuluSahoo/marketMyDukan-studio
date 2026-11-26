import {
  Code2,
  Headphones,
  Megaphone,
  Palette,
  Rocket,
  ShoppingBag,
  Smartphone,
  Store,
  Tag,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";

export interface IconItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface StepItem extends IconItem {
  number: string;
}

export const steps: readonly StepItem[] = [
  {
    number: "01",
    title: "Choose Your Design",
    description:
      "Browse designs built for your industry and pick the one that already feels like your brand.",
    icon: LayoutTemplate,
  },
  {
    number: "02",
    title: "Customize Your Website",
    description:
      "Share your logo, photos, products and services. Our team tailors every page, colour and word.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Launch Your Business",
    description:
      "We set up your domain, test on every device and take your website live — ready for customers.",
    icon: Rocket,
  },
];

export const reasons: readonly IconItem[] = [
  {
    title: "Industry-specific designs",
    description: "Layouts shaped around how furniture stores, clinics, cafes and builders actually win customers.",
    icon: Store,
  },
  {
    title: "Mobile-friendly websites",
    description: "Designed for the phone in your customer's hand first, then scaled up beautifully.",
    icon: Smartphone,
  },
  {
    title: "Professional customization",
    description: "Your brand, your content, your structure — never a one-size-fits-all copy.",
    icon: Palette,
  },
  {
    title: "Affordable packages",
    description: "Clear starting prices with no hidden extras, built for growing local businesses.",
    icon: Tag,
  },
  {
    title: "Ongoing support",
    description: "Updates, fixes and guidance after launch from a team that knows your website.",
    icon: Headphones,
  },
];

export const services: readonly IconItem[] = [
  {
    title: "Website Development",
    description: "Fast, secure, custom-built websites engineered to grow with your business.",
    icon: Code2,
  },
  {
    title: "E-commerce Websites",
    description: "Online stores with product catalogues, smooth checkout and easy order management.",
    icon: ShoppingBag,
  },
  {
    title: "Business Websites",
    description: "Credible, elegant websites for clinics, firms, studios and service brands.",
    icon: Store,
  },
  {
    title: "Digital Marketing",
    description: "Search, social and local visibility campaigns that bring the right customers in.",
    icon: Megaphone,
  },
];


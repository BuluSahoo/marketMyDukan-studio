import {
  Armchair,
  Building2,
  Camera,
  Cpu,
  HardHat,
  Plane,
  Scissors,
  Shirt,
  Stethoscope,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/** Visual presentation of each category on the homepage. Keys match src/templates/categories.ts slugs. */
export const categoryIcons: Record<string, LucideIcon> = {
  furniture: Armchair,
  fashion: Shirt,
  electronics: Cpu,
  healthcare: Stethoscope,
  restaurant: UtensilsCrossed,
  "real-estate": Building2,
  salon: Scissors,
  construction: HardHat,
  travel: Plane,
  business: Camera,
};


import dynamic from "next/dynamic";

const OaklineInteriors = dynamic(
  () => import("@/templates/furniture/oakline-interiors"),
);

const TimberAndLoom = dynamic(
  () => import("@/templates/furniture/timber-and-loom"),
);

export function PreviewRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "oakline-interiors":
      return <OaklineInteriors />;
    case "timber-and-loom":
      return <TimberAndLoom />;
    default:
      return null;
  }
}

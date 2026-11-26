"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/**
 * Collects styled-components styles during SSR for both the agency site and
 * independent template previews without coupling them to a shared theme or CSS reset.
 */
export function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  if (typeof window !== "undefined") return content;

  return <StyleSheetManager sheet={sheet.instance}>{content}</StyleSheetManager>;
}

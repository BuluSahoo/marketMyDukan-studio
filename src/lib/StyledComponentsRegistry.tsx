"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";

/**
 * Collects styled-components styles during SSR and injects them into the
 * streamed HTML, preventing flash of unstyled content. Also provides theme.
 */
export function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  const content = (
    <ThemeProvider theme={theme}>
      <MotionConfig reducedMotion="user">
        <GlobalStyle />
        {children}
      </MotionConfig>
    </ThemeProvider>
  );

  if (typeof window !== "undefined") return content;

  return <StyleSheetManager sheet={sheet.instance}>{content}</StyleSheetManager>;
}


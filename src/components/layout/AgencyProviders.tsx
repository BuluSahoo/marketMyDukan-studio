"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";

/** Provides the MarketMyDukan Studio design system only to agency routes. */
export function AgencyProviders({
  children,
  fontClassName,
}: {
  children: ReactNode;
  fontClassName?: string;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {fontClassName ? <div className={fontClassName}>{children}</div> : children}
    </ThemeProvider>
  );
}


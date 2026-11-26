"use client";

import styled from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <Shell>
      <Header />
      <Main id="main">{children}</Main>
      <Footer />
    </Shell>
  );
}


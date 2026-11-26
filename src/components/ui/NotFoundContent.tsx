"use client";

import styled from "styled-components";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const Wrap = styled.section`
  padding: 5rem 0;
  text-align: center;
  ${media.tablet} {
    padding: 7rem 0;
  }

  span.code {
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.3rem 0.85rem;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: rgba(231, 163, 62, 0.2);
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 0.8125rem;
    font-weight: 700;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  p {
    max-width: 42ch;
    margin: 1rem auto 0;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 22rem;
  margin: 2rem auto 0;

  ${media.tablet} {
    flex-direction: row;
    justify-content: center;
    max-width: none;
  }
`;

export function NotFoundContent() {
  return (
    <Wrap>
      <Container>
        <span className="code">404</span>
        <h1>We could not find that page</h1>
        <p>
          The category or page you requested does not exist. Explore our full template
          catalogue or head back to the studio homepage.
        </p>
        <Actions>
          <ButtonLink href="/templates">Explore Website Templates</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back to Home
          </ButtonLink>
        </Actions>
      </Container>
    </Wrap>
  );
}


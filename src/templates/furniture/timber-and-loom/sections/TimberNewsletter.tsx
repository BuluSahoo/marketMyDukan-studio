"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import styled from "styled-components";
import { timberMedia, timberTheme as t } from "../styles/theme";
import { TimberContainer } from "../components/TimberContainer";

const Section = styled.section`
  padding: 4.5rem 0;
`;

const Card = styled.div`
  display: grid;
  gap: 2rem;
  padding: 2.25rem 1.5rem;
  background: ${t.colors.card};
  border: 1px solid ${t.colors.borderStrong};
  border-radius: ${t.radii.lg};

  ${timberMedia.tablet} {
    padding: 3rem;
  }

  ${timberMedia.desktop} {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 3rem;
  }

  span.eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.accent};
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(1.75rem, 4.5vw, 2.5rem);
  }

  p {
    margin-top: 0.75rem;
    color: ${t.colors.muted};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${timberMedia.tablet} {
    flex-direction: row;
  }

  input {
    flex: 1;
    min-height: 50px;
    padding: 0 1.25rem;
    border: 1px solid ${t.colors.borderStrong};
    border-radius: ${t.radii.pill};
    background: ${t.colors.bg};
    color: ${t.colors.text};
    font-family: ${t.fonts.sans};
    font-size: 1rem;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 50px;
    padding: 0 1.75rem;
    border: 0;
    border-radius: ${t.radii.pill};
    background: ${t.colors.accent};
    color: ${t.colors.bg};
    font-weight: 700;
    font-size: 0.9375rem;

    &:hover {
      background: ${t.colors.accentHover};
    }
  }
`;

const Status = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-radius: ${t.radii.pill};
  background: ${t.colors.bg};
  border: 1px solid ${t.colors.accent};
  color: ${t.colors.text};
  font-size: 0.9375rem;

  svg {
    color: ${t.colors.accent};
  }
`;

export function TimberNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <Section aria-labelledby="tl-news-title">
      <TimberContainer>
        <Card>
          <div>
            <span className="eyebrow">Atelier Dispatch</span>
            <h2 id="tl-news-title">Notes on Timber, Shadow &amp; Craft</h2>
            <p>
              Private previews of seasonal studio batches and architectural lookbooks — sent once
              a month.
            </p>
          </div>

          <div>
            {done ? (
              <Status role="status">
                <CheckCircle2 size={18} aria-hidden /> Added to the Timber &amp; Loom journal (Demo).
              </Status>
            ) : (
              <Form onSubmit={onSubmit}>
                <label htmlFor="tl-email" className="tl-sr-only">
                  Email address
                </label>
                <input
                  id="tl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                />
                <button type="submit">
                  Join Journal <ArrowRight size={17} aria-hidden />
                </button>
              </Form>
            )}
          </div>
        </Card>
      </TimberContainer>
    </Section>
  );
}


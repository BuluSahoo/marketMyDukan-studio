"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import styled from "styled-components";
import { oaklineTheme as t, oakMedia } from "../styles/theme";
import { OakContainer } from "../components/OakContainer";

const Section = styled.section`
  padding: 4.5rem 0;
  ${oakMedia.tablet} {
    padding: 5.5rem 0;
  }
`;

const Box = styled.div`
  max-width: 40rem;
  margin-inline: auto;
  text-align: center;

  span.eyebrow {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${t.colors.oak};
    margin-bottom: 0.5rem;
  }

  h2 {
    font-size: clamp(1.875rem, 5vw, 2.75rem);
  }

  p {
    margin-top: 0.75rem;
    color: ${t.colors.umber};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.75rem;

  ${oakMedia.tablet} {
    flex-direction: row;
  }

  input {
    flex: 1;
    min-height: 50px;
    padding: 0 1.25rem;
    border: 1px solid ${t.colors.border};
    border-radius: ${t.radii.pill};
    background: ${t.colors.white};
    font-family: ${t.fonts.sans};
    font-size: 1rem;
    color: ${t.colors.espresso};
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
    background: ${t.colors.espresso};
    color: ${t.colors.white};
    font-weight: 600;
    font-size: 0.9375rem;

    &:hover {
      background: ${t.colors.oak};
    }
  }
`;

const Status = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${t.radii.pill};
  background: ${t.colors.linen};
  color: ${t.colors.sage};
  font-weight: 500;
  font-size: 0.9375rem;
`;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Section aria-labelledby="oak-newsletter-title">
      <OakContainer>
        <Box>
          <span className="eyebrow">Private Journal</span>
          <h2 id="oak-newsletter-title">Seasonal Lookbooks &amp; Studio Invites</h2>
          <p>
            Receive early previews of small-batch oak releases, showroom exhibitions, and timber
            care guides.
          </p>

          {submitted ? (
            <Status role="status">
              <CheckCircle2 size={18} aria-hidden /> You are on the Oakline guest list (Demo).
            </Status>
          ) : (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="oak-email" className="oak-sr-only">
                Email address
              </label>
              <input
                id="oak-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              <button type="submit">
                Subscribe <ArrowRight size={17} aria-hidden />
              </button>
            </Form>
          )}
        </Box>
      </OakContainer>
    </Section>
  );
}

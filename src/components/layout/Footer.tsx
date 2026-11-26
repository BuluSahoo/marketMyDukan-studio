"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import styled from "styled-components";
import { siteConfig } from "@/config/site";
import { media } from "@/styles/theme";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const Wrap = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  padding: 3.5rem 0 2rem;
`;

const Top = styled.div`
  display: grid;
  gap: 2.5rem;
  ${media.tablet} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  ${media.desktop} { grid-template-columns: 1.5fr 1fr 1fr 1.3fr; gap: 3rem; }
`;

const About = styled.p`
  max-width: 34ch;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9375rem;
`;

const Col = styled.nav`
  h2 {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

const itemStyle = `
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-height: 44px;
  font-size: 0.9375rem;
`;

const FooterLink = styled(Link)`
  ${itemStyle}
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transitions.base};
  &:hover { color: ${({ theme }) => theme.colors.text}; }
`;

const ContactLink = styled.a`
  ${itemStyle}
  color: ${({ theme }) => theme.colors.muted};
  transition: color ${({ theme }) => theme.transitions.base};
  &:hover { color: ${({ theme }) => theme.colors.text}; }
  svg { flex-shrink: 0; color: ${({ theme }) => theme.colors.accent}; }
`;

const Static = styled.span`
  ${itemStyle}
  color: ${({ theme }) => theme.colors.muted};
  svg { flex-shrink: 0; color: ${({ theme }) => theme.colors.accent}; }
`;

const Text = styled.span`
  ${itemStyle}
  color: ${({ theme }) => theme.colors.muted};
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.8125rem;
  ${media.tablet} { flex-direction: row; justify-content: space-between; }
`;

export function Footer() {
  const { contact } = siteConfig;
  return (
    <Wrap>
      <Container>
        <Top>
          <div>
            <Logo />
            <About>{siteConfig.description}</About>
          </div>
          <Col aria-label="Footer navigation">
            <h2>Explore</h2>
            <List>
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </List>
          </Col>
          <Col as="div" aria-label="Services">
            <h2>Services</h2>
            <List>
              {siteConfig.footerServices.map((s) => (
                <li key={s}>
                  <Text>{s}</Text>
                </li>
              ))}
            </List>
          </Col>
          <Col as="div" aria-label="Contact">
            <h2>Contact</h2>
            <List>
              <li>
                <ContactLink href={`mailto:${contact.email}`}>
                  <Mail size={16} aria-hidden /> {contact.email}
                </ContactLink>
              </li>
              <li>
                <ContactLink href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  <Phone size={16} aria-hidden /> {contact.phone}
                </ContactLink>
              </li>
              <li>
                <Static>
                  <MapPin size={16} aria-hidden /> {contact.location}
                </Static>
              </li>
            </List>
          </Col>
        </Top>
        <Bottom>
          <span>© {new Date().getFullYear()} {siteConfig.shortName}. All rights reserved.</span>
          <span>Designed &amp; built with care in India.</span>
        </Bottom>
      </Container>
    </Wrap>
  );
}

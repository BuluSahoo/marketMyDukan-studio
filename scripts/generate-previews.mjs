// Generates original website-preview SVGs (desktop + mobile) for the homepage showcase.
// Run: node scripts/generate-previews.mjs   -> writes public/previews/*.svg
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "public/previews";
mkdirSync(OUT, { recursive: true });

const T = [
  { slug: "oakline-interiors", name: "Oakline Interiors", motif: "furniture", lines: ["Furniture that", "feels like home"], cta: "Shop collection", variant: "split", serif: true, p: { bg: "#F6F1EA", ink: "#2B2118", accent: "#B7733A", soft: "#E6D3BC", soft2: "#CFA77A" } },
  { slug: "maison-vela", name: "Maison Vela", motif: "fashion", lines: ["Dress the", "everyday"], cta: "New arrivals", variant: "overlay", serif: true, p: { bg: "#FAF5F3", ink: "#1D1A1A", accent: "#C9556B", soft: "#F2D5D9", soft2: "#E3A0AE" } },
  { slug: "voltix-electronics", name: "Voltix", motif: "electronics", lines: ["Next-gen tech,", "made simple"], cta: "Shop devices", variant: "centered", p: { bg: "#0E1320", ink: "#F2F5FF", accent: "#4DA3FF", soft: "#1D2A47", soft2: "#2F4A82" } },
  { slug: "carefirst-clinic", name: "CareFirst Clinic", motif: "health", lines: ["Care you can", "trust"], cta: "Book appointment", variant: "split", p: { bg: "#F2F8F7", ink: "#12302E", accent: "#1FA39A", soft: "#CDEBE7", soft2: "#8FD1CA" } },
  { slug: "saffron-and-co", name: "Saffron & Co.", motif: "food", lines: ["Taste the", "tradition"], cta: "Reserve a table", variant: "overlay", serif: true, p: { bg: "#FBF3E8", ink: "#2A1608", accent: "#D2561E", soft: "#F3D5B0", soft2: "#E0A25E" } },
  { slug: "prime-nest-realty", name: "Prime Nest", motif: "estate", lines: ["Find a home", "you will love"], cta: "View listings", variant: "split", p: { bg: "#F3F5F8", ink: "#14213D", accent: "#E7A33E", soft: "#D6DEEB", soft2: "#9FB2D1" } },
  { slug: "glow-atelier", name: "Glow Atelier", motif: "salon", lines: ["Beauty,", "beautifully done"], cta: "Book a visit", variant: "centered", serif: true, p: { bg: "#FBF4F6", ink: "#3A1F2B", accent: "#B8527A", soft: "#F5D9E4", soft2: "#E5A7C1" } },
  { slug: "ironbuild-construction", name: "Ironbuild Co.", motif: "construction", lines: ["We build what", "lasts"], cta: "Get a quote", variant: "split", p: { bg: "#F4F3EF", ink: "#1C1C1C", accent: "#F2A900", soft: "#DAD6CB", soft2: "#A39E8E" } },
  { slug: "wanderlane-travel", name: "Wanderlane", motif: "travel", lines: ["Journeys worth", "remembering"], cta: "Explore trips", variant: "overlay", serif: true, p: { bg: "#F0F7FA", ink: "#0E2A3A", accent: "#F28C28", soft: "#BFE3EF", soft2: "#6DB7D1" } },
  { slug: "northfield-studio", name: "Northfield Studio", motif: "business", lines: ["Ideas that", "move business"], cta: "See our work", variant: "centered", p: { bg: "#F7F6F2", ink: "#171717", accent: "#E7A33E", soft: "#EAE6DA", soft2: "#CFC8B4" } },
  { slug: "timber-and-loom", name: "Timber & Loom", motif: "furniture", lines: ["Crafted timber", "for calm living"], cta: "Book visit", variant: "centered", serif: true, p: { bg: "#EFECE4", ink: "#1F261E", accent: "#5A7D56", soft: "#D8E0D4", soft2: "#A9BEA5" } },
  { slug: "kora-streetwear", name: "Kora Streetwear", motif: "fashion", lines: ["Limited drop", "autumn edit"], cta: "Explore drop", variant: "split", p: { bg: "#141416", ink: "#F5F5F4", accent: "#E7A33E", soft: "#27272A", soft2: "#3F3F46" } },
  { slug: "circuit-repair-hub", name: "Circuit Care", motif: "electronics", lines: ["Same-day device", "repair experts"], cta: "Book repair", variant: "split", p: { bg: "#F4F6FA", ink: "#14213D", accent: "#2563EB", soft: "#DBEAFE", soft2: "#93C5FD" } },
  { slug: "vedacare-dental", name: "VedaCare Dental", motif: "health", lines: ["Gentle care", "for bright smiles"], cta: "Book checkup", variant: "centered", serif: true, p: { bg: "#FAF8F5", ink: "#1E293B", accent: "#0D9488", soft: "#CCFBF1", soft2: "#99F6E4" } },
  { slug: "roast-and-crumb", name: "Roast & Crumb", motif: "food", lines: ["Small-batch", "coffee & bakes"], cta: "Order online", variant: "split", serif: true, p: { bg: "#F9F3EC", ink: "#2C1810", accent: "#A85D34", soft: "#EBD7C5", soft2: "#D4AE8E" } },
  { slug: "skyline-residences", name: "Skyline Residences", motif: "estate", lines: ["Elevated living", "in the city"], cta: "Schedule tour", variant: "overlay", serif: true, p: { bg: "#161B22", ink: "#F7F6F2", accent: "#E7A33E", soft: "#2A323D", soft2: "#424E5E" } },
  { slug: "velvet-lash-studio", name: "Velvet Studio", motif: "salon", lines: ["Bridal & editorial", "beauty artistry"], cta: "View portfolio", variant: "overlay", serif: true, p: { bg: "#FDF6F0", ink: "#2D1E22", accent: "#C47D6A", soft: "#F3DCD4", soft2: "#DFB5A7" } },
  { slug: "arcline-architects", name: "Arcline Builders", motif: "construction", lines: ["Architecture", "built to endure"], cta: "View projects", variant: "centered", p: { bg: "#F5F5F3", ink: "#171717", accent: "#D97706", soft: "#E5E5E0", soft2: "#C4C2B8" } },
  { slug: "summit-retreats", name: "Summit Retreats", motif: "travel", lines: ["Slow escapes", "in the hills"], cta: "Reserve stay", variant: "split", serif: true, p: { bg: "#F2F6F3", ink: "#162A20", accent: "#C97B36", soft: "#D4E4DA", soft2: "#9FC2AC" } },
  { slug: "apex-advisory", name: "Apex Advisory", motif: "business", lines: ["Clarity for", "growing teams"], cta: "Book consult", variant: "split", p: { bg: "#F6F7F9", ink: "#0F172A", accent: "#E7A33E", soft: "#E2E8F0", soft2: "#CBD5E1" } },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const n = (v) => Math.round(v * 10) / 10;

const motifs = {
  furniture: (x, y, w, h, p) => `<rect x="${n(x + w * 0.18)}" y="${n(y + h * 0.5)}" width="${n(w * 0.64)}" height="${n(h * 0.2)}" rx="16" fill="${p.accent}"/><rect x="${n(x + w * 0.24)}" y="${n(y + h * 0.28)}" width="${n(w * 0.52)}" height="${n(h * 0.26)}" rx="16" fill="${p.ink}" opacity=".88"/><rect x="${n(x + w * 0.22)}" y="${n(y + h * 0.7)}" width="7" height="${n(h * 0.14)}" rx="3" fill="${p.ink}"/><rect x="${n(x + w * 0.78 - 7)}" y="${n(y + h * 0.7)}" width="7" height="${n(h * 0.14)}" rx="3" fill="${p.ink}"/><circle cx="${n(x + w * 0.84)}" cy="${n(y + h * 0.3)}" r="${n(h * 0.1)}" fill="${p.soft}"/>`,
  fashion: (x, y, w, h, p) => `<path d="M${n(x + w * 0.2)} ${n(y + h)} V${n(y + h * 0.4)} a${n(w * 0.15)} ${n(w * 0.15)} 0 0 1 ${n(w * 0.3)} 0 V${n(y + h)}Z" fill="${p.accent}"/><path d="M${n(x + w * 0.55)} ${n(y + h)} V${n(y + h * 0.3)} a${n(w * 0.12)} ${n(w * 0.12)} 0 0 1 ${n(w * 0.24)} 0 V${n(y + h)}Z" fill="${p.ink}" opacity=".9"/><circle cx="${n(x + w * 0.35)}" cy="${n(y + h * 0.25)}" r="${n(h * 0.07)}" fill="${p.soft}"/>`,
  electronics: (x, y, w, h, p) => `<rect x="${n(x + w * 0.14)}" y="${n(y + h * 0.2)}" width="${n(w * 0.52)}" height="${n(h * 0.5)}" rx="12" fill="${p.ink}" opacity=".92"/><rect x="${n(x + w * 0.17)}" y="${n(y + h * 0.24)}" width="${n(w * 0.46)}" height="${n(h * 0.42)}" rx="8" fill="${p.accent}"/><rect x="${n(x + w * 0.08)}" y="${n(y + h * 0.7)}" width="${n(w * 0.64)}" height="${n(h * 0.05)}" rx="3" fill="${p.ink}"/><rect x="${n(x + w * 0.7)}" y="${n(y + h * 0.35)}" width="${n(w * 0.16)}" height="${n(h * 0.5)}" rx="12" fill="${p.soft}" stroke="${p.ink}" stroke-width="3"/>`,
  health: (x, y, w, h, p) => `<circle cx="${n(x + w * 0.5)}" cy="${n(y + h * 0.5)}" r="${n(h * 0.34)}" fill="${p.accent}"/><rect x="${n(x + w * 0.5 - h * 0.05)}" y="${n(y + h * 0.28)}" width="${n(h * 0.1)}" height="${n(h * 0.44)}" rx="4" fill="#fff"/><rect x="${n(x + w * 0.5 - h * 0.22)}" y="${n(y + h * 0.45)}" width="${n(h * 0.44)}" height="${n(h * 0.1)}" rx="4" fill="#fff"/><circle cx="${n(x + w * 0.15)}" cy="${n(y + h * 0.2)}" r="${n(h * 0.08)}" fill="${p.soft}"/><circle cx="${n(x + w * 0.86)}" cy="${n(y + h * 0.8)}" r="${n(h * 0.1)}" fill="${p.soft}"/>`,
  food: (x, y, w, h, p) => `<circle cx="${n(x + w * 0.5)}" cy="${n(y + h * 0.52)}" r="${n(h * 0.38)}" fill="#fff"/><circle cx="${n(x + w * 0.5)}" cy="${n(y + h * 0.52)}" r="${n(h * 0.3)}" fill="${p.accent}"/><circle cx="${n(x + w * 0.44)}" cy="${n(y + h * 0.46)}" r="${n(h * 0.07)}" fill="${p.soft}"/><circle cx="${n(x + w * 0.58)}" cy="${n(y + h * 0.58)}" r="${n(h * 0.09)}" fill="${p.ink}" opacity=".75"/><circle cx="${n(x + w * 0.52)}" cy="${n(y + h * 0.62)}" r="${n(h * 0.05)}" fill="${p.soft}"/>`,
  estate: (x, y, w, h, p) => `<rect x="${n(x + w * 0.12)}" y="${n(y + h * 0.35)}" width="${n(w * 0.26)}" height="${n(h * 0.55)}" fill="${p.ink}" opacity=".9"/><rect x="${n(x + w * 0.4)}" y="${n(y + h * 0.18)}" width="${n(w * 0.26)}" height="${n(h * 0.72)}" fill="${p.accent}"/><rect x="${n(x + w * 0.68)}" y="${n(y + h * 0.5)}" width="${n(w * 0.2)}" height="${n(h * 0.4)}" fill="${p.soft2}"/>${[0.3, 0.45, 0.6, 0.75].map((r) => `<rect x="${n(x + w * 0.46)}" y="${n(y + h * r)}" width="${n(w * 0.14)}" height="${n(h * 0.06)}" fill="#fff" opacity=".8"/>`).join("")}`,
  salon: (x, y, w, h, p) => `<circle cx="${n(x + w * 0.38)}" cy="${n(y + h * 0.5)}" r="${n(h * 0.32)}" fill="${p.accent}" opacity=".9"/><circle cx="${n(x + w * 0.6)}" cy="${n(y + h * 0.45)}" r="${n(h * 0.26)}" fill="${p.soft2}"/><circle cx="${n(x + w * 0.5)}" cy="${n(y + h * 0.7)}" r="${n(h * 0.2)}" fill="${p.soft}"/>`,
  construction: (x, y, w, h, p) => `<rect x="${n(x + w * 0.12)}" y="${n(y + h * 0.62)}" width="${n(w * 0.76)}" height="${n(h * 0.18)}" fill="${p.ink}" opacity=".92"/><rect x="${n(x + w * 0.2)}" y="${n(y + h * 0.18)}" width="${n(w * 0.05)}" height="${n(h * 0.46)}" fill="${p.accent}"/><rect x="${n(x + w * 0.2)}" y="${n(y + h * 0.18)}" width="${n(w * 0.55)}" height="${n(h * 0.06)}" fill="${p.accent}"/><rect x="${n(x + w * 0.7)}" y="${n(y + h * 0.18)}" width="${n(w * 0.02)}" height="${n(h * 0.24)}" fill="${p.ink}"/><rect x="${n(x + w * 0.64)}" y="${n(y + h * 0.4)}" width="${n(w * 0.14)}" height="${n(h * 0.1)}" fill="${p.accent}"/>`,
  travel: (x, y, w, h, p) => `<circle cx="${n(x + w * 0.74)}" cy="${n(y + h * 0.28)}" r="${n(h * 0.12)}" fill="${p.accent}"/><path d="M${n(x)} ${n(y + h)} L${n(x + w * 0.3)} ${n(y + h * 0.4)} L${n(x + w * 0.52)} ${n(y + h * 0.75)} L${n(x + w * 0.68)} ${n(y + h * 0.55)} L${n(x + w)} ${n(y + h)}Z" fill="${p.ink}" opacity=".88"/><path d="M${n(x + w * 0.3)} ${n(y + h * 0.4)} L${n(x + w * 0.38)} ${n(y + h * 0.54)} L${n(x + w * 0.3)} ${n(y + h * 0.5)} L${n(x + w * 0.24)} ${n(y + h * 0.54)}Z" fill="#fff"/>`,
  business: (x, y, w, h, p) => [0.15, 0.32, 0.49, 0.66].map((c, i) => `<rect x="${n(x + w * c)}" y="${n(y + h * (0.7 - i * 0.14))}" width="${n(w * 0.12)}" height="${n(h * (0.2 + i * 0.14))}" rx="6" fill="${i === 3 ? p.accent : p.ink}" opacity="${i === 3 ? 1 : 0.85}"/>`).join("") + `<circle cx="${n(x + w * 0.86)}" cy="${n(y + h * 0.22)}" r="${n(h * 0.09)}" fill="${p.soft2}"/>`,
};

function art(id, x, y, w, h, t, r = 18) {
  const p = t.p;
  return `<defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.soft}"/><stop offset="1" stop-color="${p.soft2}"/></linearGradient><clipPath id="c${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#g${id})"/><g clip-path="url(#c${id})">${motifs[t.motif](x, y, w, h, p)}</g>`;
}

const bars = (x, y, widths, color, op = 0.22, h = 8, gap = 16) =>
  widths.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}" opacity="${op}"/>`).join("");

const btn = (x, y, w, h, label, t, solid = true) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${solid ? t.p.accent : "none"}" ${solid ? "" : `stroke="${t.p.ink}" stroke-opacity=".5" stroke-width="1.5"`}/><text x="${x + w / 2}" y="${y + h / 2 + 4.5}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="13" fill="${solid ? (t.p.bg.startsWith("#0") || t.p.bg.startsWith("#1") ? "#111111" : t.p.ink) : t.p.ink}">${esc(label)}</text>`;

const font = (t) => (t.serif ? "Georgia, 'Times New Roman', serif" : "Arial, Helvetica, sans-serif");

function desktop(t) {
  const p = t.p;
  const head = (x, y, size = 38, anchor = "start", color = p.ink) =>
    t.lines.map((l, i) => `<text x="${x}" y="${y + i * (size + 6)}" text-anchor="${anchor}" font-family="${font(t)}" font-weight="700" font-size="${size}" fill="${color}">${esc(l)}</text>`).join("");
  const card = (i, x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${p.soft}" opacity=".55"/>${art(`${t.slug}-s${i}`, x + 12, y + 12, w - 24, h * 0.55, t, 10)}${bars(x + 14, y + h * 0.55 + 28, [w * 0.5, w * 0.3], p.ink)}`;
  let body = "";
  if (t.variant === "split") {
    body = bars(40, 130, [70], p.accent, 0.9, 6) + head(40, 190) + bars(40, 270, [300, 250], p.ink) + btn(40, 318, 160, 40, t.cta, t) + btn(212, 318, 110, 40, "Learn more", t, false) + art(`${t.slug}-h`, 430, 120, 330, 270, t, 22) + card(1, 40, 430, 220, 150) + card(2, 290, 430, 220, 150) + card(3, 540, 430, 220, 150);
  } else if (t.variant === "centered") {
    body = bars(340, 126, [120], p.accent, 0.9, 6) + head(400, 190, 40, "middle") + bars(250, 262, [300, 240], p.ink, 0.22, 8, 16) + btn(335, 312, 130, 40, t.cta, t) + art(`${t.slug}-h`, 40, 380, 720, 230, t, 22);
  } else {
    body = art(`${t.slug}-h`, 40, 116, 720, 290, t, 22) + `<rect x="64" y="150" width="310" height="196" rx="18" fill="${p.bg}" opacity=".96"/>` + head(88, 206, 34) + bars(88, 262, [220, 170], p.ink) + btn(88, 298, 150, 38, t.cta, t) + card(1, 40, 440, 220, 150) + card(2, 290, 440, 220, 150) + card(3, 540, 440, 220, 150);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${esc(t.name)} website preview"><rect width="800" height="600" fill="${p.bg}"/>
<rect width="800" height="44" fill="#F1EFEA"/><circle cx="24" cy="22" r="6" fill="#E6785F"/><circle cx="44" cy="22" r="6" fill="#E7C14A"/><circle cx="64" cy="22" r="6" fill="#6FBF73"/><rect x="250" y="11" width="300" height="22" rx="11" fill="#fff"/><text x="400" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#777">${esc(t.name.toLowerCase().replace(/[^a-z]+/g, ""))}.com</text>
<text x="40" y="84" font-family="${font(t)}" font-weight="700" font-size="20" fill="${p.ink}">${esc(t.name)}</text><rect x="470" y="77" width="44" height="8" rx="4" fill="${p.ink}" opacity=".35"/><rect x="530" y="77" width="54" height="8" rx="4" fill="${p.ink}" opacity=".35"/><rect x="600" y="77" width="44" height="8" rx="4" fill="${p.ink}" opacity=".35"/><rect x="664" y="68" width="96" height="28" rx="14" fill="${p.accent}"/>
${body}</svg>
`;
}

function mobile(t) {
  const p = t.p;
  const head = t.lines.map((l, i) => `<text x="24" y="${400 + i * 34}" font-family="${font(t)}" font-weight="700" font-size="28" fill="${p.ink}">${esc(l)}</text>`).join("");
  const mini = (i, x) => `<rect x="${x}" y="560" width="150" height="140" rx="14" fill="${p.soft}" opacity=".55"/>${art(`${t.slug}-m${i}`, x + 10, 570, 130, 80, t, 10)}${bars(x + 12, 666, [80, 50], p.ink)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 720" width="360" height="720" role="img" aria-label="${esc(t.name)} mobile website preview"><rect width="360" height="720" fill="${p.bg}"/>
<text x="24" y="42" font-family="${font(t)}" font-weight="700" font-size="19" fill="${p.ink}">${esc(t.name)}</text><rect x="304" y="30" width="30" height="3" rx="1.5" fill="${p.ink}"/><rect x="304" y="38" width="30" height="3" rx="1.5" fill="${p.ink}"/><rect x="314" y="46" width="20" height="3" rx="1.5" fill="${p.ink}"/>
${art(`${t.slug}-mh`, 20, 72, 320, 280, t, 22)}${head}${bars(24, 468, [250, 200], p.ink)}${btn(24, 506, 170, 42, t.cta, t)}${mini(1, 20)}${mini(2, 190)}</svg>
`;
}

for (const t of T) {
  writeFileSync(`${OUT}/${t.slug}.svg`, desktop(t));
  writeFileSync(`${OUT}/${t.slug}-mobile.svg`, mobile(t));
}
console.log(`Generated ${T.length * 2} previews in ${OUT}`);

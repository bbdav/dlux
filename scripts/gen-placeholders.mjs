/**
 * Generates on-brand placeholder imagery (the prototype's media-well treatment)
 * plus the favicon/OG raster set. Run: `node scripts/gen-placeholders.mjs`.
 * Real project images can replace these later with no code changes.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workDir = join(root, 'src/assets/work');
const pub = join(root, 'public');

const FG = '#A8A6A0';
const ACCENT = '#E8FE54';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A dark media-well with radial lime glow, a mono label, and a corner index. */
function well({ w, h, label, num, sub }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(60 .5 .5)">
      <stop offset="0" stop-color="#202024"/>
      <stop offset="1" stop-color="#161618"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="20%" r="60%">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.07"/>
      <stop offset="0.55" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${num ? `<text x="40" y="56" font-family="monospace" font-size="22" fill="${FG}">${num}</text>` : ''}
  <text x="50%" y="${h / 2}" font-family="monospace" font-size="${Math.round(w / 28)}"
        letter-spacing="1.5" fill="${FG}" text-anchor="middle">${esc(label)}</text>
  ${sub ? `<text x="50%" y="${h / 2 + Math.round(w / 22)}" font-family="monospace" font-size="${Math.round(w / 48)}" letter-spacing="2" fill="#6B6963" text-anchor="middle">${esc(sub)}</text>` : ''}
</svg>`;
}

async function png(svg, out, w, h) {
  await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(out);
  console.log('✓', out.replace(root + '/', ''), `${w}×${h}`);
}

const covers = [
  { file: 'agility-cover', num: '01', label: 'Agility CMS · Plenum', sub: 'DESIGN SYSTEM' },
  { file: 'insticator-cover', num: '02', label: 'Insticator · Portal 2.0', sub: 'DASHBOARD · AD TECH' },
  { file: 'mai-cover', num: '03', label: 'MAI Social', sub: 'MOBILE · iOS' },
  { file: 'hvac-cover', num: '04', label: 'HVAC Controller', sub: 'IOT · MOBILE' },
  { file: 'simpletire-cover', num: '05', label: 'SimpleTire', sub: 'E-COMMERCE · B2C' },
];

async function main() {
  await mkdir(workDir, { recursive: true });

  // 4:3 cover wells for every project (1600×1200)
  for (const c of covers) {
    await png(well({ w: 1600, h: 1200, label: c.label, num: c.num, sub: c.sub }),
      join(workDir, `${c.file}.png`), 1600, 1200);
  }

  // 16:9 hero + supporting imagery for the full Agility case study
  await png(well({ w: 2400, h: 1350, label: 'Plenum Design System', sub: 'AGILITY CMS · 2022' }),
    join(workDir, 'agility-hero.png'), 2400, 1350);
  await png(well({ w: 1600, h: 1200, label: 'Component library' }),
    join(workDir, 'agility-components.png'), 1600, 1200);
  await png(well({ w: 1600, h: 1200, label: 'Token architecture' }),
    join(workDir, 'agility-tokens.png'), 1600, 1200);
  await png(well({ w: 1200, h: 1500, label: 'Editor flow' }),
    join(workDir, 'agility-editor.png'), 1200, 1500);
  await png(well({ w: 1200, h: 1500, label: 'Documentation site' }),
    join(workDir, 'agility-docs.png'), 1200, 1500);

  // OG default card (1200×630)
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#0B0B0C"/>
    <text x="80" y="300" font-family="sans-serif" font-size="76" font-weight="300" letter-spacing="-3" fill="#F4F3F0">I design systems</text>
    <text x="80" y="384" font-family="sans-serif" font-size="76" font-weight="300" letter-spacing="-3" fill="#F4F3F0">that <tspan font-style="italic" fill="${ACCENT}">hold up</tspan>.</text>
    <text x="80" y="540" font-family="monospace" font-size="24" letter-spacing="2" fill="#A8A6A0">DAVID BABIJAEV — SENIOR PRODUCT DESIGNER</text>
    <circle cx="1095" cy="90" r="9" fill="${ACCENT}"/>
  </svg>`;
  await png(og, join(pub, 'og-default.png'), 1200, 630);

  // Favicon raster set + apple touch + android chrome (from the dark "d." mark)
  const mark = (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="7" fill="#0B0B0C"/>
    <text x="16" y="22" font-family="monospace" font-size="17" font-weight="500" text-anchor="middle" fill="#F4F3F0">d<tspan fill="${ACCENT}">.</tspan></text>
  </svg>`;
  await png(mark(180), join(pub, 'apple-touch-icon.png'), 180, 180);
  await png(mark(192), join(pub, 'android-chrome-192.png'), 192, 192);
  await png(mark(512), join(pub, 'android-chrome-512.png'), 512, 512);
  await sharp(Buffer.from(mark(32))).resize(32, 32).png().toFile(join(pub, 'favicon-32.png'));
  // .ico fallback (PNG-encoded; modern browsers prefer favicon.svg anyway)
  await sharp(Buffer.from(mark(32))).resize(32, 32).toFile(join(pub, 'favicon.ico'));
  console.log('✓ favicons + og generated');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

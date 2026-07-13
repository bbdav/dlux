/**
 * Site-wide constants. Single source for SEO defaults, nav, and socials.
 */

export const SITE = {
  name: 'dlux',
  domain: 'https://dlux.ca',
  /** Title template: "<page> — David Babijaev" */
  titleTemplate: (page?: string) =>
    page ? `${page} — David Babijaev` : 'David Babijaev — Senior Product Designer',
  defaultTitle: 'David Babijaev — Senior Product Designer',
  description:
    'David Babijaev — senior product designer. 20+ years turning complex software into products people understand. SaaS, enterprise, design systems.',
  author: 'David Babijaev',
  locale: 'en_CA',
  ogImage: '/og-default.png',
  email: 'contact@dlux.ca',
  location: 'Bradford, ON · Greater Toronto Area',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '/work', newTab: false, email: false },
  { label: 'About', href: '/about', newTab: false, email: false },
  { label: 'Resume', href: '/resume.pdf', newTab: true, email: false },
  // Email is wired client-side (see the obfuscation script in BaseLayout) so the
  // address never appears in the HTML for spam bots to scrape.
  { label: 'Contact', href: '#', newTab: false, email: true },
] as const;

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/david-babijaev' },
  { label: 'Dribbble', href: 'https://dribbble.com/dluxstudio' },
  { label: 'Medium', href: 'https://medium.com/@dluxstudio' },
  { label: 'Resume', href: '/resume.pdf' },
] as const;

/** Verbatim testimonials (real — do not edit copy). */
export const TESTIMONIALS = [
  {
    quote:
      "David's expertise at RBC enhanced our digital products. His strategic thinking and creativity make him a strong asset to any product design team.",
    name: 'Kelvin Poon',
    role: 'Digital Transformation Designer · RBC',
  },
  {
    quote:
      'His design thinking at Agility CMS was exceptional. He led UI redesigns, established a unified design system, and improved brand consistency across the board.',
    name: 'Harmonie Kasko',
    role: 'Head of Marketing · OrderEase',
  },
  {
    quote:
      'Detail-oriented, tackles complex UX challenges efficiently, explores multiple solutions. Delivers high-quality work even under tight deadlines.',
    name: 'Francisco Martinez',
    role: 'Product Design Manager · Nubank',
  },
  {
    quote:
      'A rare skill set across web, mobile, and on-device interfaces. Works well in teams and solo. Resilient and genuinely expert.',
    name: 'Jonathan Theriault',
    role: 'Director of Technology · Berner',
  },
  {
    quote:
      'Highly skilled with strong problem-solving abilities. Reliable, forward-thinking, a great team player. His commitment to users makes him invaluable.',
    name: 'Melisa Yukselir',
    role: 'Lead Product Designer · Ex-RBC',
  },
  {
    quote:
      'His versatility across web, print, and branding elevated our software products. He juggles multiple industries and works seamlessly with teams.',
    name: 'Andreea Arion',
    role: 'Digital Product Lead · BT Group',
  },
] as const;

export const SKILLS = [
  { head: 'Design', items: ['Product Design', 'Design Systems', 'Information Architecture', 'Interaction Design', 'Workflow Design'] },
  { head: 'Domains', items: ['B2B SaaS', 'Enterprise', 'Headless CMS', 'IoT', 'Mobile'] },
  { head: 'Tools', items: ['Figma', 'Storybook', 'Claude Code', 'Cursor', 'Framer'] },
  { head: 'Code', items: ['React + TypeScript', 'Tailwind v4', 'Astro', 'Vercel · Netlify', 'Git · GitHub'] },
] as const;

/** Project categories used by the /work filter and collection schema. */
export const CATEGORIES = [
  'Design System',
  'SaaS',
  'Mobile',
  'IoT',
  'E-commerce',
  'Web',
] as const;

export type Category = (typeof CATEGORIES)[number];

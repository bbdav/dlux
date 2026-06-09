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
  email: 'david@dlux.ca',
  location: 'Bradford, ON · Greater Toronto Area',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: 'mailto:david@dlux.ca' },
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
    name: 'Harmonie Poirier',
    role: 'Head of Marketing · Agility CMS',
  },
  {
    quote:
      'Detail-oriented, tackles complex UX challenges efficiently, explores multiple solutions. Delivers high-quality work even under tight deadlines.',
    name: 'Francisco Martinez',
    role: 'Head of Product & Design',
  },
  {
    quote:
      'A rare skill set across web, mobile, and on-device interfaces. Works well in teams and solo. Resilient and genuinely expert.',
    name: 'Jonathan Theriault',
    role: 'Director of Technology',
  },
  {
    quote:
      'Highly skilled with strong problem-solving abilities. Reliable, forward-thinking, a great team player. His commitment to users makes him invaluable.',
    name: 'Melisa Yukselir',
    role: 'Lead Product Designer',
  },
  {
    quote:
      'His versatility across web, print, and branding elevated our software products. He juggles multiple industries and works seamlessly with teams.',
    name: 'Maranda Moses',
    role: 'Digital Product Lead',
  },
] as const;

export const SKILLS = [
  { head: 'Design', items: ['Product Design', 'Design Systems', 'Interaction Design', 'Prototyping', 'Research'] },
  { head: 'Domains', items: ['B2B SaaS', 'Enterprise', 'iOS / Mobile', 'IoT', 'FinTech'] },
  { head: 'Tools', items: ['Figma', 'Adobe CS', 'Tailwind', 'Miro · Jira'] },
  { head: 'Code-adjacent', items: ['React basics', 'Tailwind v4', 'Vite · Astro', 'MDX'] },
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

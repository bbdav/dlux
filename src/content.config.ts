import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './consts';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      /** Project name shown on cards and the case-study header. */
      title: z.string(),
      client: z.string(),
      role: z.string(),
      year: z.number().int(),
      /** Filter facet — must be one of the five canonical categories. */
      category: z.enum(CATEGORIES),
      /** Display discipline line, e.g. "Dashboard · Ad Tech". Defaults to category. */
      tags: z.string().optional(),
      /** One-line card description. */
      summary: z.string(),
      /** One-line outcome shown in the case-study header. */
      outcome: z.string(),
      cover: image(),
      coverAlt: z.string(),
      /** Optional dedicated hero (defaults to cover on the case-study page). */
      hero: image().optional(),
      heroAlt: z.string().optional(),
      /** Gallery order, ascending. Drives card order + next-project sequence. */
      order: z.number().int(),
      draft: z.boolean().default(false),
      /** Optional metadata-bar entries on the case study. */
      services: z.array(z.string()).optional(),
    }),
});

export const collections = { work };

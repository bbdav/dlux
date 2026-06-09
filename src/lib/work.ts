import { getCollection, type CollectionEntry } from 'astro:content';

export type WorkEntry = CollectionEntry<'work'>;

const isPublished = (e: WorkEntry) => e.data.draft !== true || import.meta.env.DEV;

/** All work entries, ordered by `order` ascending. Drafts only in dev. */
export async function getWork(): Promise<WorkEntry[]> {
  const entries = await getCollection('work', isPublished);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

/** The next project after `slug`, wrapping around the ordered list. */
export async function getNextProject(slug: string): Promise<WorkEntry | null> {
  const all = await getWork();
  if (all.length < 2) return null;
  const i = all.findIndex((e) => e.id === slug);
  if (i === -1) return null;
  return all[(i + 1) % all.length];
}

/** Display discipline line, falling back to the category facet. */
export const disciplineOf = (e: WorkEntry): string => e.data.tags ?? e.data.category;

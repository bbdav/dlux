// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://dlux.ca',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    // Cast avoids a cosmetic type clash between Astro's bundled Vite and the
    // Vite types @tailwindcss/vite is built against. Runtime is unaffected.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  image: {
    // Sharp is the default service; declared here for clarity.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://reshi.me",
  integrations: [mdx()],

  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
      configPath: "wrangler.jsonc",
      persist: true,
    },
  }),
});

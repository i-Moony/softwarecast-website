// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
    site: "https://softwarecast.ru",
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [sitemap(), mdx()],
    devToolbar: {
        enabled: false,
    },
});

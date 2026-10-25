import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import nav from "./config/nav";
import sidebar from "./config/sidebar";
import socialLinks from "./config/social";
import footer from "./config/footer";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  lang: "zh-CN",
  title: "Cijinx",
  description: "Cijinx's Blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks,
    footer,
  },
});

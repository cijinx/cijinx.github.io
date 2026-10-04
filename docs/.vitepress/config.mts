import { defineConfig } from "vitepress";
import nav from "./config/nav";
import sidebar from "./config/sidebar";
import socialLinks from "./config/social";
import footer from "./config/footer";

// https://vitepress.dev/reference/site-config
export default defineConfig({
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

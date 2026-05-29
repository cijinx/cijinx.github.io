import { defineConfig } from "vitepress";
import nav from "./config/nav";
import sidebar from "./config/sidebar";
import socialLinks from "./config/social";
import footer from "./config/footer";

export default defineConfig({
  lang: "zh-CN",
  title: "Cijinx",
  description: "Cijinx's Blog",
  themeConfig: {
    nav,
    sidebar,
    socialLinks,
    footer,
  },
});

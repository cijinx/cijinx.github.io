import { defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "docs",

  title: "Cijinx's Blog",
  description: "Cijinx's Blog",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "示例", link: "/vitepress/markdown-examples" },
    ],

    sidebar: [
      {
        text: "示例",
        items: [
          { text: "Markdown Examples", link: "/vitepress/markdown-examples" },
          { text: "Runtime API Examples", link: "/vitepress/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

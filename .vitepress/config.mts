import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Cijinx",
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
          { text: "文档示例", link: "/vitepress/markdown-examples" },
          { text: "API 示例", link: "/vitepress/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

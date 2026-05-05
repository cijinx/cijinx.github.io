import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import nav from "./config/nav";
import sidebar from "./config/sidebar";
import socialLinks from "./config/socialLinks";
import footer from "./config/footer";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  lastUpdated: true,
  lang: "zh-CN",
  title: "cijinx",
  description: "Cijinx Site",
  titleTemplate: "cijinx | :title",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    siteTitle: "Cijinx",
    logo: "/logo.svg",
    nav,
    sidebar,
    socialLinks,
    footer,
    lastUpdated: {
      text: "更新于",
      formatOptions: {
        dateStyle: "full",
      },
    },
    search: {
      provider: "local",
      options: {
        disableDetailedView: false,
        detailedView: "auto",
        disableQueryPersistence: false,
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清除查询条件",
            noResultsText: "无法找到相关结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    outline: 2,
    outlineTitle: "页面导航",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },
});

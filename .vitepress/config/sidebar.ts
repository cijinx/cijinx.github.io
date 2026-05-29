import type { DefaultTheme } from "vitepress";
const sidebar: DefaultTheme.Sidebar = {
  "/vitepress/": [
    {
      text: "快速开始",
      items: [{ text: "初始化", link: "/vitepress/index" }],
    },
    {
      text: "TailwindCSS",
      items: [{ text: "TailwindCSS", link: "/vitepress/tailwindcss" }],
    },
    {
      text: "暗黑切换动画",
      items: [{ text: "暗黑切换动画", link: "/vitepress/darkmode" }],
    },
  ],
  "/node/": [
    {
      text: "基础",
      items: [{ text: "开始", link: "/node/index" }],
    },
    {
      text: "工程化",
      items: [{ text: "前端工程化", link: "/node/lint" }],
    },
  ],
  "/hackintosh/": [
    {
      text: "基础",
      items: [{ text: "开始", link: "/hackintosh/index" }],
    },
    {
      text: "工程化",
      items: [{ text: "前端工程化", link: "/hackintosh/lint" }],
    },
  ],
};
export default sidebar;

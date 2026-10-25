import type { DefaultTheme } from "vitepress";
const sidebar: DefaultTheme.Sidebar = [
  {
    text: "Examples",
    items: [
      { text: "Markdown Examples", link: "/eg/markdown-examples" },
      { text: "Runtime API Examples", link: "/eg/api-examples" },
    ],
  },
];
export default sidebar;

import type { DefaultTheme } from "vitepress";
export const nav: DefaultTheme.NavItem[] = [
      { text: "首页", link: "/", activeMatch: "" },
      { text: "VitePress", link: "/vitepress/", activeMatch: "/vitepress/" },
      { text: "OpenCore", link: "/opencore/", activeMatch: "/opencore/" },
      {
        text: "Linux",
        activeMatch: "/linux/",
        items: [
          {
            items: [{ text: "开始", link: "/linux/index" }],
          },
          {
            items: [
              { text: "PVE", link: "/linux/pve" },
              { text: "OpenWRT", link: "/linux/openwrt" },
            ],
          },
          {
            items: [
              { text: "Nginx", link: "/linux/nginx" },
              { text: "Frp", link: "/linux/frp" },
              { text: "RustDesk", link: "/linux/rustdesk" },
              { text: "Emby", link: "/linux/emby" },
            ],
          },
        ],
      },
      {
        text: "Docker",
        activeMatch: "/docker/",
        items: [
          {
            items: [{ text: "开始", link: "/docker/index" }],
          },
          {
            items: [
              { text: "Portainer", link: "/docker/portainer" },
              { text: "Homarr", link: "/docker/homarr" },
              { text: "Registry", link: "/docker/registry" },
              { text: "MySQL", link: "/docker/mysql" },
              { text: "Redis", link: "/docker/redis" },
            ],
          },
          {
            items: [{ text: "Immich", link: "/docker/immich" }],
          },
        ],
      },
      { text: "Python", link: "/python/", activeMatch: "/python/" },
      {
        text: "Bun",
        link: "/bunjs/",
        activeMatch: "/bunjs/",
      },
    ];
    export default nav;

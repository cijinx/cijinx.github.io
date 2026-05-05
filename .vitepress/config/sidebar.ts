import type { DefaultTheme } from "vitepress";
export const sidebar: DefaultTheme.Sidebar = {
  "/vitepress/": [
    {
      text: "创建 VitePress",
      items: [
        {
          text: "开始",
          link: "/vitepress/index",
        },
        {
          text: "部署",
          link: "/vitepress/deploy",
        },
      ],
    },
    {
      text: "写作",
      items: [
        {
          text: "路由",
          link: "/vitepress/routing",
        },
        {
          text: "Markdown语法扩展",
          link: "/vitepress/markdown",
        },
      ],
    },
    {
      text: "默认主题",
      items: [
        {
          text: "站点配置",
          link: "/vitepress/siteconfig",
        },
      ],
    },
  ],
  "/opencore/": [
    {
      text: "关于OpenCore",
      items: [
        {
          text: "开始",
          link: "/opencore/index",
        },
      ],
    },
    {
      text: "Config配置项说明",
      collapsed: true,
      items: [
        { text: "ACPI", link: "/opencore/config/acpi" },
        { text: "Booter", link: "/opencore/config/booter" },
        {
          text: "DeviceProperties",
          link: "/opencore/config/deviceproperties",
        },
        { text: "Kernel", link: "/opencore/config/kernel" },
        { text: "Misc", link: "/opencore/config/misc" },
        { text: "NVRAM", link: "/opencore/config/nvram" },
        { text: "PlatformInfo", link: "/opencore/config/platforminfo" },
        { text: "UEFI", link: "/opencore/config/uefi" },
      ],
    },
    {
      text: "安装指南",
      items: [
        {
          text: "Coffee Lake(9代台式主机)",
          link: "/opencore/install/coffeelake",
        },
        {
          text: "Comet Lake(10代台式主机)",
          link: "/opencore/install/cometlake",
        },
      ],
    },
    {
      text: "SSDT定制",
      items: [
        { text: "获取 DSDT 的副本", link: "/opencore/ssdt/dsdt" },
        { text: "SSDT-PLUG", link: "/opencore/ssdt/plug" },
        { text: "SSDT-EC-USBX", link: "/opencore/ssdt/ecusbx" },
        { text: "SSDT-AWAC", link: "/opencore/ssdt/awac" },
        { text: "SSDT-PMC", link: "/opencore/ssdt/pmc" },
        { text: "SSDT-RHUB", link: "/opencore/ssdt/rhub" },
      ],
    },
    {
      text: "扩展优化",
      items: [{ text: "SSDT方法定制USB", link: "/opencore/extras/xhub" }],
    },
    {
      text: "定制优化",
      items: [
        { text: "其他优化项", link: "/opencore/last/other" },
        { text: "删除 config 多余配置项", link: "/opencore/last/del" },
      ],
    },
  ],
  "/linux/": [
    {
      text: "Linux",
      items: [
        {
          text: "开始",
          link: "/linux/index",
        },
      ],
    },
    {
      text: "系统",
      items: [
        { text: "PVE", link: "/linux/pve" },
        { text: "OpenWRT", link: "/linux/openwrt" },
      ],
    },
    {
      text: "应用",
      items: [
        { text: "Nginx", link: "/linux/nginx" },
        { text: "Frp", link: "/linux/frp" },
        { text: "RustDesk", link: "/linux/rustdesk" },
        { text: "Emby", link: "/linux/emby" },
      ],
    },
  ],
  "/docker/": [
    {
      text: "Docker",
      items: [
        {
          text: "开始",
          link: "/docker/index",
        },
      ],
    },
    {
      text: "服务部署",
      items: [
        {
          text: "Portainer",
          link: "/docker/portainer",
        },
        {
          text: "Homarr",
          link: "/docker/homarr",
        },
        {
          text: "Registry",
          link: "/docker/registry",
        },
        {
          text: "MySQL",
          link: "/docker/mysql",
        },
        {
          text: "Redis",
          link: "/docker/redis",
        },
        {
          text: "immich",
          link: "/docker/immich",
        },
      ],
    },
  ],
  "/python/": [
    {
      text: "Python",
      items: [
        {
          text: "开始",
          link: "/python/index",
        },
      ],
    },
  ],
  "/bunjs/": [
    {
      text: "安装",
      link: "/bunjs/index",
    },
    {
      text: "运行时",
      link: "/bunjs/runtime",
    },
    {
      text: "包管理",
      link: "/bunjs/manager",
    },
  ],
};
export default sidebar;

import { defineConfig } from "vitepress";

export default defineConfig({
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

    socialLinks: [
      { icon: "github", link: "https://github.com/cijinx" },
      {
        icon: {
          svg: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <title>gitee</title>
                  <path fill-rule="evenodd" d="M256,0 C397.384896,0 512,114.615104 512,256 C512,397.384896 397.384896,512 256,512 C114.615104,512 0,397.384896 0,256 C0,114.615104 114.615104,0 256,0 Z M385.588158,113.77778 C385.585545,113.77778 385.582931,113.77778 385.580317,113.785616 L208.59207,113.785616 C156.227582,113.785616 113.777778,156.235421 113.777778,208.599908 L113.777778,385.580317 C113.777778,392.562249 119.437752,398.222222 126.419683,398.222222 L312.891227,398.222222 C360.018235,398.222222 398.222222,360.018235 398.222222,312.891227 L398.222222,240.202136 C398.222222,233.220205 392.562249,227.560231 385.580317,227.560231 L240.198402,227.560231 C233.217763,227.563542 227.558325,233.221498 227.553186,240.202136 L227.54491,271.805633 C227.539666,278.787563 233.198157,284.44902 240.180089,284.450848 L328.691742,284.446696 C335.570998,284.446534 341.166937,289.941214 341.330092,296.781235 L341.333647,297.088496 L341.333647,303.409129 C341.333647,324.354924 324.353725,341.334845 303.40793,341.334845 L183.300418,341.334845 C176.319489,341.334497 170.660273,335.675438 170.659732,328.694508 L170.656422,208.59864 C170.654799,187.652845 187.634253,170.672455 208.580047,170.671878 L385.545033,170.672923 C392.523903,170.66508 398.182608,165.009884 398.19478,158.03102 L398.214382,126.42752 C398.226551,119.445594 392.570089,113.782111 385.588158,113.77778 Z"></path> 
                </svg>`,
        },
        link: "https://gitee.com/martinmac",
      },
      {
        icon: {
          svg: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <title>bilibili</title>
                <path fill-rule="evenodd" d="M106.169458,48.0184627 C94.7851378,37.0384557 94.7851378,18.8064115 106.169458,7.82668889 C116.98944,-2.6088963 134.130347,-2.6088963 144.950329,7.82668889 L205.290098,66.0224321 C207.00416,67.6761162 208.460516,69.4938889 209.658596,71.4268365 L300.910933,71.4268365 C302.111289,69.4938889 303.567644,67.6761162 305.28,66.0224321 L365.6192,7.82668889 C376.439467,-2.6088963 393.580089,-2.6088963 404.400356,7.82668889 C415.786667,18.8064115 415.786667,37.0384557 404.400356,48.0184627 L380.131556,71.4268365 L398.222222,71.4268365 C461.058844,71.4268365 512,122.355755 512,185.179822 L512,341.747442 C512,404.570372 461.058844,455.500428 398.222222,455.500428 L113.777778,455.500428 C50.9400178,455.500428 0,404.570372 0,341.747442 L0,185.179538 C0,122.35547 50.9400178,71.4268365 113.777778,71.4268365 L130.440249,71.4268365 L106.169458,48.0184627 Z M113.777778,126.294452 C82.3588978,126.294452 56.8888889,151.758911 56.8888889,183.170945 L56.8888889,343.755182 C56.8888889,375.168069 82.3588978,400.631675 113.777778,400.631675 L398.222222,400.631675 C429.641956,400.631675 455.111111,375.168069 455.111111,343.755182 L455.111111,183.170945 C455.111111,151.758911 429.641956,126.294452 398.222222,126.294452 L113.777778,126.294452 Z M142.222222,237.034121 C142.222222,221.328246 154.957369,208.595875 170.666667,208.595875 C186.375964,208.595875 199.111111,221.328246 199.111111,237.034121 L199.111111,262.458767 C199.111111,278.16521 186.375964,290.897013 170.666667,290.897013 C154.957369,290.897013 142.222222,278.16521 142.222222,262.458767 L142.222222,237.034121 Z M341.333333,208.595875 C325.623467,208.595875 312.888889,221.328246 312.888889,237.034121 L312.888889,262.458767 C312.888889,278.16521 325.623467,290.897013 341.333333,290.897013 C357.0432,290.897013 369.777778,278.16521 369.777778,262.458767 L369.777778,237.034121 C369.777778,221.328246 357.0432,208.595875 341.333333,208.595875 Z"></path>
              </svg>`,
        },
        link: "https://space.bilibili.com/1752290991",
      },
    ],

    footer: {
      message: "在 ISC 许可下发布",
      copyright:
        '<a href="https://github.com/cijinx">cijinx</a>版权所有 © 2020至今 <a href="https://beian.miit.gov.cn">苏ICP备20042680号-1</a>',
    },

    outline: 2,
    outlineTitle: "页面导航",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    nav: [
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
    ],

    sidebar: {
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
            { text: "DeviceProperties", link: "/opencore/config/deviceproperties" },
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
            { text: "Comet Lake(10代台式主机)", link: "/opencore/install/cometlake" },
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
          items: [
            { text: "SSDT方法定制USB", link: "/opencore/extras/xhub" },
          ],
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
    },
  },
});

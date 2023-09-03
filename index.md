---
layout: home

hero:
  {
    name: "MartinMac",
    text: "MartinMac",
    tagline: "691585101@QQ.com",
    image: { light: "/logo.svg", dark: "/logo.svg" },
    actions:
      [
        {
          theme: "brand",
          text: "Markdown Example",
          link: "/markdown-examples",
        },
        { theme: "alt", text: "API Example", link: "/api-examples" },
      ],
  }

features:
  [
    {
      icon:
        {
          light: "/icon/vitepress.svg",
          dark: "/icon/vitepress.svg",
          height: "48",
        },
      title: "VitePress",
      link: "./avitepress/",
      linkText: "查看文档",
    },
    {
      icon:
        {
          light: "/icon/opencore.svg",
          dark: "/icon/opencore.svg",
          height: "48",
        },
      title: "OpenCore",
      link: "./aopencore/",
      linkText: "查看文档",
    },
    {
      icon:
        {
          light: "/icon/proxmoxve.svg",
          dark: "/icon/proxmoxve.svg",
          height: "48",
        },
      title: "ProxmoxVE",
      link: "./atruenas/",
      linkText: "查看文档",
    },
    {
      icon:
        { light: "/icon/truenas.svg", dark: "/icon/truenas.svg", height: "48" },
      title: "TrueNAS",
      link: "./atruenas/",
      linkText: "查看文档",
    },
    {
      icon:
        { light: "/icon/docker.svg", dark: "/icon/docker.svg", height: "48" },
      title: "Docker",
      link: "./adocker/",
      linkText: "查看文档",
    },
    {
      icon: { light: "/icon/mysql.svg", dark: "/icon/mysql.svg", height: "48" },
      title: "MySQL",
      link: "./atruenas/",
      linkText: "查看文档",
    },
    {
      icon:
        { light: "/icon/onedev.svg", dark: "/icon/onedev.svg", height: "48" },
      title: "OneDev",
      link: "./aonedev/",
      linkText: "查看文档",
    },
    {
      icon:
        {
          light: "/icon/jellyfin.svg",
          dark: "/icon/jellyfin.svg",
          height: "48",
        },
      title: "Jellyfin",
      link: "./aonedev/",
      linkText: "查看文档",
    },
  ]
---

<script setup lang="ts">
  interface Hero {
  name?: string
  text: string
  tagline?: string
  image?: ThemeableImage
  actions?: HeroAction[]
}

type ThemeableImage =
  | string
  | { src: string; alt?: string }
  | { light: string; dark: string; alt?: string }

interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
}

interface Feature {
  icon?: FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
}

type FeatureIcon =
  | string
  | { src: string; alt?: string; width?: string; height: string }
  | {
      light: string
      dark: string
      alt?: string
      width?: string
      height: string
    }
</script>

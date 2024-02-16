---
layout: home

hero:
  {
    name: "MartinMac",
    text: "MartinMac",
    tagline: "691585101@QQ.com",
    image: "/images/award.png",
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
      icon: { src: "/icons/vp.svg", width: "48", height: "48" },
      title: "VitePress",
      link: "./avitepress/",
      linkText: "查看文档",
    },
    {
      icon: { src: "/icons/oc.svg", width: "48", height: "48" },
      title: "OpenCore",
      link: "./aopencore/",
      linkText: "查看文档",
    },
    {
      icon: { src: "/icons/pve.svg", width: "48", height: "48" },
      title: "ProxmoxVE",
      link: "./alinux/",
      linkText: "查看文档",
    },
    {
      icon: { src: "/icons/tnas.svg", width: "48", height: "48" },
      title: "TrueNAS",
      link: "./alinux/",
      linkText: "查看文档",
    },
    {
      icon: { src: "/icons/dk.svg", width: "48", height: "48" },
      title: "Docker",
      link: "./adocker/",
      linkText: "查看文档",
    },
    {
      icon: { src: "/icons/sql.svg", width: "48", height: "48" },
      title: "MySQL",
      link: "./adocker/",
      linkText: "查看文档",
    },
    {
      icon: { src: "/icons/dev.svg", width: "48", height: "48" },
      title: "OneDev",
      link: "./adocker/",
      linkText: "查看文档",
    },
    {
      icon: { src: "/icons/fin.svg", width: "48", height: "48" },
      title: "Jellyfin",
      link: "./adocker/",
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

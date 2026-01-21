# 站点配置

站点配置是定义站点的全局配置，该配置项无论使用什么主题都会在站点全局生效。
配置文件 `./.vitepress/config`，如果使用 `.ts` 文件则可以使用 ts 语法。

```ts{4-6,11-13}
import { defineConfig } from 'vitepress'

interface defineConfig {
  lang: string // 语言'zh-CN'为中文
  title: string // 标题
  description: string // 站点描述
  ...
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'MartinMac',
  description: '站点描述',
  ...
})
```

## 网站标题

网站的标题是每个浏览器标签页显示的内容。
显示效果如下:
![网站标题](/images/title.png)

### 配置网站标题图标

配置网站标题图标提前放置在项目中的目录 `./public` 中，这里的文件名为 `logo.svg`。

```ts
import { defineConfig } from 'vitepress'

interface defineConfig {
  lang: string // 语言'zh-CN'为中文
  title: string // 标题
  description: string // 站点描述
  head: HeadConfig // [!code focus]
  ...
}

type HeadConfig = // [!code focus:3]
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

export default defineConfig({
  lang: 'zh-CN',
  title: 'MartinMac',
  description: '站点描述',
  head: [ // [!code focus:3]
    ["link", { rel: "icon", href: "/public/logo.svg" }],
  ],
  ...
})
```

### 自定义标题

网站的标题在不配置的情况下会根据路由自动生成标题，例: `站点配置 | MartinMac`，这里的 `MartinMac` 是站点的标题属性 `title`，`站点配置` 是文档的路由标题。

使用以下配置自定义标题:

```ts
import { defineConfig } from 'vitepress'

interface defineConfig {
  lang: string // 语言'zh-CN'为中文
  title: string // 标题
  description: string // 站点描述
  titleTemplate: string // [!code focus]
  ...
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'MartinMac',
  description: '站点描述',
  titleTemplate: '自定义标题', // [!code focus]
  ...
})
```

也可以在自定义标题的任意位置添加路由标题 `:title` :

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: 'MartinMac',
  description: '站点描述',
  titleTemplate: '自定义标题-:title', // [!code focus]
  ...
})
```

将此配置设置为 `false` 关闭自定义标题:

```ts
export default defineConfig({
  lang: 'zh-CN',
  title: 'MartinMac',
  description: '站点描述',
  titleTemplate: false, // [!code focus]
  ...
})
```

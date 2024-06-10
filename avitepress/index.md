# 开始

## 安装

### 先决条件

- 安装并会使用 git
- 安装[Node.js](https://nodejs.org/en)16 或者更新的版本。
- 用于通过命令行访问 Vitepress 的终端(CLI)。
- 支持[Markdown](https://en.wikipedia.org/wiki/Markdown)语法的编辑器。
  - 推荐使用[VSCode](https://code.visualstudio.com/)并且安装[官方的 Vue 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

### 开始部署

使用 VitePress 创建一个项目并发布到 GitHub 或者 GitEE 上面可以在终端执行以下命令:

- 创建项目

  1.  创建文件夹

  ```sh
  mkdir demo
  ```

  2.  进入创建好的文件夹

  ```sh
  cd demo
  ```

- git 版本管理及线上部署

  1.  加入 git

  ```sh
  git init
  ```

  2.  修改 git 主分支名称为 main

  ```sh
  git branch -m main
  ```

  3. 创建 git 忽略目录/文件

     项目根目录创建 `.gitignore` 文件

     编辑 `.gitignore` 文件

     ```
     node_modules
     cache
     ```

- 配置 VitePress

  1.  初始化项目

  ::: code-group

  ```sh[npm]
  npm init
  ```

  ```sh[yarn]
  yarn init
  ```

  ```sh[bun]
  bun init
  ```

  :::

2. 下载 vitepress

::: code-group

```sh[npm]
npm install -D vitepress
```

```sh[yarn]
yarn add -D vitepress
```

```sh[bun]
bun add -D vitepress
```

:::

### 安装向导

VitePress 附带一个命令行设置向导,可以搭建项目的基本框架。安装完成后可以通过运行命令启动:

::: code-group

```sh[npm]
npx vitepress init
```

```sh[yarn]
yarn vitepress init
```

```sh[bun]
bun vitepress init
```

:::

需要填写的配置项及说明:

```json
Welcome to VitePress!

Where should VitePress initialize the config? // 项目相对根目录(demo)的位置
./ // 根目录或者 ./docs:<demo>/docs

Site title:
My Awesome Project // 网站标题

Site description:
A VitePress Site // 网站描述

Theme:
 [ ] Default Theme // 默认主题
 [*] Default Theme + Customization// 默认主题+自定义扩展
 [ ] Custom Theme // 自定义主题:创建项目后需要完全自定义

Use TypeScript for config and theme files?
Yes // 使用ts

Add VitePress npm scripts to package.json?
Yes // 将启动、编译命令添加到 package.json 必须！！！

Done! Now run npm run docs:dev and start writing.
// 运行 npm run docs:dev 可以在本地开发环境下实时预览项目
```

::: tip 提示
Theme 主题有前端基础建议选择第二项不仅有基础主题还自动创建自定义的配置文件,没有前端基础建议选择第一项,只用默认主题就好了,专注于文档本身。

由于第三项完全自定义不带任何主题样式需要大量的自定义配置与文档输出的本意背道而驰,不管是有没有前端基础都不建议选择第三项。

Theme 选择第一项后如果需要自定义修改主题也可以自主创建相关文件。
:::

## 文件结构

如果如示例中一样构建独立的 VitePress 站点,则所有文件处于项目的**根目录**(`./`)。
否则项目可能存在于**嵌套目录**中(例: `./docs`)。

示例中独立的 VitePress 站点生成的文件结构如下:

```json
./
├─ .vitepress // 存放配置文件、开发服务器缓存、构建输出、自定义主题位置
│  ├─ config.mts // 后缀名可能是 .js .ts .mjs .mts
│  ├─ theme // 主题文件
│  ├─ dist // 构建输出文件夹
│  └─ cache // 开发服务器缓存文件夹
├─ api-examples.md // 示例 api
├─ markdown-examples.md // 示例 文档
├─ index.md // 主页
├─ .gitignore
├─ node_modules
├─ package.json
└─ package-lock.json
```

## 启动并运行开发服务器

在运行安装向导的时候`Add VitePress npm scripts to package.json?`这一项选择`Yes`那么在`./package.json`应该有以下脚本:

```json{4-8}
// ./package.json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  },
  ...
}
```

在**终端**中运行脚本可以开启实时热更新的本地开发服务器。使用以下命令启动:
::: code-group

```sh [npm]
npm run docs:dev
```

```sh [yarn]
yarn docs:dev
```

```sh [bun]
bun run docs:dev
```

:::

除了 npm 脚本，还可以直接调用 VitePress：
::: code-group

```sh [npm]
npx vitepress dev docs
```

```sh [yarn]
yarn vitepress dev docs
```

```sh [bun]
bun vitepress dev docs
```

:::

开发服务器地址`http://localhost:5173`。打开浏览器输入以上 URL 查看网站实时状况。

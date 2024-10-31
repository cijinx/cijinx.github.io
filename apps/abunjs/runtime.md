# Bun 运行项目

## 运行单个 js 文件

使用 `bun run` 运行一个 `index.js` 文件：
```sh
bun run index.js
```

单独的 `bun` 命令相当于 `bun run` 命令：
```sh
bun index.js
```
在监视模式下运行文件，使用 `--watch` 标志：
```sh
bun --watch run index.js
```

在内存小的平台上，使用 `--smol` 标志可以降低内存的使用，但会降低性能：
```sh
bun --smol run index.js
```

## 运行 `package.json` 脚本

在一个前端项目中通常会有 `package.json` 文件， 通常在此文件中会通过 `scripts` 定义的shell命令。例如：
```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview --port=8080"
  }
  // ...其他字段
}
```

使用 `bun <script>` 来执行这些脚本：
```shell
bun docs:dev
```
:::info 注
如果 `package.json` 定义的脚本与内置的 `bun` 命令（`install`、`dev`、`upgrade`等）之间存在冲突，Bun会优先执行内置命令。此时可以用更加明确的 `bun run` 命令来执行 `package.json` 中定义的脚本：
```shell
bun run docs:dev
```
:::

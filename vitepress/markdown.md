# Markdown 语法

## 标准 Markdown 语法

> Markdown 是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与 HTML 混编，可导出 HTML、PDF 以及本身的 `.md` 格式的文件。因简洁、高效、易读、易写，Markdown 被大量使用。

[Markdown 语法速查表](https://markdown.com.cn/cheat-sheet.html)

## Markdown 扩展 {#anchor}

VitePress 扩展了 Markdown 语法的内容。

## 标题锚点

文档内的标题会自动生成锚点连接这有助于快速定位到页面内的内容。VitePress 文档支持自定义锚点名称，方法是在标题中添加后缀:

```md
# 标题 {#anchor}
```

想要在本页面内快速定位到锚点与普通跳转的方法相同`[快速定位到锚点](#anchor)`

快速定位到锚点的最佳实践就是默认主题右侧的目录列表。

## 链接

内部链接和外部链接都会进行特殊处理

### 内部链接

内部链接会转换为路由链路，用于单页面应用(SPA)导航。每个目录及其中包含的内容都将自动转换，并将转换好的路由添加到网站网址之后，例如:https://martinmac.gitee.io/avitepress/
(其中 `https://martinmac.gitee.io` 为网站地址，`/avitepress/index` 为路由)。

### 外部链接

外部链接将会在新窗口打开，编译为 HTML 中的`<a target="_blank">`标签。

## YAML 格式化配置项

在`.md`文档中支持`yaml`语法快速配置自定义主题相关配置。配置方法使用两组三个短横线隔离开一个区域:

```yaml
---
title: "Blogging Title"
lang: "zh-CN"
---
```

## GitHub 样式表格

输入:

```md
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

输出:

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Emoji 表情

输入:

```md
:tada: :100:
```

输出:

:tada: :100:

Emoji 表情列表查看[点击此处](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## 目录

输入:

```md
[[toc]]
```

输出:

[[toc]]

## 提示框

输入:

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

输出:

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

还可以在定义完提示框类型后自定义提示框的内容。

输入:

```md
::: tip 自定义提示
This is a tip.
:::
```

输出:

::: tip 自定义提示
This is a tip.
:::

## 代码块

Vitepress 使用 [Shiki](https://shiki.matsu.io/) 的定义在 Markdown 中个性化彩色显示代码块。Shiki 支持多种编程语言。只需要将支持的编程别名附加到代码块开头的反引号之后:

输入:

````
```js
funtion a(){
  console.log('test')
}
```
````

输出:

```js
funtion a(){
  console.log('test')
}
```

Shiki 库中的代码块支持格式列表:[点击查看](https://github.com/shikijs/shiki/blob/main/docs/languages.md)

### 代码块突出显示

输入:

````
```js{2}
funtion a(){
  console.log('test')
}
```
````

输出:

```js{2}
funtion a(){
  console.log('test')
}
```

在需要突出显示的行中添加注释 `// [!code hl]` 也可以突出显示。

输入:

````
```js
funtion a(){
  console.log('test') // [!code  hl]
}
```
````

输出:

```js
funtion a(){
  console.log('test') // [!code hl]
}
```

除了单行之外，还可以指定多个单行和/或范围:

- 突出范围:`{2-8}`
- 突出显示多行:`{2,6,8}`
- 突出显示范围和多行:`{2,6,8-10}`

### 代码块聚焦显示

在代码块中添加注释 `// [!code focus]` 将会聚焦此行并模糊代码块的其他部分。

输入:

````
```js
funtion a(){
  console.log('test') // [!code  focus]
}
```
````

输出:

```js
funtion a(){
  console.log('test') // [!code focus]
}
```

在代码块中添加注释 `// [!code focus:<lines>]` 将会聚焦多行并模糊代码块的其他部分。

输入:

````
```js
funtion a(){
  console.log('test') // [!code  focus:2]
  console.log('test')
}
```
````

输出:

```js
funtion a(){
  console.log('test') // [!code focus:2]
  console.log('test')
}
```

### 代码块中的色彩差异

在代码块中的一行添加注释 `// [!code --]` `// [!code ++]`将创建该行的差异。

输入:

````
```js
funtion a(){
  console.log('Removed') // [!code  --]
  console.log('Added') // [!code  ++]
}
```
````

输出:

```js
funtion a(){
  console.log('Removed') // [!code --]
  console.log('Added') // [!code ++]
}
```

### 代码块中的错误和警告

在代码块中的一行添加注释 `// [!code warning]` `// [!code error]`将创建该行的错误或警告。

输入:

````
```js
funtion a(){
  console.log('Warning') // [!code  warning]
  console.log('Error') // [!code  error]
}
```
````

输出:

```js
funtion a(){
  console.log('Warning') // [!code warning]
  console.log('Error') // [!code error]
}
```

### 代码组

将多个代码块分组显示。

输入:

````
::: code-group
```sh [yarn]
yarn add -D vitepress
```
```sh [npm]
npm install -D vitepress
```
:::
````

输出:

::: code-group

```sh [yarn]
yarn add -D vitepress
```

```sh [npm]
npm install -D vitepress
```

:::

### 代码块行号的显示/隐藏

打开 VitePress 配置文件 `./.vitepress/config.ts` 可以全局配置显示/隐藏代码块行号。

```ts{3-5}
export default defineConfig({
  ...
  markdown: {
    lineNumbers: false/true
  },
  ...
})
```

也可以在每个代码块中配置 `:line-numbers` :显示行号 `:no-line-numbers` :隐藏行号 以覆盖全局配置。

输入:

````
```js:line-numbers
// 显示行号
funtion a(){
  console.log('test')
}
```
````

输出:

```js:line-numbers
// 显示行号
funtion a(){
  console.log('test')
}
```

输入:

````
```js:no-line-numbers
// 隐藏行号
funtion a(){
  console.log('test')
}
```
````

输出:

```js:no-line-numbers
// 隐藏行号
funtion a(){
  console.log('test')
}
```

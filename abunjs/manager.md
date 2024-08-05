# Bun 包管理

## 安装所有依赖项

`bun install`

在已有到的项目中改为使用 bun 管理项目的依赖项使用此命令安装所有依赖项：

```shell
bun install
```

使用 bun 管理项目并创建兼容 yarn 的锁定文件：

```shell
bun install -y
```

:::info 注
使用 bun 管理项目 会在项目的根目录下创建一个 `bun.lockb` 的二进制文件。加上原本的兼容 node 的 `package.json` 文件共同构成项目的依赖信息。

而如果创建了兼容 yarn 的锁定文件，则会额外创建 `yarn.lock` 文件。

如果项目不再使用 npm 管理依赖项，可以删除项目根目录存在的 `package-lock.json` 文件。
:::

## 安装特定依赖项带参数

以生产模式安装（即不包括 `devDependencies`）

```shell
bun install --production
```

使用可重现的依赖关系安装 `--frozen-lockfile` 。使用此命令如果 `bun.lockb` 与 `package.json` 不一致，bun 将会退出并显示错误消息。这对于生产构建和CI环境非常有用。

```shell
bun install --frozen-lockfile
```

## 添加依赖项

为项目添加特定的依赖包，以下命令以 `vue` 为例。

为项目添加 `vue` 依赖项：

```shell
bun add vue
```

指定 `vue` 的版本、版本范围、标签：

```shell
bun add vue@3.4.0
bun add vue@^3.0.0
bun add vue@latest
```

将 `vue` 包添加为开发依赖项（`"devDependencies"`）：

```shell
bun add --dev vue
bun add -d vue
```

将 `vue` 包添加为可选依赖项（`"optionalDependencies"`）：

```shell
bun add --optional vue
```

将  `vue` 包添加并固定到解析的版本。相当于 `bun add vue@3.4.0` 命令，但是未添加之前不知道版本号：

```shell
bun add vue --exact
```

::: info 注
使用此命令将在项目的 `package.json` 文件中添加以下内容：
```json
{
  "dependencies": {
    // 不使用 --exact
    "vue": "^3.4.0", // 这匹配 >= 3.2.0 < 4.0.0

    // 使用 --exact
    "vue": "3.4.0" // 这只匹配 3.4.0
  }
}
```
:::

## 全局添加依赖项

全局添加特定的依赖包，以下命令以 `vue` 为例。

```shell
bun add --global vue
bun add -g vue
```

## 移除依赖项

移除特定的依赖包，以下命令以 `vue` 为例。

```shell
bun remove vue
```
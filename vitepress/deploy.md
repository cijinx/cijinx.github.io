# 部署 VitePress 网站

## 说明

以下配置基于示例项目的文件结构,如果实际项目的文件结构不同请按照实际项目配置:

- VitePress 站点项目位于根目录中(`./`)。
- (`./.vitepress/dist`)是默认的构建输出目录。
- 在运行安装向导的时候`Add VitePress npm scripts to package.json?`这一项已经选择`Yes`并且在`./package.json`有以下脚本:

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

## 在本地构建和测试

1. 在终端中运行以下命令构建站点:

```sh
npm run docs:build
```

2. 在终端中运行以下命令在本地预览:

```sh
npm run docs:preview
```

该命令将在本地启动一个静态 Web 服务器并将(`./.vitepress/dist`)中的文件提供给静态 Web 服务器。打开浏览器输入`http://localhost:4173`浏览构建的站点确保推送到生产环境之前一切正常。

3. 通过修改`./package.json`文件传递参数给本地静态 Web 服务器:

```json{7}
// ./package.json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview  --port=8080" // 传递参数
  },
  ...
}
```

此时运行`npm run docs:preview`浏览器访问`http://localhost:8080`即可预览构建站点。

## 部署到 GitHub

## 部署到 GitEE

[注册 GitEE 账号](https://gitee.com/)

创建与账号同名项目

下载[sourcetree](https://www.sourcetreeapp.com/)

构建站点

上传项目

启动 Gitee Pages

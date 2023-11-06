# Python 学习文档

## 环境配置

1.安装 Python3 最新版:

```sh
brew install python3
```

使用 HomeBrew 安装的软件位于 `/usr/local/Cellar/` 目录下，记住此路径。

2.配置 Python3 环境变量:

编辑 `.zshrc` 文件，该文件位于用户根目录。

```sh
vim ~/.zshrc
```

添加以下内容：

```
alias python3='/usr/local/Cellar/python@3.12/3.12.0/bin/python3.12'
alias python=python3
```

刷新 `.zshrc` 文件：

```sh
source ~/.zshrc
```

环境配置成功。

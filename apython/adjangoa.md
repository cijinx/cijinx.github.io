# 安装 Django 库

## 安装 pipx 开发环境

pipx 开发环境作为全局的开发环境代替 python + pip 。

1. 安装 pipx 工具:

```
brew install pipx
```

2. 检查 pipx 安装:

```
pipx --version
```

## 安装配置 poetry 虚拟环境及模块管理工具

1. 安装 poetry 虚拟环境管理与模块安装管理工具:

```
pipx install poetry
```

2. 检查 poetry 安装:

```
poetry --version
```

3. 更改 poetry 配置，将项目模块存储在项目根文件夹的 `.venv` 中:

```
poetry config virtualenvs.in-project true
```

## 创建 Django 项目

1. 创建项目根文件夹:

```
mkdir PySiteServer
```

2. 进入项目目录:

```
cd PySiteServer
```

3. 使用 poetry 初始化项目:

```
poetry init
```

4. 使用此虚拟环境:

```
poetry env use python
```

5. 使用 poetry 安装 django 模块库:

```
poetry add django
```

::: details 更多
poetry 其他模块管理命令:

- 卸载已安装模块

```
poetry remove django
```

- 安装开发环境使用的模块

  在开发环境中需要用到的一些模块部署时并不需要就可以安装在开发环境中

  例如:black

```
poetry add black --group dev
```

- 卸载开发模块

```
poetry remove black -D
```

- 更新全部模块

```
poetry update
```

- 更新指定模块

```
poetry update django
```

:::

6. 查看已安装模块:

```
poetry show
```

```
poetry show --tree
```

7. 导出虚拟环境模块配置文件

在开发环境中不需要此命令，此处导出的 `requirements.txt` 文件是为了在部署时使用。

```
poetry export -f requirements.txt -o requirements.txt --without-hashes
```

::: tip

- 命令行进入虚拟环境

```
poetry shell
```

- 命令行退出虚拟环境

```
exit
```

:::

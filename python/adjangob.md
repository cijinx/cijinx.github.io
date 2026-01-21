# 创建 Django 项目

## 准备

::: tip

使用终端进入虚拟环境可以在终端中快速的创建 Django 项目。

- 使用终端进入虚拟环境

```
poetry shell
```

- 使用终端退出虚拟环境

```
exit
```

:::

## 创建项目

通过终端的命令提示符判断是否处于虚拟环境中。

正常的终端命令提示符类似这样 `user@localhost <dir>` ，其中 `user` 是此时使用终端的用户，`localhost` 是设备名, `<dir>` 是此时所处的路径类似 `/` 。

虚拟环境的终端命令提示符则类似这样 `(pysiteserver-py3.11) user@localhost <dir>` ，多出来的 `(pysiteserver-py3.11)` 就是此时所处在的虚拟环境。

1. 进入虚拟环境并确认此时终端处于项目的根目录:

```
poetry shell
```

查看命令提示符是否类似 `(pysiteserver-py3.11) user@localhost PySiteServer` 此时命令提示符所在的路径就是 `PySiteServer` 项目根目录。

2. 创建项目:

```
django-admin startproject siteserver
```

3. 在 PyCharm 中打开项目。

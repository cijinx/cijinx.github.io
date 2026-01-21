# Django 项目中安装数据库驱动模块

## 数据库配置

Django 项目的默认数据库配置使用 SQLite 作为默认数据库。如果你不熟悉数据库，或者只是想尝试下 Django，这是最简单的选择。Python 内置 SQLite，所以无需安装额外的模块使用它。创建一个真正的项目时可能更倾向使用更具扩展性的数据库，例如 PostgreSQL、MySQL，避免中途切换数据库这个令人头疼的问题。

接下来的文档中需要用到 Django 的数据库 API 功能，首先需要确保有一个数据库服务正在运行中。Django 支持许多不同的数据库服务器，官方支持 PostgreSQL、MySQL、MariaDB、Oracle、SQLite。

除了运行中的数据库，还需要安装 Python 数据库驱动模块。

- 如果数据库使用的是 MySQL 或 MariaDB 需要安装 `mysqlclient` 模块

- 如果数据库使用的是 PostgreSQL 需要安装 `psycopg` 或 `psycopg2` 模块

## 安装 `mysqlclient` 模块

如果数据库是 MySQL 或 MariaDB 推荐安装 `mysqlclient`。

#### macOS

1. 在本地环境中安装 `mysql`,`mysql-client`,`pkg-config`并导出

```sh
brew install mysql mysql-client pkg-config
```

```sh
export PKG_CONFIG_PATH="/user/local/Cellar/mysql-client/8.1.0/lib/pkgconfig"
```

2. 虚拟环境安装 `mysqlclient`

```
poetry add mysqlclient
```

[参考链接](https://pypi.org/project/mysqlclient/)

## 安装 `psycopg` 模块

如果数据库是 PostgreSQL 需要安装 `psycopg` 模块。

[参考链接](https://www.psycopg.org/psycopg3/docs/basic/install.html)

# MySQL 数据库

MySQL 是全球最受欢迎的开源数据库。凭借其经过验证的性能、可靠性和易用性，MySQL 已成为基于 Web 的应用程序的首选数据库，涵盖了从个人项目和网站，到电子商务和信息服务的整个范围，包括 Facebook、Twitter、YouTube、Yahoo！等众多知名 Web 网站。

## 相关链接

[官方网站](https://www.mysql.com/)

## 相关说明

## 镜像下载

### 一. 官方镜像下载

```sh
docker pull mysql:latest
```

### 二. 国内备份镜像下载

## 服务部署

### 一. cli 命令部署

1.1 创建一个简单的 MySQL 实例：

```sh
docker run -d -p 3306:3306 \
  --name some-mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  mysql:latest
```

1.2 数据持久化：

在 MySQL 容器实例中 MySQL 默认将数据写入`/var/lib/mysql`目录，将此目录挂载为主机目录持久化存储数据。删除容器不丢失数据。

```sh
docker run -d -p 3306:3306 \
  --name some-mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -v mysql-data:/var/lib/mysql \
  mysql:latest
```

1.3 传递配置项：

创建 MySQL 容器实例时可以传递许多配置项，例如：将所有表的默认编码和校对更改为 UTF-8 `utf8mb4`，使用：

```sh
docker run -d -p 3306:3306 \
  --name some-mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  --character-set-server=utf8mb4 \
  --collation-server=utf8mb4_unicode_ci \
  mysql:latest
```

如果想要查看完整配置列表，只需运行：

```sh
docker run -it --rm mysql:tag --verbose --help
```

### 二. docker-compose 部署

## 其他

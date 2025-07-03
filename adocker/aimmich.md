![award](/images/immich.svg)

# immich 高性能自托管照片和视频管理解决方案

::: danger 提示

本文档基于开源项目 immich 的安装部署的说明文档，基于本文档部署服务造成的一切损失与文档作者无关，请**了解风险**后阅读本文档。

> **官方免责声明:**
>
> 1. 该项目正在非常积极地开发中。
> 2. 预计会出现 bug 和重大更改。
> 3. 请勿将该应用程序用作存储照片和视频的唯一方式。
> 4. 始终遵循 [3-2-1](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/) 备份计划来保存您珍贵的照片和视频！

:::

## immich 安装部署

::: danger 提示
Docker 镜像地址下载请使用**魔法网络**，相关方法请自行探索。

如果您充分相信作者，也可以使用作者提供的镜像备份。
:::

[官方开源地址](https://github.com/immich-app/immich)

## 镜像下载

::: tip 提示
**硬件和软件要求：**

1. Linux 操作系统（Ubuntu、Debian 等）、Mac 支持 Docker Desktop 的 macOS 系统
2. Docker
3. Docker Compose

作者在网络上搜索大量的教程、文档、博客都没有提前下载镜像的步骤，这会在安装部署时因为镜像下载问题导致进度缓慢或者部署不成功。强烈建议先把需要的镜像下载到本地再部署。
:::

#### 1. 官方地址镜像下载地址：

immich-server 下载

```sh
docker pull ghcr.io/immich-app/immich-server:release
```

immich-machine-learning 下载

```sh
docker pull ghcr.io/immich-app/immich-machine-learning:release
```

~~redis 下载~~

```sh
docker pull redis:6.2
```

~~Post­greSQL 下载~~

```sh
docker pull tensorchord/pgvecto-rs:pg14-v0.2.0
```

#### 2. 阿里云备份镜像下载地址：

immich-server 2024/10/12 备份官方 v1.117.0 版 下载

```sh
docker pull registry.cn-shanghai.aliyuncs.com/martinmac/immich-server:v1.117.0
```

immich-machine-learning 2024/10/12 备份官方 v1.117.0 版 下载

```sh
docker pull registry.cn-shanghai.aliyuncs.com/martinmac/immich-machine-learning:v1.117.0
```

redis 2024/10/12 备份官方 6.2 版 下载

```sh
docker pull registry.cn-shanghai.aliyuncs.com/martinmac/redis:6.2
```

Post­greSQL 2024/10/12 备份官方 pg14-v0.2.0 版 下载

```sh
docker pull registry.cn-shanghai.aliyuncs.com/martinmac/pgvecto-rs:pg14-v0.2.0
```

## immich 服务部署

::: tip 提示
**硬件和软件要求：**

1. Linux 操作系统（Ubuntu、Debian 等）、Mac 支持 Docker Desktop 的 macOS 系统
2. Docker
3. Docker Compose
4. immich-server、immich-machine-learning、redis、pgvecto-rs 四个 Docker 镜像

Docker Compose 是官方推荐的部署 immich 的方法，本文档也使用此方法。
:::

#### 创建 Docker Compose 文件

1. 创建 immich 文件夹并打开：

```sh
mkdir immich
cd immich
```

2. 创建并编辑`docker-compose.yml`文件：

```sh
vim docker-compose.yml
```

`docker-compose.yml`内容：

```yml
services:
  # immich 主服务
  immich-server:
    container_name: immich-server
    # 镜像名请根据下载的Docker镜像名称修改
    image: immich/immich-server:v1.117.0
    # 如果有GPU硬件加速请使用下面两行
    # devices:
    #   - /dev/dri:/dev/dri
    volumes:
      - ${UPLOAD_LOCATION}:/usr/src/app/upload
      - /etc/localtime:/etc/localtime:ro
    env_file:
      - .env
    ports:
      - 2283:3001
    depends_on:
      - redis
      - database
    restart: always
    healthcheck:
      disable: false

  immich-machine-learning:
    container_name: immich-machine-learning
    # 镜像名请根据下载的Docker镜像名称修改
    image: immich/immich-machine-learning:v1.117.0
    # 如果有GPU硬件加速请使用下面两行
    # devices:
    #   - /dev/dri:/dev/dri
    volumes:
      # 大模型缓存文件挂载到本地目录，此处示例为本地`/DATA/Mac/AppData/immich/model-cache`目录
      - /DATA/Mac/AppData/immich/model-cache:/cache
    env_file:
      - .env
    restart: always
    healthcheck:
      disable: false

  redis:
    container_name: immich-redis
    # 镜像名请根据下载的Docker镜像名称修改
    image: redis:6.2
    healthcheck:
      test: redis-cli ping || exit 1
    restart: always

  database:
    container_name: immich-postgres
    # 镜像名请根据下载的Docker镜像名称修改
    image: tensorchord/pgvecto-rs:pg14-v0.2.0
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_DB: ${DB_DATABASE_NAME}
      POSTGRES_INITDB_ARGS: "--data-checksums"
    volumes:
      - ${DB_DATA_LOCATION}:/var/lib/postgresql/data
    healthcheck:
      test: pg_isready --dbname='${DB_DATABASE_NAME}' --username='${DB_USERNAME}' || exit 1; Chksum="$$(psql --dbname='${DB_DATABASE_NAME}' --username='${DB_USERNAME}' --tuples-only --no-align --command='SELECT COALESCE(SUM(checksum_failures), 0) FROM pg_stat_database')"; echo "checksum failure count is $$Chksum"; [ "$$Chksum" = '0' ] || exit 1
      interval: 5m
      start_interval: 30s
      start_period: 5m
    command:
      [
        "postgres",
        "-c",
        "shared_preload_libraries=vectors.so",
        "-c",
        'search_path="$$user", public, vectors',
        "-c",
        "logging_collector=on",
        "-c",
        "max_wal_size=2GB",
        "-c",
        "shared_buffers=512MB",
        "-c",
        "wal_compression=on",
      ]
    restart: always
```

3. 创建并编辑`.env`文件：

```sh
vim .env
```

`.env`内容：

```yml
# 相册挂载路径
UPLOAD_LOCATION=/DATA/Max/Gallery/immich
# 数据库挂载路径
DB_DATA_LOCATION=/DATA/Mac/AppData/immich/postgres
# 时区设置
TZ=Asia/Shanghai
# immich版本号
IMMICH_VERSION=v1.117.0
# 数据库密码
DB_PASSWORD=postgres
# 数据库账号
DB_USERNAME=postgres
# 数据库表名称
DB_DATABASE_NAME=immich
```

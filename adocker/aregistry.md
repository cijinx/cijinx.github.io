# Docker Registry 私有的 Docker 镜像仓库

Docker Registry 是存储和分发 Docker 镜像的服务。Docker 镜像仓库可以存储和分发各种 Docker 镜像，包括官方镜像和用户自定义镜像。Docker Registry 还支持镜像的版本控制和标签，可以方便地管理和使用镜像。

## Registry 官方链接

[官方部署文档](https://distribution.github.io/distribution/about/deploying/)

[官方镜像地址](https://hub.docker.com/_/registry)

<!-- ## 相关说明 -->

## Registry 镜像下载

### 一. 官方镜像下载

registry 最新镜像下载

```bash
docker pull registry:latest
```

registry:2.8.2 镜像下载

```bash
docker pull registry:2.8.2
```

### 二. 国内备份镜像下载

## Registry 服务部署

### 一. cli 命令部署

- 启动简单的 registry 容器

```bash
$ docker run -d -p 5000:5000 --name registry registry:latest
```

- 开启 registry 容器自启动功能。
  添加 `--restart=always` 参数，表示 registry 容器在 Docker 重启或者退出后会跟随自动重启。

```bash
docker run -d \
 -p 5000:5000 \
 --restart=always \
 --name registry \
 registry:latest
```

- 自定义存储本机存储位置。
  添加 `-v /path/to/registry:/var/lib/registry` 参数，将 registry 容器内的 `/var/lib/registry` 目录映射到本机的 `/path/to/registry` 目录。

```bash
docker run -d \
 -p 5000:5000 \
 -v /path/to/registry:/var/lib/registry \
 --restart=always \
 --name registry \
 registry:latest
```

- 部署 registry 容器，允许删除镜像。

```bash
docker run -d \
 -p 5000:5000 \
 -e REGISTRY_STORAGE_DELETE_ENABLED=true \
 --restart=always \
 --name registry \
 registry:latest
```

- 更改 registry 容器内的监听端口。
  如果想要更改容器内的监听端口，可以使用 `-e REGISTRY_HTTP_ADDR=0.0.0.0:5001` 参数，将 registry 容器内的监听端口更改为 5001。

```bash
docker run -d \
  -e REGISTRY_HTTP_ADDR=0.0.0.0:5001 \
  -p 5001:5001 \
  --name registry-test \
  registry:2
```

- 创建一个带有基本的身份验证的 registry 容器。
  registry 容器默认是公开的，任何人都可以访问。为了保护镜像的安全，可以使用基本的身份验证来限制访问。可以使用 htpasswd 命令来创建一个用户名和密码的文件，然后将该文件挂载到容器中。

1. 创建一个 htpasswd 文件，其中包含用户名和密码。
   示例中使用了用户名 `username` 和密码 `password`。

```bash
docker pull httpd:latest
mkdir auth
docker run \
  --entrypoint htpasswd \
  httpd:latest -Bbn username password > auth/htpasswd
```

2. 创建一个带有身份验证的 registry 容器，并将 htpasswd 文件挂载到容器中。

```bash
docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v /path/to/registry/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  registry:latest
```

### 二. docker-compose 部署

使用 docker-compose 部署 registry 容器，可以方便地管理和扩展 registry 服务。

1. 创建一个名为 docker-compose.yml 的文件，并在其中添加以下内容：

```yaml
services:
  registry:
    container_name: registry
    image: registry:latest
    restart: always
    volumes:
      - /path/to/registry/data/registry:/var/lib/registry # 存储目录挂载
      - /path/to/registry/auth:/auth # 身份验证
    environment:
      - REGISTRY_AUTH=htpasswd # 身份验证
      - REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd # 身份验证
      - REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm # 身份验证
      - REGISTRY_STORAGE_DELETE_ENABLED=true # 允许删除镜像
    ports:
      - "5000:5000"
```

## 其他

////

## 使用 httpd 创建基本身份验证

1. 拉取 httpd 镜像

```bash
docker pull httpd:2.4.62
```

2. 生成密码文件

```bash
docker run \
  --entrypoint htpasswd \
  httpd:2.4.62 -Bbn [user] [password] > auth/htpasswd
```

请将`[user]`和`[password]`替换为实际的用户名和密码。

## 创建 Docker Compose 文件

要创建一个 Docker Compose 文件，可以按照以下步骤进行操作：

1. 创建一个名为 docker-compose.yml 的文件。

2. 在 docker-compose.yml 文件中添加以下内容：

```sh
docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v /Users/martin/Documents/AppData/registry/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
  registry:2.8.2
```

   <!-- ```yaml
   services:
     registry:
       image: registry
       ports:
         - "5000:5000"
       volumes:
         - ./data:/var/lib/registry
   ``` -->

```yaml
services:
  registry:
    container_name: registry
    image: registry:2.8.2
    restart: always
    ports:
      - "5000:5000"
    volumes:
      - /Users/martin/Documents/AppData/registry/data/registry:/var/lib/registry
      - /Users/martin/Documents/AppData/registry/auth:/auth
    environment:
      - REGISTRY_AUTH=htpasswd
      - REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd
      - REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm
      - REGISTRY_STORAGE_DELETE_ENABLED=true

  browser:
    container_name: browser
    image: klausmeyer/docker-registry-browser:1.7.4
    restart: always
    ports:
      - "8280:8080"
    environment:
      - DOCKER_REGISTRY_URL=http://10.0.0.2:5000/v2
      - ENABLE_DELETE_IMAGES=true
    depends_on:
      - registry
```

## Docker Registry 的安装和配置

Docker Registry 可以使用 Docker 官方提供的 Docker Registry 镜像来安装和配置。以下是在 Ubuntu 上安装和配置 Docker Registry 的步骤：

1. 安装 Docker

   ```
   sudo apt-get update
   sudo apt-get install docker.io
   ```

2. 下载 Docker Registry 镜像

   ```
   docker pull registry
   ```

3. 运行 Docker Registry 容器

   ```
   docker run -d -p 5000:5000 --restart=always --name registry registry
   ```

   这将在本地的 5000 端口上运行 Docker Registry 容器，并将其命名为 registry。

4. 配置 Docker Registry

   Docker Registry 的配置文件位于 /etc/docker/registry/config.yml。可以使用以下命令编辑配置文件：

   ```
   sudo nano /etc/docker/registry/config.yml
   ```

   在配置文件中，可以设置 Docker Registry 的存储路径、认证方式、镜像仓库的访问权限等。

5. 重启 Docker Registry

   ```
   docker restart registry
   ```

## Docker Registry 的使用

使用 Docker Registry 需要使用 Docker 命令行工具。以下是一些常用的 Docker Registry 命令：

1. 登录 Docker Registry

   ```
   docker login <registry-url>
   ```

   这将提示输入用户名和密码，用于登录 Docker Registry。

2. 上传镜像到 Docker Registry

   ```bash
   docker tag <image-name> <registry-url>/<repository-name>:<tag>
   docker push <registry-url>/<repository-name>:<tag>
   ```

   这将把本地的镜像上传到 Docker Registry，并指定镜像的仓库名和标签。

3. 从 Docker Registry 下载镜像

   ```
   docker pull <registry-url>/<repository-name>:<tag>
   ```

   这将从 Docker Registry 下载指定的镜像。

4. 删除 Docker Registry 中的镜像

   ```
   docker rmi <registry-url>/<repository-name>:<tag>
   ```

   这将删除 Docker Registry 中的指定镜像。

## Docker Registry 的安全性

Docker Registry 的安全性非常重要，因为它存储了所有的 Docker 镜像。以下是一些提高 Docker Registry 安全性的建议：

1. 使用 HTTPS

   Docker Registry 支持使用 HTTPS 协议进行通信，这可以确保通信的安全性。可以使用 Let's Encrypt 等证书颁发机构来获取免费的 SSL 证书。

2. 使用认证

   Docker Registry 支持使用认证来保护镜像的访问权限。可以使用 Docker Registry 的认证插件来实现认证功能。

3. 使用镜像签名

   Docker Registry 支持使用镜像签名来验证镜像的完整性和来源。可以使用 Docker Content Trust 来实现镜像签名功能。

4. 定期更新 Docker Registry

   定期更新 Docker Registry 可以修复已知的安全漏洞，提高 Docker Registry 的安全性。

## Docker Registry 的备份和恢复

Docker Registry 的备份和恢复非常重要，因为它存储了所有的 Docker 镜像。以下是一些备份和恢复 Docker Registry 的建议：

1. 备份 Docker Registry 数据

   Docker Registry 的数据存储在文件系统中，可以使用以下命令备份 Docker Registry 数据：

   ```
   sudo tar -cvzf registry-data.tar.gz /var/lib/registry
   ```

   这将把 Docker Registry 的数据压缩成一个 tar.gz 文件。

2. 恢复 Docker Registry 数据

   如果 Docker Registry 数据丢失或损坏，可以使用以下命令恢复 Docker Registry 数据：

   ```
   sudo tar -xvzf registry-data.tar.gz -C /var/lib/registry
   ```

   这将把备份的 Docker Registry 数据解压到 /var/lib/registry 目录中。

3. 使用 Docker Registry 的备份和恢复功能  
   Docker Registry 支持使用备份和恢复功能来备份和恢复 Docker Registry 数据。可以使用以下命令备份 Docker Registry 数据：

   ```
   docker run -d --name registry-backup --restart=always -v /var/lib/registry:/var/lib/registry -v /backup:/backup registry:2.7 backup
   ```

   这将在后台运行一个 Docker 容器，用于备份 Docker Registry 数据。备份的数据将存储在 /backup 目录中。

   如果需要恢复 Docker Registry 数据，可以使用以下命令：

   ```bash
   docker run -d --name registry-restore --restart=always -v /var/lib/registry:/var/lib/registry -v /backup:/backup registry:2.7 restore
   ```

   这将在后台运行一个 Docker 容器，用于恢复 Docker Registry 数据。恢复的数据将存储在 /var/lib/registry 目录中。

以上是 Docker Registry 的安装、配置、使用、安全性、备份和恢复的介绍。希望对你有所帮助。

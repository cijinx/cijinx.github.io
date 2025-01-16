![award](/images/portainer.svg)

# Portainer 通用的容器管理平台

[官方开源地址](https://hub.docker.com/r/portainer/portainer-ce)

#### 1. 官方地址镜像下载地址：

portainer-ce 下载

```sh
docker pull portainer/portainer-ce:2.25.1
```

## Portainer 服务部署

```sh
docker run -d -p 8000:8000 -p 9000:9000 \
  --name portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /Users/martin/Documents/AppData/portainer/data:/data \
  portainer/portainer-ce:2.25.1
```

`docker-compose.yml`文件：

```yaml
service:
  portainer:
    container_name: portainer
    image: portainer/portainer-ce:2.25.1
    restart: always
    ports:
      - 9000:9000
      - 8000:8000
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /Users/martin/Documents/AppData/portainer/data:/data
    environment:
      - TZ=Asia/Shanghai
```

## 启动

```sh
docker compose up -d
```

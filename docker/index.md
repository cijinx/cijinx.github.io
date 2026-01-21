# Docker

## Docker 安装

#### 普通环境安装

[参考链接](https://docs.docker.com/get-started/get-docker/)

通过官网的文档可以很简单的在 Windows、macOS、Linux 系统中安装 Docker 图形化界面或者单独安装 Docker 引擎。

#### NAS 环境安装

NAS 环境更推荐的安装方式是 CasaOS[参考链接](https://github.com/IceWhaleTech/CasaOS)，
[官方网站](https://casaos.zimaspace.com/)

![award](/images/casaos.png)

安装方法：

```sh
wget -qO- https://get.casaos.io | sudo bash
```

或者

```sh
curl -fsSL https://get.casaos.io | sudo bash
```

## Docker 常用命令

systemctl start docker //启动 docker

systemctl stop docker //停止 docker

systemctl restart docker //重启 docker

systemctl status docker //查看 docker 状态

systemctl enable docker //开机启动 docker

docker info //查看 docker 概要信息

docker --help //查看 docker 帮助文档

docker <命令> --help //查看 docker 命令帮助文档

## 安装 Portainer

```sh
docker pull portainer/portainer-ce
```

```sh
docker run -d -p 8000:8000 -p 9000:9000 -p 9443:9443 \
  --name=portainer --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer-data:/data \
  portainer/portainer-ce
```

## 安装 MySQL

```sh
docker run -d -p 3306:3306 -p 33060:33060 \
  --name=mysql -e MYSQL_ROOT_PASSWORD=123456 \
  -v /Users/martin/Documents/Docker/mysql/config/conf.d:/etc/mysql/conf.d \
  -v /Users/martin/Documents/Docker/mysql/data:/var/lib/mysql \
  mysql:latest
```

```sh
docker run -d -p 3308:3306 -p 33080:33060 \
  --name=mysql5 -e MYSQL_ROOT_PASSWORD=123456 \
  -v /Users/martin/Documents/Docker/mysql5/config/conf.d:/etc/mysql/conf.d \
  -v /Users/martin/Documents/Docker/mysql5/data:/var/lib/mysql \
  mysql:5.7
```

## 安装 Piwigo

```sh
docker run -d -p 8082:80 \
  --name=piwigo \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  -v /mnt/mac/AppData/piwigo/config:/config \
  -v /mnt/max/Pictures/Gallery:/gallery \
  --restart unless-stopped \
  lscr.io/linuxserver/piwigo:latest
```

# 自建 RsutDesk 服务器 OSS

快速开源远程访问和支持软件

## 相关链接

[Rustdesk 服务器安装脚本](https://github.com/techahold/rustdeskinstall)

[官方开源地址](https://github.com/rustdesk/rustdesk)

## 安装自建 RsutDesk 服务器 OSS

1. 在运行一键安装脚本之前先设置服务器防火墙

   ```sh
   ufw allow 21115:21119/tcp
   ufw allow 8000/tcp
   ufw allow 21116/udp
   sudo ufw enable
   ```

2. 使用一键安装脚本安装 OSS 服务

   ```sh
   wget https://raw.githubusercontent.com/dinger1986/rustdeskinstall/master/install.sh
   chmod +x install.sh
   ./install.sh
   ```

3. 在运行安装脚本时需要选择服务的运行配置
   RsutDesk 服务器 OSS 服务连接设置：1）使用 IP 连接，2）使用网址连接。选择 1 直接使用 IP 连接（按 1 然后按回车键）

   ```sh
   1) IP
   2) DNS/Domain
   Choose your preferred connection method: auto-resolve current WAN IP or enter your DNS/Domain:
   ```

   是否启用 gohttpserver 服务开启网页管理页面显示下载配置。按照需求开启或关闭

   ```sh
   1) Yes
   2) No
   Please choose if you want to download configs and install HTTP server:
   ```

4. 安装完成

   ```sh
   Your IP/DNS Address is < 192.168.0.1 >
   Your public key is < XXXXXXXXXX >
   Install Rustdesk on your machines and change your public key and IP/DNS name to the above
   You can access your install scripts for clients by going to < http://192.168.0.1:8000 >
   Username is admin and password is < XXXXXXXXXX >
   Press any key to finish install
   ```

   ::: danger 重要
   安装完成后以上显示的几行信息非常重要

   `Your IP/DNS Address`行: 显示连接的 IP 地址（客户端连接需要）

   `Your public key`行: 显示连接的密钥（客户端连接需要）

   `Install Rustdesk`行: 如果启用 gohttpserver 服务开启网页管理页，此处描述的为访问地址、管理员账号(默认为`admin`)、管理员密码
   :::

## 配置 RsutDesk 客户端

在官方网站下载对应平台的客户端
[下载地址](https://rustdesk.com/zh-cn/)
打开客户端并授予相应权限

- 打开设置/网络/解锁网络设置
  ![rustdesk](/images/rustdesk_01.png)
  在弹窗中输入开机密码
- 打开 ID/中继服务器
  ![rustdesk](/images/rustdesk_02.png)
  将部署服务器完成后显示的信息填入相应的选项中

  `ID 服务器`使用 OSS 的服务器地址

  `中继服务器`可以不填，也可以填写与 ID 服务器相同的地址

  `API 服务器`留空

  `Key` 填写 OSS 生成的 keys

- 填写完成后重启客户端
  ![rustdesk](/images/rustdesk_03.png)
  在客户端左下角显示`就绪`表示部署成功

## 其他

- 更新 RsutDesk 服务器 OSS

  ```sh
  wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/update.sh
  chmod +x update.sh
  ./update.sh
  ```

- 重启 RsutDesk 服务器 OSS 服务

  ```sh
  sudo systemctl restart rustdesksignal
  sudo systemctl restart rustdeskrelay
  ```

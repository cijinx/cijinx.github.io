# Python 学习文档

## 安装 Python

安装 Python3 最新版:

```sh
brew install python3
```

在 MacOS 系统中安装的 python 可以有多个版本，也可以在不同目录下安装多个 python 环境。为了在终端中执行 python 命令运行的是期望的 python 环境，需要配置 python 环境变量。

## 方法一、环境配置(软链接)

推荐使用此方法配置环境变量，不需要修改任何文件，新创建的软链接如果因版本升级或其他原因失效可以直接删除。

#### 一、说明

1. MacOS 的两个`bin`目录

   - 相同点：

     - `/usr/bin`和`/usr/local/bin`都是用来存储终端命令二进制文件或终端命令的软链接。
     - 两个 bin 目录都是已经包含在环境变量里的目录，程序放在里面或者链接到里面的命令都可以在终端里直接执行。

   - 不同点：
     - `/usr/bin`目录是不允许增删文件的，`/usr/local/bin`目录可以通过增删文件来实现在终端里直接运行，只需要有管理员权限。

2. 使用 HomeBrew 安装的软件位于 `/usr/local/Cellar/` 目录下，记住此路径。

#### 二、创建软链接

1. 配置 python 软链接

   - 清除失效/多余软链接数据

     - 跳转 `/usr/local/bin` 目录

     ```sh
     cd /usr/local/bin
     ```

     - 查看软链接文件

     ```sh
     ls -la
     ```

     如果存在任何类似以下的软链接选项，删除

     ```
     python -> ......
     python3 -> ......
     python3.11 -> ......
     ```

     - 删除软链接

     ```sh
     rm -rf /usr/local/bin/python
     rm -rf /usr/local/bin/python3
     rm -rf /usr/local/bin/python3.11
     ```

   - 添加软链接

     ```sh
     sudo ln -s /usr/local/Cellar/python@3.12/3.12.0/bin/python3.12 /usr/local/bin/python
     sudo ln -s /usr/local/Cellar/python@3.12/3.12.0/bin/python3.12 /usr/local/bin/python3
     sudo ln -s /usr/local/Cellar/python@3.12/3.12.0/bin/python3.12 /usr/local/bin/python3.12
     ```

2. 配置 pip 软链接

python3.12 中包含了 pip。

同样的方法清除失效/多余软链接数据并创建新的 pip 软链接。

```sh
sudo ln -s /usr/local/Cellar/python@3.12/3.12.0/bin/pip3.12 /usr/local/bin/pip
sudo ln -s /usr/local/Cellar/python@3.12/3.12.0/bin/pip3.12 /usr/local/bin/pip3
sudo ln -s /usr/local/Cellar/python@3.12/3.12.0/bin/pip3.12 /usr/local/bin/pip3.12
```

## 方法二、环境配置

使用 HomeBrew 安装的软件位于 `/usr/local/Cellar/` 目录下，记住此路径。

配置 Python3 环境变量:

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

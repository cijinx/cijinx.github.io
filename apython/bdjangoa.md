# 第一个 Django 应用程序 - 1

## 文件结构

使用 poetry 管理的 Django 项目文件结构如下:

```json
./ // 项目根目录此处为 PySiteServer
├─ siteserver // Django 项目外部根目录是项目的容器
│  ├─ manage.py // 命令行实用程序，可以在终端中与 Django 交互
│  └─ siteserver // 实际的 python 项目
│     ├─ __init__.py // 一个空文件，向python声明此目录为python包
│     ├─ setting.py // Django 配置文件
│     ├─ urls.py // Django 路由文件
│     ├─ asgi.py // asgi兼容web服务，部署使用
│     └─ wsgi.py // wsgi兼容web服务，部署使用
├─ .venv // poetry 模块
├─ poetry.lock // poetry 模块
├─ pyproject.toml // poetry 模块
└─ requirements.txt // 部署模块文件
```

整理一下项目:

```json
./ // 项目根目录此处为 PySiteServer
├─ manage.py // 命令行实用程序，可以在终端中与 Django 交互
├─ siteserver // 实际的 python 项目
│  ├─ __init__.py // 一个空文件，向python声明此目录为python包
│  ├─ setting.py // Django 配置文件
│  ├─ urls.py // Django 路由文件
│  ├─ asgi.py // asgi兼容web服务，部署使用
│  └─ wsgi.py // wsgi兼容web服务，部署使用
├─ .venv // poetry 模块
├─ poetry.lock // poetry 模块
├─ pyproject.toml // poetry 模块
└─ requirements.txt // 部署模块文件
```

## 运行项目

使用 PyCharm 打开项目会自动加载此项目的虚拟环境。

运行开发服务器 使用 PyCharm 内置终端输入:

```sh
python manage.py runserver
```

此时终端将会看到以下输出:

```sh
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.
September 29, 2023 - 07:10:14
Django version 4.2.5, using settings 'siteserver.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

```

::: info 提示
暂时忽略关于数据库迁移相关的警告，在以后的相关文档中会有相关的配置说明。
:::

即可在本地的 `8000` 端口开启服务。

::: info 提示

1. 不要在生产环境中使用 `python manage.py runserver` 命令开启服务，此命令仅用于启动开发服务，部署相关的文档会在以后说明。
2. 默认开发服务在本地的 `8000` 端口，也可以使用以下命令 `python manage.py runserver 8080` 修改端口。
3. 如果在一个有外部 ip 的服务器上进行开发，并且想要通过外部访问开发服务可以使用以下命令 `python manage.py runserver 0.0.0.0:8000` 。

:::

通过浏览器访问 `http://127.0.0.1:8000/` 会在页面中看到一个起飞的火箭。

## 创建投票应用

以上运行的一个项目已经配置完成，可以进行开发工作了。
项目可以认为是整个服务，而项目中的应用是完成特定功能的一个子服务。Django 开发约定功能开发功能基于应用。

创建应用确保终端的目录下有 `manage.py` 文件:

```sh
python manage.py startapp polls
```

这将创建一个目录:

```json
./polls/ // 应用 polls
├─ __init__.py
├─ admin.py
├─ apps.py
├─ migrations
│  └─ __init__.py
├─ models.py
├─ tests.py
└─ views.py
```

1. 编辑视图

```py
from django.shortcuts import render, HttpResponse

# Create your views here.

def index(request):
    return HttpResponse('Hello Django 投票系统')

```

2. 创建子路由

   - 创建 `./polls/urls.py`
   - 将视图与路由绑定

   ```py
   from django.urls import path

   from . import views

   urlpatterns = [
       path("", views.index, name="index"),
   ]
   ```

3. 子路由绑定根路由

   ```py
   from django.contrib import admin
   from django.urls import path, include # [!code focus]

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('polls', include('polls.urls')) # [!code focus]
   ]
   ```

启动服务，浏览器访问 `http://localhost:8000/polls` 可以看到 `Hello Django 投票系统`。

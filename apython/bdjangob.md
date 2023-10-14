# 第一个 Django 应用程序 - 2

## 安装数据库模块

此配置文档是通过 `mysql-client` 连接到 Docker 启动的 MySQL 详情步骤。

首先需要说明整个连接的路径:

开发服务器(虚拟)-->mysql-client 模块(虚拟)-->mysqlclient(本地)-->MySQL 数据库(Docker)

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

## Django 配置 MySQL 相关

1. 配置数据库 `./siteserver/settings.py`

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', // [!code hl]
        'NAME': 'dbsite', // [!code hl]
        'USER': 'user', // [!code hl]
        'PASSWORD': 'password', // [!code hl]
        'HOST': '127.0.0.1', // [!code hl]
        'PORT': '3306' // [!code hl]
    }
}
```

2. 配置时区 `./siteserver/settings.py`

```py
LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai' // [!code hl]

USE_I18N = True

USE_TZ = True
```

3. 生成默认数据库表

Django 项目默认包含了一些项目需要的数据库表

- `django.contrib.admin` 后台管理
- `django.contrib.auth` 身份验证
- `django.contrib.contenttypes` 内容类型框架
- `django.contrib.sessions` 会话框架
- `django.contrib.messages` 消息传递框架
- `django.contrib.staticfiles` 静态文件管理框架

开发环境已经连接了 MySQL 数据库，但是现在数据库中还没有这些表。在 PyCharm 内置终端中输入以下命令生成这些表:

```sh
python manage.py migrate
```

4. 创建模型 `./polls/models.py`

```py
from django.db import models

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

```

5. 激活模型
   上一步在应用 `polls` 中创建了两个模型 `Question` , `Choice` 需要激活

```sh
python manage.py makemigrations polls
```

输入以上指令将在 `./polls/migrations/` 中生成 `0001_initial.py` 文件。成功激活。但是数据库此时还没有创建这张表，运行以下命令创建表

```sh
python manage.py migrate
```

5.将应用 `polls` 的模型注册到项目中 `./siteserver/settings.py`

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'polls.apps.PollsConfig'  # 子应用模型注册 // [!code hl]
]
```

## Django 后台管理系统

1. 创建管理员

```sh
python manage.py createsuperuser
```

2. 输入用户名

```sh
Username: admin
```

3. 输入电子邮件

```sh
Email address: admin@example.com
```

4. 输入密码

```sh
Password: **********
Password (again): *********
Superuser created successfully.
```

5. 启动服务，访问 `http://127.0.0.1:8000/admin/` 输入上一步创建的账号密码将成功访问后台。

![后台管理](/public/images/djangoa.png)

## 将应用(polls)添加到管理系统

虽然已经有了应用(polls)的模型，但是在管理后台依然看不到，需要将模型添加到后台管理中。
`./polls/admin.py`

```py
from django.contrib import admin

from .models import Question

admin.site.register(Question)
```

启动服务，访问 `http://127.0.0.1:8000/admin/` 可以在后台看到(Question)选项。

![后台管理](/public/images/djangob.png)

# 第一个 Django 应用程序 - 2

## Django 配置 MySQL 相关

1. 配置数据库 `./siteserver/settings.py`

```py{3-8}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dbsite',
        'USER': 'user',
        'PASSWORD': 'password',
        'HOST': '127.0.0.1',
        'PORT': '3306'
    }
}
```

2. 配置时区 `./siteserver/settings.py`

```py{3}
LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

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

```py{8}
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'polls.apps.PollsConfig'  # 子应用模型注册
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

![后台管理](/images/djangoa.png)

## 将应用(polls)的(Question)模型添加到管理系统

虽然已经有了应用(polls)的模型，但是在管理后台依然看不到，需要将模型添加到后台管理中。
`./polls/admin.py`

```py
from django.contrib import admin

from .models import Question

admin.site.register(Question)
```

启动服务，访问 `http://127.0.0.1:8000/admin/` 可以在后台看到(Question)选项。

![后台管理](/images/djangob.png)

在后台中可以对(Question)模型相关联的数据做增删改查的操作，Django 会根据创建的(Question)模型写入数据库。

## 自定义(Question)模型后台表单

通过 admin.site.register(Question) 注册 Question 模型，Django 能够构建一个默认的表单用于展示。通常来说，你期望能自定义表单的外观和工作方式。你可以在注册模型时将这些设置告诉 Django。

通过重排列表单上的字段来看看它是怎么工作的。用以下内容替换 admin.site.register(Question)：`/polls/admin.py`

```py
from django.contrib import admin

from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    fields = ["pub_date", "question_text"]

admin.site.register(Question, QuestionAdmin)
```

你需要遵循以下流程——创建一个模型后台类，接着将其作为第二个参数传给 admin.site.register() ——在你需要修改模型的后台管理选项时这么做。

以上修改使得 "Publication date" 字段显示在 "Question" 字段之前：

![Question](/images/djangoc.png)

这样自定义表单数据在自由两个字段时并不是很必要，但是如果表单拥有十几个乃至更多字段时显示的数据就会很直观。

如果一个表单拥有十几个字段或者更多，更希望在后台分类展示这些字段：
`/polls/admin.py`

```py
from django.contrib import admin

from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["question_text"]}),
        ("日期", {"fields": ["pub_date"]}),
    ]

admin.site.register(Question, QuestionAdmin)
```

`fieldsets`元组中的第一个字段是分类的标题。以下是表单在后台管理中的样子：

![Question](/images/djangod.png)

## 添加(Choice)模型添加到后台管理中

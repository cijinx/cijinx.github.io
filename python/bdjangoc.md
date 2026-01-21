# 第一个 Django 应用程序 - 3

## 添加应用视图

通过之前的文档在后台管理系统中已经显示出 `Question` 相关的配置项了，在后台管理中也可以对 `Question`进行增、删、改、查相关的操作。

在开始本章节之前先在后台中增加了三个问题，本章节的目标就是在视图层面将已经添加的问题展示出来。

在应用 `./polls/views.py` 中添加更多的视图

```py
# 创建问卷详情视图
 def detail(request, question_id):
     return HttpResponse("查看问卷详情 %s." % question_id)

# 创建问卷选项视图
def results(request, question_id):
    response = "问卷选项 %s."
    return HttpResponse(response % question_id)

# 创建投票结果视图
def vote(request, question_id):
    return HttpResponse("投票结果 %s." % question_id)
```

为添加的视图添加路由 `./polls/urls.py`

```py
urlpatterns = [
    # 创建的第一个视图函数绑定的路由。访问'/polls'
    path("", views.index, name="index"),

    # 问卷详情绑定路由。访问'/polls/<id>'
    path("<int:question_id>/", views.detail, name="detail"), # [!code hl]
    # 问卷选项绑定路由。访问'/polls/results/<id>/'
    path("results/<int:question_id>/", views.results, name="results"), # [!code hl]
    # 投票结果绑定路由。访问'/polls/vote/<id>/'
    path("vote/<int:question_id>/", views.vote, name="vote"), # [!code hl]
]
```

## 为视图绑定模型(数据库操作-读)

以上添加的三个视图及其绑定的路由实际上并没有与模型绑定，在实际运行访问之后也可以发现展示的内容仅仅只是将上传的参数直接显示在页面当中。这并没有达到预期的效果，我们希望视图能够通过提交的参数在页面中显示数据库当中的内容。

在应用 `./polls/views.py` 中改写 `index` 视图以绑定模型

```py
# 导入模型
from .models import Question

# 创建关联模型的调查问卷视图
def index(request):
    # objects.order_by:查询模型
    latest_question_list = Question.objects.order_by("-pub_date")[:3]
    output = ", ".join([q.question_text for q in latest_question_list])
    return HttpResponse(output)
```

## 为视图绑定模型(数据库操作-读)、绑定模版(优化页面)

1. 创建模版文件 `./polls/templates/polls/index.html`。
   ::: details 模版命名空间
   查看旧的文档或一些其他的教程可能会把 `/templates` 目录创建在项目的其他路径，但是为了项目中的每个应用的独立性推荐将其创建在应用根目录 `/polls` 当中。

   一个项目可能包含很多的应用，你也可以将 `index.html` 文件创建在应用下的 `/templates` 目录下，但是这并不是一个好的选择，因为 Django 会匹配整个项目的模版而不是单独每个应用的模版。如果在不同应用下存在同名的模版，Django 将无法区分他们。

   推荐的做法在每个应用中的模版文件夹 `/templates` 下创建一个与应用同名的文件夹，再创建应用的模版。所以模版的目录看起来像这样 `./polls/templates/polls/`。
   :::

2. 将以下代码放入该模版 `/polls/templates/polls/index.html` 中：

   ```html
   {% if latest_question_list %}
   <ul>
     {% for question in latest_question_list %}
     <li>
       <a href="/polls/{{ question.id }}/">{{ question.question_text }}</a>
     </li>
     {% endfor %}
   </ul>
   {% else %}
   <p>No polls are available.</p>
   {% endif %}
   ```

   ::: tip 提示
   为了使文档更短，所有模板示例都使用不完整的 HTML。在您的项目，您应该使用完整的 HTML 文件。
   :::

3. 在应用 `./polls/views.py` 中改写 `index` 视图以绑定模版

   ```py
   # 导入模版
   from django.template import loader

   # 创建关联模型、模版的调查问卷视图
   def index(request):
       latest_question_list = Question.objects.order_by("-pub_date")[:3]
       template = loader.get_template("polls/index.html")
       context = {
           "latest_question_list": latest_question_list,
       }
       return HttpResponse(template.render(context, request))
   ```

4. 在应用 `./polls/views.py` 中改写 `index` 视图以绑定模版(简写)
   ```py
   # 创建关联模型、模版的调查问卷视图(简写)
   def index(request):
       latest_question_list = Question.objects.order_by("-pub_date")[:3]
       context = {"latest_question_list": latest_question_list}
       return render(request, "polls/index.html", context)
   ```

## 去除模版中的硬编码 URL

在上一步骤中模版中的链接是硬编码的。问题在于，硬编码和强耦合的链接，对于一个包含很多应用的项目来说，修改起来是十分困难的。然而，因为你在 `polls.urls` 的 `url()` 函数中通过 `name` 参数为 URL 定义了名字，可以使用 `{% url %}` 标签代替它。

修改模版 `/polls/templates/polls/index.html` 中的链接：

```html
<a href="{% url 'detail' question.id %}">{{ question.question_text }}</a>
```

## 为 URL 名称添加命名空间

此文档的项目中只包含一个应用 `polls` ，在一个真实的 Django 项目中可能会包含很多的应用。Django 通过命名空间来分辨 URL 名称。例如 `polls` 中有 `detail` ，其他的应用中可能也有 `detail` 。Django 需要通过命名空间来指定访问的 URL 名称 `polls:detail` 来确定哪个应用的 `detail` 。

设置方法：

- 在 `/polls/urls.py` 添加 `app_name` 配置命名空间：

```py
from django.urls import path, include
from . import views

# 命名空间
app_name = "polls" # [!code hl]

urlpatterns = [
   ......
]
```

- 修改模版 `/polls/templates/polls/index.html` 中的链接：

```html
<a href="{% url 'dpolls:detail' question.id %}">{{ question.question_text }}</a>
```

## 抛出 404 错误

处理 `detail` 视图函数，在访问了一个不存在的问卷问题时抛出 404 错误。

为 `detail` 视图函数创建模版，创建 `/polls/templates/polls/detail.html` 并将以下代码放入该模版中：

```html
{{ question }}
```

1. 在应用 `./polls/views.py` 中改写 `detail` 视图以抛出 404 错误：

```py
# 导入访问错误404
from django.http import Http404

# 创建问卷详情视图，如果在模型中找不到需要显示404错误
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("未找到此问卷")
    return render(request, "polls/detail.html", {"question": question})
```

2. 使用快捷函数 `get_object_or_404()` 可以简写 404 错误：

```py
from django.shortcuts import render, HttpResponse, get_object_or_404
# 创建问卷详情视图，如果在模型中找不到需要显示404错误(简写)
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, "polls/detail.html", {"question": question})
```

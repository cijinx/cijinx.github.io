# 第一个 Django 应用程序 - 3

## 添加应用视图

通过之前的文档在后台管理系统中已经显示出 `Question` 相关的配置项了，在后台管理中也可以对 `Question`进行增、删、改、查相关的操作。

在开始本章节之前先在后台中增加了三个问题，本章节的目标就是在视图层面将已经添加的问题展示出来。

在应用 `./polls/views.py` 中添加更多的视图

```py
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```

为添加的视图添加路由 `./polls/urls.py`

```py
urlpatterns = [
    # ex: /polls/
    path("", views.index, name="index"), // [!code hl]
    # ex: /polls/5/
    path("<int:question_id>/", views.detail, name="detail"), // [!code hl]
    # ex: /polls/5/results/
    path("<int:question_id>/results/", views.results, name="results"), // [!code hl]
    # ex: /polls/5/vote/
    path("<int:question_id>/vote/", views.vote, name="vote"), // [!code hl]
]
```

# HarmonyOS | 5.0.0(12)

## 工具

[DevEco Studio](https://developer.huawei.com/consumer/cn/download/) 工具是 HarmonyOS 应用开发的推荐 IDE 工具。

[点击此处](/apps/aharmonyos/index.md)了解 DevEco Studio 工具的详细用法，包括使用该工具进行工程创建、应用签名、应用调试、应用安装运行的指导。

## 快速入门

本文档适用于 HarmonyOS 应用开发的初学者。通过构建一个简单的具有页面跳转/返回功能的应用，快速了解工程目录的主要文件，熟悉 HarmonyOS 应用开发流程。

**Stage 模型**是目前主推且会长期演进的模型。快速入门以此为例提供开发指导。

:::info 说明
本文档使用 **DevEco Studio 5.0.0 Release-Build Version_5.0.3.906**，以下展示效果皆为此版本运行效果
:::

## 创建 ArkTS 工程

1. 若首次打开 DevEco Studio，请点击 Create Project 创建工程。如果已经打开了一个工程，请在菜单栏选择 File > New > Create Project 来创建一个新工程。

2. 选择 Application 应用开发（本文以应用开发为例，Atomic Service 对应为元服务开发），选择模板“Empty Ability”，点击 Next 进行下一步配置。
   ![award](/images/deveco_01.png)

3. 进入配置工程界面，Compatible SDK 选择“5.0.0(12)”，其他参数保持默认设置即可。
   ![award](/images/deveco_02.png)

4. 点击 Finish，工具会自动生成示例代码和相关资源，等待工程创建完成。

## 构建第一个页面

1. 使用文本组件。
   工程同步完成后，在`Project`窗口，点击`entry > src > main > ets > pages`，打开`Index.ets`文件，进行页面的编写。

```ts
// Index.ets
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

2. 添加按钮。
   在默认页面基础上，我们添加一个 Button 组件，作为按钮响应用户点击，从而实现跳转到另一个页面。`Index.ets`文件的示例如下：

```ts
// Index.ets
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        // 添加按钮，以响应用户点击
        Button() {
          Text('Next')
            .fontSize(30)
            .fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({
          top: 20
        })
        .backgroundColor('#0D9FFB')
        .width('40%')
        .height('5%')
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

3. 在编辑窗口右上角的侧边工具栏，点击 Previewer，打开预览器。第一个页面效果如下图所示：
   ![award](/images/deveco_02.png)

## 构建第二个页面

1. 创建第二个页面。

   - 新建第二个页面文件。在`Project`窗口，打开`entry > src > main > ets`，右键点击`pages`文件夹，选择`New > ArkTS File`，命名为`Second`，点击回车键。可以看到文件目录结构如下：
     ![award](/images/deveco_02.png)

   :::info 说明
   开发者也可以在右键点击`pages`文件夹时，选择`New > Page > Empty Page`，命名为`Second`，点击`Finish`完成第二个页面的创建。使用此种方式则无需再进行下文中第二个页面路由的手动配置。
   :::

   - 配置第二个页面的路由。在`Project`窗口，打开`entry > src > main > resources > base > profile`，在 main_pages.json 文件中的`src`下配置第二个页面的路由`pages/Second`。示例如下：

```json
{
  "src": ["pages/Index", "pages/Second"]
}
```

2. 添加文本及按钮。
   参照第一个页面，在第二个页面添加 Text 组件、Button 组件等，并设置其样式。`Second.ets`文件的示例如下：

```ts
// Second.ets
@Entry
@Component
struct Second {
  @State message: string = 'Hi there'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button() {
          Text('Back')
            .fontSize(25)
            .fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({
          top: 20
        })
        .backgroundColor('#0D9FFB')
        .width('40%')
        .height('5%')
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

## 实现页面间的跳转

页面间的导航可以通过页面路由`router`来实现。页面路由 router 根据页面 url 找到目标页面，从而实现跳转。使用页面路由请导入 router 模块。

如果需要实现更好的转场动效，推荐使用 Navigation。

1. 第一个页面跳转到第二个页面。
   在第一个页面中，跳转按钮绑定 onClick 事件，点击按钮时跳转到第二页。`Index.ets`文件的示例如下：

```ts
// Index.ets
// 导入页面路由模块
import { router } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        // 添加按钮，以响应用户点击
        Button() {
          Text('Next')
            .fontSize(30)
            .fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({
          top: 20
        })
        .backgroundColor('#0D9FFB')
        .width('40%')
        .height('5%')
        // 跳转按钮绑定onClick事件，点击时跳转到第二页
        .onClick(() => {
          console.info(`Succeeded in clicking the 'Next' button.`)
          // 跳转到第二页
          router.pushUrl({ url: 'pages/Second' }).then(() => {
            console.info('Succeeded in jumping to the second page.')

          }).catch((err: BusinessError) => {
            console.error(`Failed to jump to the second page. Code is ${err.code}, message is ${err.message}`)
          })
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

2. 第二个页面返回到第一个页面。
   在第二个页面中，返回按钮绑定 onClick 事件，点击按钮时返回到第一页。`Second.ets`文件的示例如下：

```ts
// Second.ets
// 导入页面路由模块
import { router } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@Component
struct Second {
  @State message: string = 'Hi there'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button() {
          Text('Back')
            .fontSize(25)
            .fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({
          top: 20
        })
        .backgroundColor('#0D9FFB')
        .width('40%')
        .height('5%')
        // 返回按钮绑定onClick事件，点击按钮时返回到第一页
        .onClick(() => {
          console.info(`Succeeded in clicking the 'Back' button.`)
          try {
            // 返回第一页
            router.back()
            console.info('Succeeded in returning to the first page.')
          } catch (err) {
            let code = (err as BusinessError).code;
            let message = (err as BusinessError).message;
            console.error(`Failed to return to the first page. Code is ${code}, message is ${message}`)
          }
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

3. 打开 Index.ets 文件，点击预览器中的按钮进行刷新。效果如下图所示：
   ![award](/images/deveco_02.png)

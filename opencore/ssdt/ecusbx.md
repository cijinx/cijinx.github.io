---
outline: deep
---

# SSDT-EC-USBX

## 查找 DSDT 相关信息

如何获取硬件的 DSDT 副本请查看[此文档](./dsdt.md)。

## 获取DSDT信息

<span style="color:#FF3030">如何查找真正的EC控制器（重要）</span>

<MdPreview :editorId="id" :modelValue="search" />
<MdCatalog :editorId="id" :scrollElement="scrollElement" />

1. 使用 MaciASL 打开提取的 DSDT 副本。
2. 搜索 `PNP0C09` 关键字，得到类似以下的结果：

![sec](/images/sec.png)

3. 得到的结果可以分为三种情况：
   - 没有结果，创建一个虚拟EC控制器给macOS使用
   - 有一个结果，请记录结果的路径和控制器名称
   - 有两个结果，需要查看是否有`HID`、`CRS`、`GPE`这三个属性，有这三个属性的是真正的控制器
4. 从上面的结果可以得到以下信息：
   - 路径 `SB.PCI0.LPCB`
   - 控制器名称 `EC0`
5. 没有结果尝试搜索 `LPCB`、`LPC0`、`LPC`、`SBRG`、`PX40` 中的任意一个，如果存在同样可以获取到路径。
   - 路径 `SB.PCI0.LPCB`

## 定制修改

<span style="color:#FF3030">根据不同情况选择操作（重要）</span>

<MdPreview :editorId="id" :modelValue="text" />
<MdCatalog :editorId="id" :scrollElement="scrollElement" />

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const id = 'preview-only';

const search = ref(`

\`\`\`mermaid
flowchart TD 
  PNP0C09结果数量 --> 0 --> 创建虚拟EC
  PNP0C09结果数量 --> 1 --> 真正的EC控制器
  PNP0C09结果数量--> 2 --> 查看EC控制器属性 
  查看EC控制器属性 --> 有三个属性 --> 是真正的EC控制器
  查看EC控制器属性 --> 没有三个属性 --> 不是真正的EC控制器忽略
\`\`\`

`);

const text = ref(`

\`\`\`mermaid
flowchart TD 
  控制器已命名为EC --> 是 --> 无需创建EC
  控制器已命名为EC --> 否 --> 需要创建EC
  需要创建EC --> 笔记本电脑 --> 删除注释内容
  需要创建EC --> 台式电脑 --> PNP0C09结果数量
  
  PNP0C09结果数量 --> 0 --> 删除注释内容
  PNP0C09结果数量 --> 1或2 --> PNP0C09是否有_STA方法
  
  PNP0C09是否有_STA方法 --> 有 --> 删除注释内容 --> 修改路径
  PNP0C09是否有_STA方法 --> 没有 --> 解开注释内容 --> 修改路径
\`\`\`

`);
const scrollElement = document.documentElement;
</script>

### `PNP0C09` 已命名为 `EC`
无需创建 `SSDT-EC` ，但是如果是Skylake（第六代桌面处理器）或者以后的CPU需要加载 `SSDT-USBX.aml`。

可以在此获取预构建的[`SSDT-USBX.aml`](https://github.com/dortania/OpenCore-Post-Install/blob/master/extra-files/SSDT-USBX.aml)。

### 获取示例的SSDT文件
- [SSDT-EC-USBX](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-EC-USBX.dsl)
   - 适用于Skylake（第六代桌面处理器）或者之后的Intel CPU以及全部的AMD CPU
- [SSDT-EC](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-EC.dsl)
   - 适用于Broadwell（第五代桌面处理器）或者之前的Intel CPU

### 删除注释的内容（笔记本电脑、PNP0C09无结果、存在_STA方法）

示例文件需要删除的内容：
![sec](/images/ec_1.png)

删除后的文件：
![sec](/images/ec_2.png)

### 解开注释内容

示例文件需要删除的内容：
![sec](/images/ec_3.png)

删除后的文件：
![sec](/images/ec_4.png)

### 修改路径

```txt
DefinitionBlock ("", "SSDT", 2, "ACDT", "SsdtEC", 0x00001000)
{
    External (_SB_.PCI0.LPCB, DeviceObj) // 此处修改为自己的路径
    External (_SB_.PCI0.LPCB.EC0, DeviceObj) // 如果已删除请忽略 此处修改为自己的路径+EC名称

    Scope (\_SB.PCI0.LPCB.EC0) // 如果已删除请忽略 此处修改为自己的路径+EC名称
    {
        Method (_STA, 0, NotSerialized)  // _STA: Status
```

```txt
    Scope (\_SB.PCI0.LPCB) // 此处修改为自己的路径
    {
        Device (EC)
        {
            Name (_HID, "ACID0001")  // _HID: Hardware ID
            Method (_STA, 0, NotSerialized)  // _STA: Status
```

定制完成后的文件：
![sec](/images/ec_5.png)

修改完成后点击编译，检查是否有错误。没有错误后将文件另存为`.aml`文件，之后**替换/添加到OC引导**内。
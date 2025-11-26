---
outline: deep
---

# SSDT-EC-USBX

## 查找 DSDT 相关信息

如何获取硬件的 DSDT 副本请查看[此文档](./sdsdt.md)。

## 获取DSDT信息

<span style="color:#FF3030">如何查找真正的EC控制器（重要）</span>

<MdPreview :editorId="id" :modelValue="search" />
<MdCatalog :editorId="id" :scrollElement="scrollElement" />

1. 使用 MaciASL 打开提取的 DSDT 副本。
2. 搜索 `PNP0C09` 关键字，得到类似以下的结果：

![splug](/images/sec.png)

3. 得到的结果可以分为三种情况：
   - 没有结果，创建一个虚拟EC控制器给macOS使用
   - 有一个结果，请记录结果的路径和控制器名称
   - 有两个结果，需要查看是否有`HID`、`CRS`、`GPE`这三个属性，有这三个属性的是真正的控制器
4. 从上面的结果可以得到以下信息：
   - 路径 `SB.PCI0.LPCB`
   - 控制器名称 `EC0`

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
  PNP0C09结果数量 --> 0 --> 创建虚拟EC --> 结束
  PNP0C09结果数量 --> 1 --> 真正的EC控制器 --> 结束
  PNP0C09结果数量--> 2 --> 查看EC控制器属性 
  查看EC控制器属性 --> 有三个属性 --> 是真正的EC控制器 --> 结束
  查看EC控制器属性 --> 没有三个属性 --> 不是真正的EC控制器 --> 结束
\`\`\`

`);

const text = ref(`

\`\`\`mermaid
flowchart TD 
  控制器已命名为EC --> 是 --> 无需创建SSDT-EC
  无需创建SSDT-EC --> 结束
  控制器已命名为EC --> 否 --> 需要创建SSDT-EC
  需要创建SSDT-EC --> PNP0C09结果数量
  PNP0C09结果数量 --> 1个 --> 结束
  PNP0C09结果数量 --> 多个 --> 结束
  PNP0C09结果数量 --> 0 --> 结束
\`\`\`

`);
const scrollElement = document.documentElement;
</script>
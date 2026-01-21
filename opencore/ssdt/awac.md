# SSDT-AWAC

SSDT-AWAC/SSDT-RTC0 的目的是修复新主板的系统时钟，主要是以下的主板需要：
- B360主板
- B365主板
- H310主板
- H370主板
- Z370主板
- Z390主板
- B460主板
- Z490主板
- 400 series主机（应该是系列的整机电脑）
- 495 series主机（应该是系列的整机电脑）
- X99 服务器主板
- X299 服务器主板

## 查找 DSDT 相关信息

如何获取硬件的 DSDT 副本请查看[此文档](./dsdt.md)。

## 定制修改

<span style="color:#FF3030">根据不同情况选择操作（重要）</span>

<MdPreview :editorId="id" :modelValue="text" />
<MdCatalog :editorId="id" :scrollElement="scrollElement" />

<script setup>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const id = 'preview-only';

const text = ref(`

\`\`\`mermaid
flowchart TD 
  是否为X99或X299主板 --> 是 --> 查看专门的定制文档
  是否为X99或X299主板 --> 否 --> 搜索ACPI000E
  搜索ACPI000E --> 无结果 --> 无需任何操作
  搜索ACPI000E --> 有结果 --> \_STA方法 

  \_STA方法 --> 存在可以禁用 --> 搜索PNP0B00
  \_STA方法 --> 不存在可以禁用 --> 定制RTC0
  
  搜索PNP0B00 --> 有 --> 获取AWAC
  搜索PNP0B00 --> 没有 --> 定制RTC0
\`\`\`

`);
const scrollElement = document.documentElement;
</script>

## X99或X299定制AWAC

:::tip 注意
X99或X299定制AWAC请[查看此文档](./awacx.md)
:::

## 定制AWAC
1. 搜索 `ACPI000E`将看到以下类似的结果：
![awac](/images/awac_1.png)

:::tip 解释
在 `Device(AWAC)` 中存在方法 `_ATS` 通过参数 `STAS` 是否等于 `Zero` 判断是否可以被禁用。
:::

2. 搜索 `PNP0B00`将看到以下类似的结果：
![awac](/images/awac_2.png)

:::tip 解释
在 `Device(RTC)` 中存在方法 `_ATS` 通过参数 `STAS` 是否等于 `One` 判断是否可以被启用。
:::

**有以上两个结果按照下面的直接定制AWAC即可。**

- 获取 [`SSDT-AWAC.dsl`](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-AWAC-DISABLE.dsl)，无需任何修改编译即可。
- 直接获取[`SSDT-AWAC.aml`](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-AWAC.aml)文件可以达到同样的效果。

修改完成后点击编译，检查是否有错误。没有错误后将文件另存为`.aml`文件，之后**替换/添加到OC引导**内。

## 定制RTC0方法

此方法适用于搜索`PNP0B00`无结果或者是结果中的`_STA`方法没有`STAS`判断语句的硬件。

### 获取DSDT信息

1. 查找PCI路径。搜索 `PNP0A08`（如果有多个结果就使用第一个）
   - 得到结果为 `PCI0`
2. 查找LowPinCount路径。搜索 `Name (_ADR, 0x001F0000)`
   - 得到结果为 `LPCB`

### 获取SSDT-RTC0

[SSDT-RTC0.dsl](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-RTC0.dsl)

### 定制RTC0

```txt
External (_SB_.PCI0.LPCB, DeviceObj) // 此处修改为自己的路径
Scope (_SB.PCI0.LPCB) // 此处修改为自己的路径
```

修改完成后点击编译，检查是否有错误。没有错误后将文件另存为`.aml`文件，之后**替换/添加到OC引导**内。
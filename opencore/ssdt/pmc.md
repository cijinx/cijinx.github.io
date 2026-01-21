# SSDT-PMC

SSDT-PMC是绝大多数的300系列主板必备的（Z370除外）。它的功能是恢复NVRAM的支持。

需要此SSDT的主板：
- B360主板
- B365主板
- H310主板
- H370主板
- Z390主板

## 查找 DSDT 相关信息

如何获取硬件的 DSDT 副本请查看[此文档](./dsdt.md)。

## 获取DSDT信息

1. 查找PCI路径。搜索 `PNP0A08`（如果有多个结果就使用第一个）
   - 得到结果为 `PCI0`
2. 查找LowPinCount路径。搜索 `Name (_ADR, 0x001F0000)`
   - 得到结果为 `LPCB`

## 定制修改

通过上面的步骤已经获取 ACPI 的路径`PCI0.LPCB`，开始定制：

获取示例的[SSDT-PMC.dsl](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-PMC.dsl)。

```txt
External (_SB_.PCI0.LPCB, DeviceObj) // 此处修改为自己的路径
Scope (_SB.PCI0.LPCB) // 此处修改为自己的路径
```
定制完成示例：
![pmc](/images/pmc.png)

修改完成后点击编译，检查是否有错误。没有错误后将文件另存为`.aml`文件，之后**替换/添加到OC引导**内。
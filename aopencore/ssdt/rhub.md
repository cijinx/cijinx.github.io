# SSDT-RHUB

某些OEM厂商在一些400系列主板上面违反了APCI规范，这会导致启动到MacOS时出现问题，要解决此问题我们需要关闭原生的RHUB设备并强制让MacOS重建端口。

以下平台需要修复：
- Icelake（第十代）笔记本电脑，目前已知联想和戴尔这两个笔记本品牌有此问题。
- 搭载华硕Z490主板的台式电脑。

## 查找 DSDT 相关信息

如何获取硬件的 DSDT 副本请查看[此文档](./dsdt.md)。

## 获取DSDT信息

1. 搜索 `Device (RHUB)` ，会得到如下所示的内容：
![rhub](/images/rhub.png)
从上面的内容可以看到RHUB的完整路径，如果不清楚可以搜索系统的这些设备路径
   - 查找PCI路径。搜索 `PNP0A08`（如果有多个结果就使用第一个）。
   - 查找XHCI路径。搜索 `XHC`、`XHCI`、`XHC1` 中的任意一个，有结果就是XHCI的路径。
2. 从上面的结果可以看到路径为 `PCI0.XHC.RHUB`。

## 定制修改

通过上面的步骤已经获取 ACPI 的路径`PCI0.XHC.RHUB`，开始定制：

[SSDT-RHUB.dsl](https://github.com/dortania/Getting-Started-With-ACPI/blob/master/extra-files/decompiled/SSDT-RHUB.dsl)

```txt
External (_SB_.PCI0.XHC.RHUB, DeviceObj) // 此处修改为自己的路径
Scope (_SB.PCI0.XHC.RHUB) // 此处修改为自己的路径
```
定制完成示例：
![rhub](/images/rhub_1.png)

修改完成后点击编译，检查是否有错误。没有错误后将文件另存为`.aml`文件，之后**替换/添加到OC引导**内。
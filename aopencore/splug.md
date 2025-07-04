# 修复电源管理(SSDT-PLUG)

SSDT-PLUG 是一个用于修复电源管理的 SSDT 表。它通过在 DSDT 中添加一个 PLUG 结构来修复电源管理问题。

## 查找 DSDT 相关信息

如何获取硬件的 DSDT 副本请查看[此文档](./sdsdt.md)。

## 定制修改

通过上面的步骤已经获取 ACPI 的路径`SB.PR00`，开始定制：

[SSDT-PLUG.dsl](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-PLUG.dsl)

预编译的文件中可能已经存在相同的路径了，只需要保留相同的路径，删除其他的就可以了。

预编译文件：
![award](/images/awo.png)

定制文件：
![award](/images/awo.png)

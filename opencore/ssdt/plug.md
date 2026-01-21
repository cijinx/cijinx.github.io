# 修复电源管理(SSDT-PLUG)

SSDT-PLUG 是一个用于修复电源管理的 SSDT 表。它通过在 DSDT 中添加一个 PLUG 结构来修复电源管理问题。

## 查找 DSDT 相关信息

如何获取硬件的 DSDT 副本请查看[此文档](./dsdt.md)。

## 获取DSDT信息

1. 使用 MaciASL 打开提取的 DSDT 副本。
2. 搜索 `Processor` 关键字

![splug](/images/splug.png)

3. 可以看到路径为 `SB.PR00`

## 定制修改

通过上面的步骤已经获取 ACPI 的路径`SB.PR00`，开始定制：

[SSDT-PLUG.dsl](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/AcpiSamples/Source/SSDT-PLUG.dsl)

预编译的文件中可能已经存在相同的路径了，只需要保留相同的路径，删除其他的就可以了。

预编译文件：
![splug_1](/images/splug_1.png)

定制文件：
![splug_2](/images/splug_2.png)

**以下是修改后的源码：**

```txt
DefinitionBlock ("", "SSDT", 2, "ACDT", "CpuPlug", 0x00003000)
{
    External (_SB_.PR00, ProcessorObj)

    Method (PMPM, 4, NotSerialized) {
       If (LEqual (Arg2, Zero)) {
           Return (Buffer (One) { 0x03 })
       }

       Return (Package (0x02)
       {
           "plugin-type", 
           One
       })
    }

    If (CondRefOf (\_SB.PR00)) {
        If ((ObjectType (\_SB.PR00) == 0x0C)) {
            Scope (\_SB.PR00) {
                If (_OSI ("Darwin")) {
                    Method (_DSM, 4, NotSerialized)  
                    {
                        Return (PMPM (Arg0, Arg1, Arg2, Arg3))
                    }
                }
            }
        }
    }
}

```

修改完成后点击编译，检查是否有错误。没有错误后将文件另存为`.aml`文件，之后**替换/添加到OC引导**内。
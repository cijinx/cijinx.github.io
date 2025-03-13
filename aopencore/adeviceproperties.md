# DeviceProperties

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

设备相关配置通过专用的缓存区提供给 macOS ，这个缓冲区是设备路径到属性名称与值的键值对的序列化映射。

## Add

<span style="color:#FF3030">初始配置略过</span>

将设备属性从 (设备路径的映射`plist dict`)设置为(变量名和值的映射`plist dict`)，其中变量名称和值的格式为`plist metadata`。

::: info 注：

1. 设备路径必须以规范化字符串格式提供，例如：`PciRoot(0x0)/Pci(0x1,0x0)/Pci(0x0,0x0`。
2. 现有的属性不会被改变，除非在`DeviceProperties`部分删除。

:::

## Delete

<span style="color:#FF3030">初始配置略过</span>

从设备路径的映射`plist dict`到`plist string`格式的变量名数组(数据类型`plist array`)中删除设备属性。

::: info 注：

1. 现有的属性可能只存在于具有`DeviceProperties`驱动程序的固件上(例如：Apple)。因此，除非安装了新的驱动程序，否则通常没有理由删除变量。

:::

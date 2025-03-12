# DeviceProperties

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

设备相关配置通过专用的缓存区提供给 macOS ，这个缓冲区是设备路径到属性名称与值的键值对的序列化映射。

## Add

描述：将设备属性从 (设备路径的映射`plist dict`)设置为(变量名和值的映射`plist dict`)，其中变量名称和值的格式为`plist metadata`。

## Delete

<span style="color:#FF3030">初始配置略过</span>

# Comet Lake 十代台式主机安装文档

## 开始

当看到 OC 的 `config.plist` 有非常多的配置项及子配置时会让人误以为配置起来很难，事实上并非如此。针对自己的硬件配置一个可用的 OC 引导需要修改的内容非常有限，只需要一点点耐心就可以。

配置 OC 的 `config.plist` 文件需要以下注意点：

- 除非有明确的说明否则不要删除任何配置项及子配置，文档中未提及的配置项保持默认。
- 不要使用文档中未提及的编辑工具，这有可能损坏 `config.plist` 原有的编码格式或配置内容。
- `Sample.plist` 一定要重命名为 `config.plist` 并放到正确的文件夹内。

需要的一些工具：

- [ProperTree](https://github.com/corpnewt/ProperTree)
  - 通用的 `.plist` 文件编辑器
- [OpenCore](https://github.com/acidanthera/OpenCorePkg/releases)
  - OpenCore 引导工具

## ACPI

### Add

这里添加一些启动 MacOS 系统非常重要的 SSDT。他们的作用非常重要，包含电源管理、USB 映射、RTC 时钟等。对于十代台式主机必要的 SSDT 有：

| SSDT         | 描述                                                                 |
| ------------ | -------------------------------------------------------------------- |
| SSDT-PLUG    | 修复 CPU 原生电源管理                                                |
| SSDT-EC-USBX | EC 控制器及 USB 电源管理                                             |
| SSDT-AWAC    | 传统 RTC 时钟控制器，使用 AWAC 的控制器, B460 和 Z490 主板必须添加。 |
| SSDT-RHUB    | 修复华硕主板的其他潜在错误，其他主板按需添加                         |

在下载的 OpenCore 文件夹中已经存在一些常用的 SSDT 文件，解压后处于`./Docs/AcpiSamples/Binaries`目录下。

其他的 SSDT 文件可以在[此处下载](https://github.com/dortania/Getting-Started-With-ACPI/tree/master/extra-files/compiled)。

### Delete、Patch、Quirks

<span style="color:#FF3030">初始配置略过</span>

## Booter

### MmioWhitelist、Patch

<span style="color:#FF3030">初始配置略过</span>

### Quirks

| 快捷配置项             | 启用 | 描述                               |
| ---------------------- | ---- | ---------------------------------- |
| DevirtualiseMmio       | Yes  |                                    |
| EnableWriteUnprotector | No   |                                    |
| ProtectUefiServices    | Yes  |                                    |
| RebuildAppleMemoryMap  | Yes  |                                    |
| ResizeAppleGpuBars     | -1   | 如果主板支持 GPUBar 功能设置为 `0` |
| SetupVirtualMap        | No   |                                    |
| SyncRuntimePermissions | Yes  |                                    |

## DeviceProperties

### Add

`PciRoot(0x0)/Pci(0x2,0x0)`
配置项中没有此选项，请手动创建。如果 CPU 的后缀为 `F` 代表没有核显，忽略此项。

| AAPL,ig-platform-id | 描述                            |
| ------------------- | ------------------------------- |
| `07009B3E`          | 台式机使用核显连接显示器        |
| `00009B3E`          | `07009B3E` 如果不起作用的替代值 |
| `0300C89B`          | 有独立显卡，核显只参与计算任务  |

### Delete

<span style="color:#FF3030">初始配置略过</span>

## Kernel

### Add

| kexts              | 描述         |
| ------------------ | ------------ |
| Lilu.kext          |              |
| VirtualSMC.kext    | 电源管理驱动 |
| WhateverGreen.kext | 显卡驱动     |
| AppleALC.kext      | 声卡驱动     |
| SMCProcessor.kext  | 电源管理驱动 |
| SMCSuperIO.kext    | 电源管理驱动 |
| NVMeFix.kext       |              |

::: info 注：
ProperTree 编辑器可以使用快捷键`Cmd/Ctrl + Shift + R`以正确的顺序添加 kexts。
:::

### Quirks

| 快捷配置项              | 启用 | 描述                                                       |
| ----------------------- | ---- | ---------------------------------------------------------- |
| AppleXcpmCfgLock        | Yes  | 如果 BIOS 中有 `CFG-Lock` 选项并且已经设为关闭则不需要开启 |
| DisableIoMapper         | Yes  | 如果 BIOS 中有 `VT-D` 选项并且已经设为关闭则不需要开启     |
| LapicKernelPanic        | No   | 惠普电脑需要开启                                           |
| PanicNoKextDump         | Yes  |                                                            |
| PowerTimeoutKernelPanic | Yes  | 修复电源管理超时导致的内核崩溃                             |
| XhciPortLimit           | Yes  | 支持 15 个以上 USB 接口                                    |

### Block、Emulate、Force、Patch、Scheme

<span style="color:#FF3030">初始配置略过</span>

## Misc

### Boot

| 快捷配置项    | 启用 | 描述                                    |
| ------------- | ---- | --------------------------------------- |
| HideAuxiliary | Yes  | OC 引导界面点击空格键显示其他隐藏启动项 |

### Security

| 快捷配置项           | 启用       | 描述                             |
| -------------------- | ---------- | -------------------------------- |
| AllowSetDefault      | Yes        | 允许在 OC 引导界面设置默认启动项 |
| BlacklistAppleUpdate | Yes        | 禁用更新                         |
| ScanPolicy           | 0          |                                  |
| SecureBootModel      | `Disabled` |                                  |
| Vault                | `Optional` |                                  |

### BlessOverride、Debug、Entries、Serial、Tools

<span style="color:#FF3030">初始配置略过</span>

## NVRAM

### Add

#### 7C436110-AB2A-4BBB-A880-FE41995C9F82

删除 `#INFO (prev-lang:kbd)` 选项。注释的说明文档，没有实际功能。

`boot-args` 选项

- `-v` 调试模式，在启动 macOS 时显示调试代码而不是 apple 图标，能清楚的显示启动时的调试代码及抛出的异常。
- `keepsyms=1` 启动时出现严重的内核崩溃情况显示调试代码而不是重启。
- `alcid=1` AppleALC.kext 的仿冒声卡参数
- `agdpmod=pikera` 用于 WhateverGreen.kext 驱动 AMD 的 5000 系列、6000 系列显卡，如果使用此系列的显卡添加此参数防止黑屏，如果是免驱显卡不用添加此参数。

根据需要添加以上参数，每个参数中间需要加入空格。例：`-v keepsyms=1 agdpmod=pikera alcid=1`

#### csr-active-config

完整性系统保护（SIP）设置为 `00000000`

#### prev-lang:kbd

安装的 macOS 系统默认地区、语言

- 英语：Type 为`String`Value 为`en:252`
- 中文：Type 为`String`Value 为`zh:0`

设置地区、语言的完整列表可以在[AppleKeyboardLayouts.txt](https://github.com/acidanthera/OpenCorePkg/blob/master/Utilities/AppleKeyboardLayouts/AppleKeyboardLayouts.txt)查找。

冒号前面的 `zh` 为设置的默认地区。后面的 `0` 为键盘类型，中国大陆使用的是美国通用 QWER 键盘。

### Delete、LegacyOverwrite、LegacySchema

<span style="color:#FF3030">初始配置略过</span>

### WriteFlash

启用

## PlatformInfo

### Generic

如果是十代 i7 或者以下处理器拥有核显并使用独立显卡机型设置为`iMac20,1`，

如果是十代 i9 或者以上处理器拥有核显并使用独立显卡机型设置为`iMac20,2`，

如果处理器没有核显使用独立显卡机型设置为`MacPro7,1`，

如果使用核显连接显示输出机型设置为`Macmini8,1`，

选择机型是为了更好的兼容硬件，与白苹果更接近的机型可以在安装时少走弯路。使用三码生成工具生成以下参数

```
SystemProductName:iMac20,2
SystemSerialNumber:<生成参数>
MLB:<生成参数>
SystemUUID:<生成参数>
ROM:<> // 留空
```

### Automatic、CustomMemory、UpdateDataHub、UpdateNVRAM、UpdateSMBIOS、UpdateSMBIOSMode、UseRawUuidEncoding

<span style="color:#FF3030">初始配置略过</span>

## UEFI

### ConnectDrivers

启用

### Drivers

此处添加`.efi`驱动，位于 OpenCore 解压文件的 `./X64/EFI/OC/Drivers` 文件夹下。
需要添加以下驱动：`OpenRuntime.efi`、`OpenHfsPlus.efi`

### APFS、AppleInput、Audio、Input、Output、ProtocolOverrides、Quirks、ReservedMemory

<span style="color:#FF3030">初始配置略过</span>

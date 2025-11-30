# 使用 OpenCore 引导安装黑苹果

![award](/images/awo.png)

## 简介

> OpenCore (简称 OC)是一个着眼于未来的开源引导工具，最初诞生于 HermitCrabs 实验室，现在接手于 Acidanthera，其目的是创造一个更加严谨的模组化的轻量引导系统。尽管 OpenCore 的主要用途是黑苹果，它也支持其他操作系统的引导。
>
> 此文档只能作为探索的起点，请仔细阅读并时刻牢记你的硬件可能有不同的配置需求。

## 阅读

::: info 相关阅读
推荐大家在阅读本文档的同时也可以阅读以下资料。
:::

[OpenCore 官方文档](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf) - OpenCore 最权威的资料，有能力可以看。

[OpenCore 简体中文参考手册](https://oc.skk.moe/)

[OpenCore 安装指南](https://dortania.github.io/OpenCore-Install-Guide/)

[精解 OpenCore - 黑果小兵](https://blog.daliansky.net/OpenCore-BootLoader.html)

[使用 OpenCore 引导黑苹果 - Xjn's Blog](https://blog.xjn819.com/post/opencore-guide.html)

## 软件下载

- [ProperTree](https://github.com/corpnewt/ProperTree)
- [OpenCore](https://github.com/acidanthera/OpenCorePkg/releases)
- [Hackintool](https://github.com/headkaze/Hackintool/releases)

## BIOS 设置

::: tip 提示
在设置 BIOS 之前需要将所有 BIOS 选项恢复为默认。
:::

- 禁用

| 英文              | 中文           |          设置 |
| ----------------- | -------------- | ------------: |
| Fast Boot         | 快速启动       | Disabled/禁用 |
| CFG Lock          | CFG 锁         | Disabled/禁用 |
| VT-d              | VT-d           | Disabled/禁用 |
| CSM               | 兼容性支持模块 | Disabled/禁用 |
| Intel SGX         | Intel SGX      | Disabled/禁用 |
| Legacy RTC Device | 传统 RTC 设备  | Disabled/禁用 |

- 启用

| 英文                | 中文                 |         设置 |
| ------------------- | -------------------- | -----------: |
| VT-x                | VT-x                 | Enabled/启用 |
| Above 4G decoding   | 大于 4G 地址空间解码 | Enabled/启用 |
| Hyper Threading     | 处理器超线程         | Enabled/启用 |
| Execute Disable Bit | 执行禁止位           | Enabled/启用 |
| EHCI/XHCI Hand-off  | 接手 EHCI/XHCI 控制  | Enabled/启用 |
| OS type             | 操作系统类型         |     Other OS |

::: danger 提示

1. 将操作系统设置为 "Other OS" 模式部分主板会将系统认作是 Windows 7 从而禁用 UEFI 的某些功能并开启 CSM，如果出现此问题可设置为 "Windows 8.1/10"。200 系以后的主板理论上不存在这个问题。
2. 以上选项在其他主板上可能出现不存在的设置项，忽略掉即可。

:::

## 整理 OpenCore 目录

解压下载好的 OpenCore 文件，把 Doc 文件夹里面的 Sample.plist 改名为 config.plist，并把此文件移动到 EFI 目录里。

打开 EFI/Kexts，把常用的一些 kexts 放进去，一般情况下需要放以下 Kexts:

- [Lilu.kext](https://github.com/acidanthera/Lilu/releases) - 黑苹果必备驱动
- [VirtualSMC.kext](https://github.com/acidanthera/VirtualSMC/releases) - 传感器驱动依赖
- SMCProcessor.kext - CPU 核心传感器
- SMCSuperIO.kext - IO 传感器
- [WhateverGreen.kext](https://github.com/acidanthera/WhateverGreen/releases) - 显卡驱动
- [IntelMausi.kext](https://github.com/acidanthera/IntelMausi/releases) - Intel 类千兆网卡驱动
- [Applealc.kext](https://github.com/acidanthera/AppleALC/releases) - 声卡驱动
- [Usbinjectall.kext](https://github.com/Sniki/OS-X-USB-Inject-All/releases) - USB 驱动
- [NVMeFix.kext](https://github.com/acidanthera/NVMeFix/releases)

打开 EFI/Drives，里面的驱动介绍如下:

- OpenRuntime.efi 内存运用等必要的插件，**必须安装**
- [HfsPlus.efi](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi) 用于 HFS 格式文件系统，**必须安装**

::: tip 提示
以上所展示的是初始配置必要安装的驱动，其他驱动初始配置阶段可略过
:::

- AudioDxe.efi 开机 UEFI 若需要声音效果需要加载
- CrScreenshotDxe.efi 开机 UEFI 的截图工具
- HiiDatabase.efi 用于给 Ivy Bridge (3 代酷睿) 或更老代主板上支持 UEFI 字体渲染，UEFI Shell 中文字渲染异常时使用，新主板不需要
- NvmExpressDxe.efi 用于在 Haswell (4 代酷睿) 或更老的主板上支持 NVMe 硬盘，新主板不需要
- OpenCanopy.efi 加载第三方开机主题
- OpenUsbKbDxe.efi 给使用模拟 UEFI 的老主板在 OpenCore 界面正常输入用的，请勿在 Ivy Bridge (3 代酷睿)及以上的主板上使用
- Ps2KeyboardDxe.efi PS2 键盘所需插件
- Ps2MouseDxe.efi PS2 鼠标所需插件
- UsbMouseDxe.efi 当 MacOS 被安装在虚拟机上所需要的鼠标插件
- XhciDxe.efi 用于在 Sandy Bridge（2 代）及之前或更老的主板上加载 XHCI 控制器

整理好的文件应该是这样

```
EFI
├─ BOOT
│  └─ BOOTx64.efi
└─ OC
   ├─ ACPI
   ├─ Drivers
   │  ├─ OpenRuntime.efi
   │  └─ HfsPlus.efi
   ├─ Kext
   │  ├─ Lilu.kext
   │  ├─ VirtualSMC.kext
   │  ├─ SMCProcessor.kext
   │  ├─ SMCSuperIO.kext
   │  ├─ WhateverGreen.kext
   │  ├─ IntelMausi.kext
   │  ├─ Applealc.kext
   │  ├─ Usbinjectall.kext
   │  └─ NVMeFix.kext
   ├─ Resources
   ├─ Tools
   ├─ OpenCore.efi
   └─ config.plist
```

::: tip 结束
至此前期准备工作告一段落
:::

## 配置 config.plist

- [ACPI](./config/acpi.md)
- [Booter](./config/booter.md)
- [DeviceProperties](./config/deviceproperties.md)
- [Kernel](./config/kernel.md)
- [Misc](./config/misc.md)
- [NVRAM](./config/nvram.md)
- [PlatformInfo](./config/platforminfo.md)
- [UEFI](./config/uefi.md)
<hr>

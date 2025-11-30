# 其他优化项

以下的优化项不影响黑苹果的运行状态，只是为了在 OC 的引导过程中的一些修改。

## 优化 OC 引导界面的标题

配置项 `Misc` -> `Security` -> `ExposeSensitiveData`: <span style="color:#FF3030">2</span>

官方的文档中的描述：用于向操作系统暴露敏感数据的位掩码（总和）。

实际配置中，发现对引导黑苹果没有特别的影响，也可能没发现，最明显的差异是在 OC 引导界面选择系统时标题的差异。

有以下值可供选择：

- `0x01` 将可打印的引导器路径作为 UEFI 变量暴露出来
- `0x02` 将 OpenCore 版本作为 UEFI 变量暴露出来
- `0x04` 将 OpenCore 版本暴露在启动选择菜单的标题位置
- `0x08` 将 OEM 信息作为一组 UEFI 变量暴露出来

在这里选择的值为 `2` 没有什么特别的原因，只是因为这样显示标题比较顺眼。

![后台管理](/images/oca.png)

## 修改 OC 引导的等待时间

配置项 `Misc` -> `Boot` -> `Timeout`: <span style="color:#FF3030">10</span>

官方的文档中的描述：开机引导菜单中，启动默认启动项之前超时时间（以秒为单位）。 使用 `0` 禁用倒计时。

改为 `10` 在开机后等待 10 秒钟进入默人的系统，使用 4K 显示器的黑苹果硬件可能会在引入 OC 引导的过程中出现 1 ～ 2 秒钟的黑屏，给自己长点的时间选择要进入的系统。

## 注册 OC 引导

配置项 `Misc` -> `Boot` -> `LauncherOption`: <span style="color:#FF3030">Full</span>

配置项 `UEFI` -> `Quirks` -> `RequestBootVarRouting`: <span style="color:#FF3030">True</span>

官方的文档中的描述：在固件偏好设置中注册启动器选项，以保证 bootloader 的持久与一致性。

在这里要说明一下整个计算机启动的一个整体过程：

1.  计算机硬件通电
2.  加载 BIOS 系统
3.  加载操作系统(Windows、Linux、MacOS)
4.  启动系统

整体而言可以归纳为这么四个步骤，至于详细的启动流程非专业人士不需要了解更多。而 OC 引导就在启动过程中的第 2 步和第 3 步介入，并对硬件做一些优化修改使之更符合 MacOS 的标准。在拥有 Windows 和 MacOS 双系统时有可能 Windows 的更新或者其他的情况导致 OC 的介入失败。此配置就是在第 2 步之后永远让 OC 作为第一启动项，之后的系统启动通过 OC 选择。

对于 `LauncherOption` 选项有以下值可供选择：

- `Disabled` 什么都不做。
- `Full` 在 bootloader 启动时，在 UEFI 变量存储中创建或更新最高优先级的启动项。要使用这个选项，必须同时开启 `RequestBootVarRouting`。
- `Short` 创建一个短的、非完整的启动项。此值对于某些固件很有用（例如：Insyde），或者其他无法处理完整设备路径的固件。
- `System` 不创建启动项，而是认为该项是 blessed 的。这种 variant 在依赖 `ForceBooterSignature` 属性和 OpenCore 启动器路径时非常有用。管理是通过 bless 工具进行的，不涉及 OpenCore。

## 启用 KASLR 方式内存注入

内存注入方式包括 KASLR 方式(分布式注射到各个内存地址中)以及连续性方式。在使用 KASLR 时，PCIe 加载到内存，可能会占据所有 avaliable 值而影响 OC 的内核以及内核缓存无法注入，导致启动失败。

KASLR 是更加高效的内存注入方式，但不代表每台机器都能使用这种方案，文档中提供两种关于内存的设置：

1. 开启 KASLR 内存注入方式:

   - `DevirtualiseMmio` 设置 `True`
   - `ProtectUefiServices` 设置 `True`
   - 删除 `boot-args` 中的 `slide=1` 参数
   - 删除 `Drivers` 中的 `Memoryallocations.efi` 驱动

2. 开启连续性内存注入方式:

   - `DevirtualiseMmio` 设置 `True`
   - `ProtectUefiServices` 设置 `False`
   - 保留 `boot-args` 中的 `slide=1` 参数
   - 保留 `Drivers` 中的 `Memoryallocations.efi` 驱动

# Kernel

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

这里是内核相关选项。

## Add

这里是填写 kexts 的相关资料，需要注意的是 OC 的 kexts 填写必须注意顺序，比如 `applealc.kext` 的依赖是 `lilu.kext` 那么 `lilu.kext` 必须填在 `applealc.kext` 之前，很多 kexts 都依赖 `lilu.kext` 把 `lilu.kext` 放在第一个以保证不会出错。

默认配置很多需要的补丁已经配置好了，只需要把 Enabled 选项设置为 True 开启配置，不用的删除

```sh{4}

Item 0
   BundlePath        String      Lilu.kext               //Kexts文件
   Comment           String
   Enabled           Boolean     True                    //打开
   ExecutablePath    String      Contents/MacOS/Lilu
   MaxKernel         String
   MinKernel         String
   PlistPath         String      Contents/Info.plist

```

初始配置阶段可以只添加必要的 kexts ，例如:lilu.kext(必备)、Virtualsmc.kext(电源)、WhateverGreen.kext(显卡)、Usbinjectall.kext(USB)。

## Block

<span style="color:#FF3030">初始配置略过</span>

禁用 kexts 。

## Emulate

<span style="color:#FF3030">初始配置略过</span>

此选项设置 Ivy Bridge 和一些不受支持的 CPU 加载电源管理的。

## Force

<span style="color:#FF3030">初始配置略过</span>

特殊情况下设置强制加载某些 Kexts 开启某些功能。

## Patch

<span style="color:#FF3030">初始配置略过</span>

配置内核补丁。

## Quirks

这里设置内核相关的选项, 比较重要。

- AppleCpuPmCfgLock: <span style="color:#FF3030">False</span>

  - 四代之前的 CPU，如果未解锁 CFG(MSROxE2) 请选择 <span style="color:#FF3030">True</span>

- AppleXcpmCfgLock: <span style="color:#FF3030">False</span>

  - 四代之后的 CPU，如果未解锁 CFG(MSROxE2) 请选择 <span style="color:#FF3030">True</span>

- AppleXcpmExtraMsrs: <span style="color:#FF3030">False</span>

  - 在没有原生电源管理的 CPU 上启用，一般(<span style="color:#FF3030">Haswell-E</span>、<span style="color:#FF3030">Broadwell-E</span>、<span style="color:#FF3030">Skylake-X</span>)这三种 CPU 需要设置 <span style="color:#FF3030">True</span> 除此之外的 CPU 设置 <span style="color:#FF3030">False</span>。

- AppleXcpmForceBoost: <span style="color:#FF3030">False</span>

  - 开启此选项电脑的 CPU 频率锁定为最高。

- CustomPciSerialDevice: <span style="color:#FF3030">False</span>

  - 在一个定制的 PCI 串行设备上修改 PMIO 寄存器的基本地址。

- CustomSMBIOSGuid: <span style="color:#FF3030">False</span>

  - 戴尔笔记本专用项。

- DisableIoMapper: <span style="color:#FF3030">False</span>

  - 开启此选项禁用 VT-d ，一些主板的 BIOS 没有此选项却需要禁用 vt-d 可以开启此选项禁用。

- DisableIoMapperMapping: <span style="color:#FF3030">False</span>

  - 在 VT-d 中禁止映射 PCI 桥接设备内存。
    ::: info 注释
    无法修复 macOS 13.3 以前的系统。
    当在本机的 `DMAR` 表中包含一个或多个保留内存区域切启用核显 iGPU 并且安装了超过 16GB 内存的系统上启用 AppleVTD 时，此选项解决了与 Wi-Fi、以太网、Thunderbolt 设备的兼容性问题。
    :::

- DisableLinkeditJettison: <span style="color:#FF3030">True</span>

  - 提升 lilu 等插件在 macOS Big Sur 系统的表现。用来替代 `keepsyms=1`。

- DisableRtcChecksum: <span style="color:#FF3030">False</span>

  - 越过两条 RTC 检查(0x58、0x59)，更多使用 RTCMemoryFixup.kext 防止检查 RTC。

- ExtendBTFeatureFlags: <span style="color:#FF3030">False</span>

  - 将 `FeatureFlags` 设置为 `0x0F` 用来代替 `BT4LEContinuityFixup.kext` 以实现蓝牙的全部功能(包括连续互通功能)，较新的功能是否可以正常工作以及稳定性都无法保证。

- ExternalDiskIcons: <span style="color:#FF3030">False</span>

  - 修复 macOS 把内部硬盘识别为外置硬盘。

- ForceAquantiaEthernet: <span style="color:#FF3030">False</span>

  - 启用基于 Aquantia AQtion 的 10GbE 网卡支持。

- ForceSecureBootScheme: <span style="color:#FF3030">False</span>

  - 只在 MacOS 安装在虚拟机并开启 <span style="color:#FF3030">SecurebootModel</span> 时考虑开启。

- IncreasePciBarSize: <span style="color:#FF3030">False</span>

  - 解决卡 PCI configuration，一般卡 pci configuration 都是因为自己错误的设置和硬件问题。

- LapicKernelPanic: <span style="color:#FF3030">False</span>

  - 适用于 HP 笔记本的内核奔溃选项。

- LegacyCommpage: <span style="color:#FF3030">False</span>

  - 老平台主板中使用 ssse3 需要开启来使用 macOS 10.4 - 10.6。

- PanicNoKextDump: <span style="color:#FF3030">True</span>

  - 防止 kext 出错打报告而让我们看不到真正的 panic 原因, 初始排错时最好打开。

  ::: warning

  优化完毕后关闭

  :::

- PowerTimeoutKernelPanic: <span style="color:#FF3030">False</span>

  - 修复 macOS Catalina 中由于设备电源状态变化超时而导致的内核崩溃，如果有这个问题请选择 True。

- ProvideCurrentCpuInfo: <span style="color:#FF3030">False</span>

  - 给 hyper-V 虚拟化 macOS 时提供 CPU 的信息，保证全核同步。

- SetApfsTrimTimeout: <span style="color:#FF3030">0</span>

  - 为 SSD 上的 APFS 文件系统设置微秒级的 trim 超时时间。

::: warning

APFS 文件系统的设计方式是，空间由 Spaceman (The Space Manager) 结构控制，要么为已使用，要么为空闲。而其他文件系统，则可以被标记为 已使用、空闲 或 未映射。macOS 启动时，所有空闲的空间都会被 trim 处理。由于 DSM 命令的特性，每个命令最多拥有 256 个范围，因此 NVMe 驱动器的 trim 过程发生在 LBA 范围内。硬盘上存储的内容越分散，就需要越多的命令对所有空闲空间进行 trim。

Trim 过程耗时取决于 SSD 控制器和硬盘碎片，可能需要相当长的时间，导致启动时间肉眼可见地变长，APFS 驱动程序忽略之前未映射的区域，并在启动时一次又一次地对这些区域进行 trim。为了解决开机速度慢的问题，macOS 驱动引入了一个超时时间（9.999999 秒）来中止未能及时完成的 trim 操作。

在一些控制器上（如三星）解除分配的过程较慢，很容易达到超时时间。从本质上讲，这意味着碎片级别很高，macOS 会尝试 trim 之前已经解除分配的低位区块，但永远没有足够的时间去解除分配高位区块。这意味着这些 SSD 安装后不久，trim 指令就会不起作用，导致闪存的额外损耗，甚至损坏。

解决这个问题的方法之一是将超时时间设置为一个非常高的值（例如：4294967295），这样将会以较长的启动时间（数分钟）为代价来确保所有的区块都被 trim 处理。另一种方法是利用超额配置（如果支持），或者创建一个专用的未映射分区，控制器可以在该分区中找到保留块。在这种情况下，可以设置一个非常低的超时时间来禁止 trim 操作，例如：999

注 1：Failsafe -1 表示不应用此补丁，这样 apfs.ext 将保持不动。

注 2：在 macOS 12.0 及以上版本中，不再可能指定 trim 超时时间。但可以通过设置为 0 来禁用 trim。

注 3：trim 操作只在启动阶段受到影响，当启动卷被加载时。无论是指定超时时间，或者设置为 0 完全禁用 trim，都不会影响正常的 MacOS 运行。

设置为 0 完全禁用 trim 只影响进入系统的启动阶段，对系统启动之后无影响。设置为 0 或 999 基本上没有差别，主要是 macOS 12.0 及以上版本，只有设置为 0 才能禁用 trim。

:::

- ThirdPartyDrives: <span style="color:#FF3030">False</span>

  - 开启 SATA 接口的 SSD 的 trim 功能，自行根据情况选择。

- XhciPortLimit: <span style="color:#FF3030">True</span>

  - 解除 15 个 USB 端口限制。

## Scheme

- CustomKernel: <span style="color:#FF3030">False</span>

  - 当使用 AMD/Atom 等 CPU 时请开启。

- FuzzyMatch: <span style="color:#FF3030">False</span>

  - 此选项是给 10.6 以及更早的系统使用,略过。

- KernelArch: <span style="color:#FF3030">Auto</span>

  - 此选项是给 10.7 以及更早的系统使用,略过。

- KernelCache: <span style="color:#FF3030">Auto</span>

  - 选择更加合适的内核缓存方式以提升启动速度。

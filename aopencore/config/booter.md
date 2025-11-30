# Booter

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

本部分允许在 Apple BootLoader （`boot.efi`）上应用不同种类的 UEFI 修改。目前，这些修改为不同的固件提供了各种补丁和环境更改。

对于 Booter 的配置顺序建议按照如下的顺序执行：
1. `Quirks`
2. `Patch`

如果是在第一次安装黑苹果的硬件上使用此功能请检查主板的BIOS设置，以下BIOS选项建议检查：

- 更新BIOS的最新固件（如果主板支持BIOS固件更新，具体方法请浏览各大主板的官网）
- 禁用**快速启动**相关配置`Fast Boot`和`Hardware Fast Boot`
- 启用**大于 4G 地址空间解码** `Above 4G decoding`
- 禁用`VT-d`
- 禁用`CFG Lock`
- 禁用**兼容性支持模块**`CSM`
- 启用`EHCI/XHCI Hand-off`功能。仅在系统启动过程中**出现USB相关报错**建议启用。
- 建议在BIOS中启用 `VT-x`、`Hyper Threading`、`Execute Disable Bit`。
- 可能在BIOS中禁用 `Thunderbolt Support`、`Intel SGX`、`Intel Platform Trust`。此配置不是必须的。

:::info 注
以上BIOS配置项在不同主板上都会略用不同，有些主板可能找不到相关选项，忽略即可。
:::

## MmioWhitelist

1. `Address`

    内存地址

2. `Comment`

    注释

3. `Enabled`

    设置为 `true` 则应用此条补丁。

以下是默认项的说明:

- 第一项是为 Haswell (4 代酷睿)芯片提供的内存寻址修复。
- 第二项是解决开机在 <span style="color:#FF3030">PCI Configuration</span> 这里卡住。ACPI、PCI device 同时释放到内存时发生 <span style="color:#FF3030">0x1000</span> 内存地址被占用导致在 <span style="color:#FF3030">PCI Configuration</span> 卡住。

## Patch

该功能可以对 Bootx64.efi 进行修改。

## Quirks

此项与 <span style="color:#FF3030">OpenRuntime.efi</span> 有关。这里的选项对于无法原生<span style="color:#FF3030">NVRAM</span>需要格外注意。

- AllowRelocationBlock: <span style="color:#FF3030">False</span>

  - 允许通过重定位块来启动 macOS。此功能用于 10.7 及更早的 MacOS 系统。

- AvoidRuntimeDefrag: <span style="color:#FF3030">True</span>

  - 防止 boot.efi 运行时执行内存碎片整理。这个选项修复了包括日期、时间、NVRAM、电源控制等 UEFI Runtime 服务。

- DevirtualiseMmio: <span style="color:#FF3030">True</span>

  - 从某些 MMIO 区域中删除 Runtime 属性。

> KASLR 是更加高效的内存注入方式，但不代表每台机器都能使用这种方案，这里我提供两种关于内存的设置:
>
> 1: 开启 KASLR 内存注入方式。
>
> - <span style="color:#FF3030">DevirtualiseMmio</span> 选择 <span style="color:#FF3030">True</span>
> - <span style="color:#FF3030">ProtectUefiServices</span> 选择 <span style="color:#FF3030">True</span>
> - 删除 <span style="color:#FF3030">NVRAM-Add</span> 中 <span style="color:#FF3030">boot-args</span> 里面的 <span style="color:#FF3030">slide=1</span>
> - 删除 <span style="color:#FF3030">Drivers</span> 文件夹下的 <span style="color:#FF3030">Memoryallocations.efi</span>
>
> 2: 开启连续性内存注入方式。
>
> - <span style="color:#FF3030">DevirtualiseMmio</span> 选择 <span style="color:#FF3030">True</span>
> - <span style="color:#FF3030">ProtectUefiServices</span> 选择 <span style="color:#FF3030">False</span>
> - 保留 <span style="color:#FF3030">NVRAM-Add</span> 中 <span style="color:#FF3030">boot-args</span> 里面的 <span style="color:#FF3030">slide=1</span>
> - 保留 <span style="color:#FF3030">Drivers</span> 文件夹下的 <span style="color:#FF3030">Memoryallocations.efi</span>

- DisableSingleUser: <span style="color:#FF3030">False</span>

  - 禁用 Apple 单用户模式。

- DisableVariableWrite: <span style="color:#FF3030">False</span>

  - 防止 macOS 获取 NVRAM 的写入权限。

    - 主板支持原生 <span style="color:#FF3030">NVRAM</span> 设置 <span style="color:#FF3030">True</span>
    - 主板不支持原生 <span style="color:#FF3030">NVRAM</span> 设置 <span style="color:#FF3030">False</span>

- DiscardHibernateMap: <span style="color:#FF3030">False</span>

  - 复用原始的休眠内存映射。台式机不需要讨论如何休眠(睡眠<span style="color:#FF3030">sleep</span>和休眠<span style="color:#FF3030">hibernation</span>是两个概念)。

- EnableSafeModeSlide: <span style="color:#FF3030">False</span>

  - 修补引导加载程序以在安全模式下启用 KASLR。
  - 启用此配置必须启用 <span style="color:#FF3030">ProvideCustomSlide</span>。

- EnableWriteUnprotector: <span style="color:#FF3030">True</span>

  - 保证 NVRAM 能正常写入而不受 `CR0` 寄存器的写入保护影响。

- ForceBooterSignature: <span style="color:#FF3030">False</span>

  - 将 macOS 启动器签名设置为 OpenCore 启动器。

- ForceExitBootServices: <span style="color:#FF3030">False</span>

  - 在失败时用新的内存映射（Memory Map）重试 `ExitBootServices`。
  - 是否启用这个 Quirk 取决于你是否遇到了 <span style="color:#FF3030">Early Boot</span> 故障。除非你详细了解这一选项可能导致的后果，否则请勿启用这一选项。

- ProtectMemoryRegions: <span style="color:#FF3030">False</span>

  - 保护内存区域免于不正确的读写。
  - 是否启用这一 Quirk 取决于你是否遇到了休眠、睡眠无法唤醒、启动失败或其他问题。

- ProtectSecureBoot: <span style="color:#FF3030">False</span>

  - 保护 UEFI 安全启动变量不被写入。

- ProtectUefiServices: <span style="color:#FF3030">True</span>

  - 保护 UEFI 服务不被固件覆盖。解决 Z390 系列主板卡开机卡++++的问题。

- ProvideCustomSlide: <span style="color:#FF3030">True</span>

  - 为低内存设备提供自定义 KASLR slide 值。

- ProvideMaxSlide: <span style="color:#FF3030">0</span>

  - 当更大的 LASLR slide 值不可用时，手动提供最大的 KASLR slide 值。

- RebuildAppleMemoryMap: <span style="color:#FF3030">False</span>

  - 生成与 macOS 兼容的内存映射。

  ::: info 注释
  由于许多固件自带的内存保护不正确，所以一般开启此选项的同时需要同时开启 `SyncRuntimePermissions` 。
  :::

- ResizeAppleGpuBars: <span style="color:#FF3030">-1</span>

  - 此选项用于适配 BIOS 具备 Resizable BAR 功能的主板，BIOS 支持此功能可以给 Windows 带来更好的显卡性能，但另一方面会导致 macOS 不稳定。
  - 填如下值对应相对功能:

    - 当值为 `-1` 时:关闭此功能
    - 当值为 `0` 时:预留 1MB
    - 当值为 `1` 时:预留 2MB
    - 当值为 `2` 时:预留 4MB
    - 当值为 `10` 时:预留 1GB
    - 若要开启此功能建议填 `0`

- SetupVirtualMap: <span style="color:#FF3030">True</span>

  - 是否建立虚拟内存并对物理内存进行映射。

- SignalAppleOS: <span style="color:#FF3030">False</span>

  - 此项是给 Apple 设备用的。

- SyncRuntimePermissions: <span style="color:#FF3030">False</span>

  - 修正硬件在注入内存时无法注入权限的问题。是否开启这一 `Quirk` 取决于是否遇到 `Early Boot` 故障(包括但不限于在黑屏时停止以及更明显的崩溃，影响同一台机子上的其他系统)如果无法进入 Windows 开启此选项。

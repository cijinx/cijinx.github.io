# UEFI

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

UEFI(统一可扩展接口)是一种规范，用于定义操作系统和平台固件之间的软件接口。本部分允许加载其他 UEFI 模块和对板载固件进行调整。

## APFS

APFS 分区驱动的相关配置项。

- EnableJumpstart: <span style="color:#FF3030">True</span>

  - 从一个 APFS 容器中加载 APFS 驱动。

- GlobalConnect: <span style="color:#FF3030">False</span>

  - 在 APFS 加载期间执行完整的设备连接。修复的惠普笔记本电脑读取 APFS 分区问题。

- HideVerbose: <span style="color:#FF3030">True</span>

  - 是否隐藏 APFS 驱动的 verbose 信息。

- JumpstartHotPlug: <span style="color:#FF3030">False</span>

  - 允许从进入 OpenCore 引导菜单后插入的可移除硬盘上的 APFS 容器中加载 APFS 驱动。

- MinDate: <span style="color:#FF3030">0</span>

  - 允许加载的最老 APFS 驱动的发布日期。`0` 自动设置。

- MinVersion: <span style="color:#FF3030">0</span>

  - 允许加载的最老 APFS 驱动的版本号。`0` 自动设置。

## AppleInput

配置 Apple 事件协议的重新实现。

- AppleEvent: <span style="color:#FF3030">Builtin</span>

  - 确定是使用 OpenCore 内置协议还是 OEM Apple Event 协议。

    - `Auto` 如果有可用的、已连接的和最近的，则使用 OEM Apple Event 实现，否则使用 OpenCore 的重新实现。
    - `Builtin` 始终使用 OpenCore 对 Apple Event 协议的最新重新实现。由于 OpenCore 对协议的重新实现进行了改进（更好的精细鼠标控制、可配置的按键延迟），因此即使在苹果硬件上也建议使用此设置。
    - `OEM` 假设苹果的协议在驱动程序连接时可用。

- CustomDelays: <span style="color:#FF3030">False</span>

  - 在使用 Apple Event 协议的 OpenCore 重新实现时，启用自定义的按键间隔时间。在使用 OEM 苹果实现时没有影响（见 AppleEvent 设置）。

    - `True` 使用 `KeyInitialDelay` 和 `KeySubsequentDelay` 的值。
    - `False` 使用 Apple 的默认值 500ms(50) 和 50ms(5)。

- GraphicsInputMirroring: <span style="color:#FF3030">True</span>

  - Apple 的 Apple Event 阻止图形应用程序中的键盘输入出现在基本控制台输入流中。所有硬件上的推荐设置是 `True` 。

- KeyInitialDelay: <span style="color:#FF3030">50</span>

  - 在 OpenCore 对 Apple Event 协议的重新实现中，配置键盘按键重复之前的初始延迟，单位为 10ms。

- KeySubsequentDelay: <span style="color:#FF3030">5</span>

  - 在 OpenCore 对 Apple Event 协议的重新实现中，配置键盘按键重复之间的间隔，单位为 10ms。

- PointerDwellClickTimeout: <span style="color:#FF3030">0</span>

  - 在 OpenCore 对 Apple Event 协议的重新实现中，以毫秒为单位配置指针停留点击单一左键的超时时间。当超时过后，在当前位置发出一次左键点击。`0` 表示超时被禁用。

- PointerDwellDoubleClickTimeout: <span style="color:#FF3030">0</span>

  - 在 OpenCore 对 Apple Event 协议的重新实现中，以毫秒为单位配置指针停留点击单左双击的超时。当超时过后，在当前位置发出一次左键双击。`0` 表示超时被禁用。

- PointerDwellRadius: <span style="color:#FF3030">0</span>

  - 在 OpenCore 对 Apple Event 协议的重新实现中，以像素为单位配置指针停留点击的容忍半径。

- PointerPollMask: <span style="color:#FF3030">-1</span>

  - 配置轮询指针的索引。`-1` 为所有设备。

- PointerPollMax: <span style="color:#FF3030">0</span>

  - 配置最大指针轮询周期，单位为 `ms`，这是 OpenCore 内置的 Apple Event 驱动程序轮询指针设备（如鼠标、触控板）的运动事件的最长时间。只要设备没有及时响应，该周期就会增加到这个值。目前的默认值为 80ms。 设置为 0 将使这一默认值保持不变。

- PointerPollMin: <span style="color:#FF3030">0</span>

  - 配置最小指针轮询周期，单位为 `ms`，这是 OpenCore 内置的 Apple Event 驱动程序轮询指针设备（如鼠标、触控板）的运动事件的最短时间。默认为 10 毫秒。设置为 0 将使这一默认值保持不变。

- PointerSpeedDiv: <span style="color:#FF3030">1</span>

  - 在 Apple Event 协议的 OpenCore 重新实现中配置指针速度除数。配合 `PointerSpeedMul` 实现鼠标移动比例。

- PointerSpeedMul: <span style="color:#FF3030">1</span>

  - 在 Apple Event 协议的 OpenCore 重新实现中配置指针速度乘数。配合 `PointerSpeedDiv` 实现鼠标移动比例。

## Audio

<span style="color:#FF3030">初始配置略过</span>

在开机 UEFI 阶段板载音频的驱动配置，此项对于 DP 等数字音频无效。与操作系统音频支持所需的任何配置（例如 AppleALC ）无关。

- AudioCodec: <span style="color:#FF3030">0</span>

  - 特定音频控制器上的编解码器地址，用于音频支持。

- AudioDevice: <span style="color:#FF3030">0</span>

  - 特定音频控制器的设备路径，用于音频支持。

- AudioOutMask: <span style="color:#FF3030">1</span>

  - 位字段，指示用于 UEFI 声音的输出通道。

- AudioSupport: <span style="color:#FF3030">False</span>

  - 通过连接到固件音频驱动程序以激活音频支持。

- DisconnectHda: <span style="color:#FF3030">False</span>

  - 在加载驱动程序之前，断开 HDA 控制器的连接

- MaximumGain: <span style="color:#FF3030">默认值</span>

  - 用于 UEFI 音频的最大增益，以分贝（dB）为单位。

- MinimumAssistGain: <span style="color:#FF3030">默认值</span>

  - 用于选择器音频辅助的最小增益（dB）。

- MinimumAudibleGain: <span style="color:#FF3030">默认值</span>

  - 尝试播放任何声音的最小增益，单位是分贝（dB）。

- PlayChime: <span style="color:#FF3030">Auto</span>

  - 开机时播放 Mac 特有的风铃的声音。

- ResetTrafficClass: <span style="color:#FF3030">False</span>

  - 将 HDA Traffic Class Select 寄存器设置为 `TC0`。

- SetupDelay: <span style="color:#FF3030">0</span>

  - 音频编解码器重新配置的延迟，以毫秒为单位。

## ConnectDrivers

True

驱动程序加载后执行 UEFI 控制器连接操作。

## Drivers

从 `./OC/Drivers` 目录下加载驱动。

## Input

输入(键盘和鼠标)个性化配置项。

- KeyFiltering: <span style="color:#FF3030">False</span>

  - 启用键盘输入的合理性检查。

- KeyForgetThreshold: <span style="color:#FF3030">默认值</span>

  - 两次按键之间的间隔时间。

- KeySupport: <span style="color:#FF3030">False</span>

  - 启用内部键盘输入转换为 AppleKeyMapAggregator 协议。

- KeySupportMode: <span style="color:#FF3030">Auto</span>

  - 将内部键盘的输入转换设置为 AppleKeyMapAggregator 协议模式。

- KeySwap: <span style="color:#FF3030">False</span>

  - 启用后将交换 `Command` 和 `Option`。

- PointerSupport: <span style="color:#FF3030">False</span>

  - 启用内部指针驱动器。

- PointerSupportMode: <span style="color:#FF3030">默认值</span>

  - 设置用于内部指针驱动程序的 OEM 协议。

- TimerResolution: <span style="color:#FF3030">0</span>

  - 固件始终刷新的频率。设置为`0`不改变固件的刷新频率。

## Output

输出(文本和图形)个性化配置项。

- ClearScreenOnModeSwitch: <span style="color:#FF3030">False</span>

  - 消除开机时从图形模式转换到文本时出现残影的问题。

- ConsoleFont: <span style="color:#FF3030">留空</span>

  - 指定用于 OpenCore 内置文本渲染器的控制台字体。

- ConsoleMode: <span style="color:#FF3030">留空</span>

  - 控制台的输出字符串分辨率。

- DirectGopRendering: <span style="color:#FF3030">False</span>

  - 为控制台使用内置的图形输出协议渲染器。

- ForceResolution: <span style="color:#FF3030">False</span>

  - 老旧的 CPU 核显需要开启此项来自定义分辨率。

- GopBurstMode: <span style="color:#FF3030">False</span>

  - 如果系统固件尚未启用 `write-combining (WC) caching for GOP memory`，则启用 `write-combining (WC) caching for GOP memory`。

- GopPassThrough: <span style="color:#FF3030">Disabled</span>

  - 在 UGA 环境中调用显卡 GOP。若要开启它，你必须同时开启`ProvideConsoleGop`。

- IgnoreTextInGraphics: <span style="color:#FF3030">False</span>

  - 修复在不使用 `-v` 跑马模式时候，开机日志导致的苹果 LOGO 显示不正确的问题。

- InitialMode: <span style="color:#FF3030">Auto</span>

  - OC 的渲染模式。

- ProvideConsoleGop: <span style="color:#FF3030">True</span>

  - 调用显卡 GOP。

- ReconnectGraphicsOnConnect: <span style="color:#FF3030">False</span>

  - 在驱动连接过程中重新连接所有的图形驱动。

- ReconnectOnResChange: <span style="color:#FF3030">False</span>

  - 一些固件在 GOP 分辨率改变后会重新连接显示器才能输出，一般情况下选择 NO。

- ReplaceTabWithSpace: <span style="color:#FF3030">False</span>

  - 一些固件在 UEFI Shell 下 Tab 功能键不生效，开启这个会用空格键代替。

- Resolution: <span style="color:#FF3030">留空</span>

  - 设置控制台的屏幕分辨率。

- SanitiseClearScreen: <span style="color:#FF3030">True</span>

  - 修复 4K 及以上显示器的输出问题。

- TextRenderer: <span style="color:#FF3030">BuiltinGraphics</span>

  - 选择通过标准控制台输出的渲染器。

- UIScale: <span style="color:#FF3030">0</span>

  - 用户界面的缩放系数。设置`0`根据分辨率自动缩放

- UgaPassThrough: <span style="color:#FF3030">False</span>

  - 在 GOP 协议实例的基础上提供 UGA 协议实例。

## ProtocolOverrides

- AppleAudio: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 Apple 音频协议。

- AppleBootPolicy: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 `Apple Boot Policy` 协议，可用于确保 VM 或旧版 Mac 设备上的 APFS 兼容性。

- AppleDebugLog: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 Apple 调试日志输出协议。

- AppleEg2Info: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 `Apple EFI Graphics 2` 协议。

- AppleFramebufferInfo: <span style="color:#FF3030">False</span>

  - 重新安装内置的 `Apple Framebuffer Info` 协议。

- AppleImageConversion: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 `Apple Image Conservation` 协议。

- AppleImg4Verification: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 `Apple IMG4` 验证协议。

- AppleKeyMap: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 `Apple Key Map` 协议。

- AppleRtcRam: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 `Apple RTC RAM` 协议。

- AppleSecureBoot: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 Apple 安全启动协议

- AppleSmcIo: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 SMC I/O 协议。

- AppleUserInterfaceTheme: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 `Apple User Interface Theme` 协议。

- DataHub: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 Data Hub 协议。如果已经安装了协议，这将删除所有先前的属性。

- DeviceProperties: <span style="color:#FF3030">False</span>

  - 用内置的版本替换 Device Property 协议。 这一选项可用于确保在 VM 或旧版 Mac 设备上的兼容性。

- FirmwareVolume: <span style="color:#FF3030">False</span>

  - 强制包装固件卷协议或安装新版本以支持 FileVault 2 的自定义光标图像。

- HashServices: <span style="color:#FF3030">False</span>

  - 用内置版本替换 Hash Services 协议。

- OSInfo: <span style="color:#FF3030">False</span>

  - 用内置版本替换 OS Info 协议。

- PciIo: <span style="color:#FF3030">False</span>

  - 用 64 位 MMIO 兼容的函数替换 Cpulo 和 PciRootBridgelo 中的函数，以修复使用 4G 解码时的无效参数。

- UnicodeCollation: <span style="color:#FF3030">False</span>

  - 用内置版本替换 Unicode Collation 服务。建议启用这一选项以确保 UEFI Shell 的兼容性。

## Quirks

- ActivateHpetSupport: <span style="color:#FF3030">False</span>

  - 激活 HPET 支持。

- DisableSecurityPolicy: <span style="color:#FF3030">False</span>

  - 禁用平台安全策略。

- EnableVectorAcceleration: <span style="color:#FF3030">True</span>

  - 启用 SHA-512 和 SHA-384 哈希算法的 AVX 矢量加速。这个选项可能会在某些笔记本电脑的固件上引起问题，包括联想。

- EnableVmx: <span style="color:#FF3030">False</span>

  - 启用英特尔虚拟机扩展。

- ExitBootServicesDelay: <span style="color:#FF3030">0</span>

  - 在 `EXIT_BOOT_SERVICES` 事件后添加延迟，单位为毫秒。

- ForceOcWriteFlash: <span style="color:#FF3030">False</span>

  - 启用所有 OpenCore 管理的 NVRAM 系统变量向闪存的写入。

- ForgeUefiSupport: <span style="color:#FF3030">False</span>

  - 在 `EFI 1.x` 固件上提供部分 `UEFI 2.x` 支持。

- IgnoreInvalidFlexRatio: <span style="color:#FF3030">False</span>

  - 某些类型的固件（例如：APTIO IV）可能在 `MSR_FLEX_RATIO（0x194）MSR` 寄存器中包含无效的值。这些值可能导致英特尔平台上的 macOS 启动失败。

- ReleaseUsbOwnership: <span style="color:#FF3030">False</span>

  - 尝试从固件驱动程序中释放 USB 控制器所有权。尽管大多数固件都设法正确执行了该操作或者提供有一个选项，但某些固件没有，从而导致操作系统可能会在启动时卡住。除非需要，否则不建议启用这一选项。

- ReloadOptionRoms: <span style="color:#FF3030">False</span>

  - 查询 PCI 设备并重新加载其可选 ROM（如果可用）。

- RequestBootVarRouting: <span style="color:#FF3030">True</span>

  - 增加 `启动磁盘` 的可靠性。

- ResizeGpuBars: <span style="color:#FF3030">-1</span>

  - 配置 GPU PCI BAR 的大小。

- ResizeUsePciRbIo: <span style="color:#FF3030">0</span>

  - 使用 `PciRootBridgeIo` 来调整 `GpuBars` 和 `ResizeAppleGpuBar`。

- TscSyncTimeout: <span style="color:#FF3030">0</span>

  - 尝试用指定的 Timeout 执行 TSC 同步。

- UnblockFsConnect: <span style="color:#FF3030">False</span>

  - 某些固件通过「按驱动程序」模式下来阻止引导项加载，导致文件系统协议无法安装。

## ReservedMemory

<span style="color:#FF3030">初始配置略过</span>

保留内存区域的起始地址，该区域应被分配为保留区，有效地将此类型的内存标记为操作系统不可访问。

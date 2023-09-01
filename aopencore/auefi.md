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

在开机阶段板载音频的驱动配置，此项对于 DP 等数字音频无效。

- AudioCodec: <span style="color:#FF3030">0</span>

  - 音频声卡 `in` 节点。

- AudioDevice: <span style="color:#FF3030">0</span>

  - 声卡路径。

- AudioOutMask: <span style="color:#FF3030">false</span>

  - 音频声卡 `out` 节点。

- AudioSupport: <span style="color:#FF3030">False</span>

  - 000

- DisconnectHda: <span style="color:#FF3030">false</span>

  - 000

- MaximumGain: <span style="color:#FF3030">false</span>

  - 000

- MinimumAssistGain: <span style="color:#FF3030">false</span>

  - 000

- MinimumAudibleGain: <span style="color:#FF3030">false</span>

  - 000

- PlayChime: <span style="color:#FF3030">Auto</span>

  - 000

- ResetTrafficClass: <span style="color:#FF3030">False</span>

  - 000

- SetupDelay: <span style="color:#FF3030">0</span>

  - 000

## ConnectDrivers

True

## Drivers

从 `./OC/Drivers` 目录下加载驱动。

## Input

输入(键盘和鼠标)个性化配置项。

- KeyFiltering: <span style="color:#FF3030">False</span>

  - 000

- KeyForgetThreshold: <span style="color:#FF3030">False</span>

  - 000

- KeySupport: <span style="color:#FF3030">False</span>

  - 000

- KeySupportMode: <span style="color:#FF3030">False</span>

  - 000

- KeySwap: <span style="color:#FF3030">False</span>

  - 000

- PointerSupport: <span style="color:#FF3030">False</span>

  - 000

- PointerSupportMode: <span style="color:#FF3030">False</span>

  - 000

- TimerResolution: <span style="color:#FF3030">False</span>

  - 000

## Output

输出(文本和图形)个性化配置项。

- ClearScreenOnModeSwitch: <span style="color:#FF3030">False</span>

  - 000

- ConsoleMode: <span style="color:#FF3030">Max</span>

  - 000

- DirectGopRendering: <span style="color:#FF3030">False</span>

  - 000

- ForceResolution: <span style="color:#FF3030">False</span>

  - 000

- GopBurstMode: <span style="color:#FF3030">Disabled</span>

  - 000

- GopPassThrough: <span style="color:#FF3030">Disabled</span>

  - 000

- IgnoreTextInGraphics: <span style="color:#FF3030">False</span>

  - 000

- InitialMode: <span style="color:#FF3030">False</span>

  - 000

- ProvideConsoleGop: <span style="color:#FF3030">True</span>

  - 000

- ReconnectGraphicsOnConnect: <span style="color:#FF3030">False</span>

  - 000

- ReconnectOnResChange: <span style="color:#FF3030">False</span>

  - 000 一些固件在 GOP 分辨率改变后会重新连接显示器才能输出，一般情况下选择 NO。

- ReplaceTabWithSpace: <span style="color:#FF3030">False</span>

  - 000

- Resolution: <span style="color:#FF3030">留空</span>

  - 000

- SanitiseClearScreen: <span style="color:#FF3030">True</span>

  - 000 修复 4K 及以上显示器的输出问题。

- TextRenderer: <span style="color:#FF3030">BuiltinGraphics</span>

  - 000

- UIScale: <span style="color:#FF3030">2</span>

  - 000

- UgaPassThrough: <span style="color:#FF3030">False</span>

  - 000

## ProtocolOverrides

- AppleAudio: <span style="color:#FF3030">False</span>

  - 000

- AppleBootPolicy: <span style="color:#FF3030">False</span>

  - 000

- AppleDebugLog: <span style="color:#FF3030">False</span>

  - 000

- AppleEg2Info: <span style="color:#FF3030">False</span>

  - 000

- AppleFramebufferInfo: <span style="color:#FF3030">False</span>

  - 000

- AppleImageConversion: <span style="color:#FF3030">False</span>

  - 000

- AppleImg4Verification: <span style="color:#FF3030">False</span>

  - 000

- AppleKeyMap: <span style="color:#FF3030">False</span>

  - 000

- AppleRtcRam: <span style="color:#FF3030">False</span>

  - 000

- AppleSecureBoot: <span style="color:#FF3030">False</span>

  - 000

- AppleSmcIo: <span style="color:#FF3030">False</span>

  - 000

- AppleUserInterfaceTheme: <span style="color:#FF3030">False</span>

  - 000

- DataHub: <span style="color:#FF3030">False</span>

  - 000

- DeviceProperties: <span style="color:#FF3030">False</span>

  - 000

- FirmwareVolume: <span style="color:#FF3030">False</span>

  - 000

- HashServices: <span style="color:#FF3030">False</span>

  - 000

- OSInfo: <span style="color:#FF3030">False</span>

  - 000

- UnicodeCollation: <span style="color:#FF3030">False</span>

  - 000

## Quirks

- ActivateHpetSupport: <span style="color:#FF3030">False</span>

  - 000

- DisableSecurityPolicy: <span style="color:#FF3030">False</span>

  - 000

- EnableVectorAcceleration: <span style="color:#FF3030">True</span>

  - 000

- EnableVmx: <span style="color:#FF3030">False</span>

  - 000

- ExitBootServicesDelay: <span style="color:#FF3030">0</span>

  - 000

- ForceOcWriteFlash: <span style="color:#FF3030">False</span>

  - 000

- ForgeUefiSupport: <span style="color:#FF3030">False</span>

  - 000

- IgnoreInvalidFlexRatio: <span style="color:#FF3030">False</span>

  - 000

- ReleaseUsbOwnership: <span style="color:#FF3030">False</span>

  - 000

- ReloadOptionRoms: <span style="color:#FF3030">False</span>

  - 000

- RequestBootVarRouting: <span style="color:#FF3030">True</span>

  - 000888

- ResizeGpuBars: <span style="color:#FF3030">-1</span>

  - 000

- ResizeUsePciRbIo: <span style="color:#FF3030">0</span>

  - 000

- TscSyncTimeout: <span style="color:#FF3030">0</span>

  - 000

- UnblockFsConnect: <span style="color:#FF3030">False</span>

  - 000

## ReservedMemory

# Misc

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

配置开机引导的设置选项。

## BlessOverride

<span style="color:#FF3030">初始配置略过</span>

用于覆盖 Windows bootmgfw.efi 的位置以便识别 Windows 引导项, OpenCore 和 Windows 的引导文件在同一硬盘的同一个 ESP 分区下使用。

## Boot

- ConsoleAttributes: <span style="color:#FF3030">0</span>

  - 设置开机选择界面的颜色，默认直接填 0。

- HibernateMode: <span style="color:#FF3030">None</span>

  - 检测休眠模式。与系统内的休眠模式 (hibernatemode 25) 配合, 引导进系统会还原休眠前的状态, 建议关闭。
  - None:关闭
  - Auto:自动检测 RTC 和 NVRAM 模式
  - RTC:RTC 模式

- HibernateSkipsPicker: <span style="color:#FF3030">False</span>

  - 从 macOS 唤醒时不显示 OC 启动选择器。

- HideAuxiliary: <span style="color:#FF3030">False</span>

  - 默认情况下，隐藏 OC 开机引导菜单中的辅助选项。
  - 「辅助选项」菜单包含以下选项

    - macOS Recovery 分区
    - macOS Time Machine 分区
    - OC 提供的功能(例: Reset NVRAM)

  - 在 OC 引导界面按空格可以查看被隐藏的辅助选项。

- LauncherOption: <span style="color:#FF3030">Full</span>

  - 在固件偏好设置中注册启动器选项,以保证 bootloader 的持久与一致性。保证在 BIOS 设置中选择 OC 作为第一启动项时不会被轻易改变。
  - 有效值:

    - Disabled - 不启动
    - Full - 在 bootloader 启动时,在 UEFI 变量中将 OC 创建为最高优先级启动项。要使用此选项必须同时开启 <span style="color:#FF3030">RequestBootVarRouting</span>。
    - Short - 创建一个短的、非完整的启动项。主要给 Insyde CPU 来使用并创建 OC 启动项。
    - System - 不创建启动项。

- LauncherPath: <span style="color:#FF3030">Default</span>

  - Default 用于引导 OpenCore.efi。其他的路径（例如：\EFI\Launcher.efi）可用来提供自定义加载器,用于自行加载 OpenCore.efi。

- PickerAttributes: <span style="color:#FF3030">17</span>

  - 使用 OC 主题时的配置项。
  - <span style="color:#FF3030">初始配置略过</span>

- PickerAudioAssist: <span style="color:#FF3030">False</span>

  - 主题开机音相关。
  - <span style="color:#FF3030">初始配置略过</span>

- PickerMode: <span style="color:#FF3030">Builtin</span>

  - 启动管理器的界面,支持以下值:

    - Builtin — 使用由 OpenCore 处理的启动管理器,简单的文本用户界面。
    - External — 如果可用,则使用外部启动管理器协议,否则使用 Builtin 模式。
    - Apple — 如果可用,则使用 Apple 启动管理器,否则使用 Builtin 模式。

- PickerVariant: <span style="color:#FF3030">Auto</span>

  - 选择启动管理器所使用的图标集,一般在加载主题时使用。

- PollAppleHotKeys: <span style="color:#FF3030">False</span>

  - 开启功能快捷键

- ShowPicker: <span style="color:#FF3030">True</span>

  - 显示开机启动盘

- TakeoffDelay: <span style="color:#FF3030">0</span>

  - 开机功能快捷键延时,开机来不及按功能快捷键可以设置更大的值(5000/10000)有充足的时间按快捷键,(ms 毫秒)。

- Timeout: <span style="color:#FF3030">10</span>

  - 倒计时进入默认选择的硬盘,在 OC 界面如果用户不选择启动盘,系统将在设置的时间之后自动进入默认选择的硬盘。

## Debug

<span style="color:#FF3030">初始配置略过</span>

Debug 模式。

## Entries

<span style="color:#FF3030">初始配置略过</span>

添加引导路径。

## Security

- AllowSetDefault: <span style="color:#FF3030">True</span>

  - 是否在 OC 界面设置默认启动盘。设置快捷键 `Ctrl + Enter`。

- ApECID: <span style="color:#FF3030">0</span>

  - Apple Enclave 标识符。将此值设置为任何非零的 64 位整数,将允许使用个性化的 Apple 安全启动标识符。如果这个值设置妥当,并且 SecureBootModel 值有效且不是 Disabled,那么就可以实现 Apple 安全启动的 完整安全性。

- AuthRestart: <span style="color:#FF3030">False</span>

  - 启用与 VirtualSMC 兼容的 authenticated restart。VirtualSMC 通过将磁盘加密密钥拆分保存在 NVRAM 和 RTC 中来执行 authenticated restart。虽然 OpenCore 在启动系统后立刻删除密钥,但是这仍然可能被视为安全隐患。因此这个选项是可选的。

- BlacklistAppleUpdate: <span style="color:#FF3030">False</span>

  - 忽略某些用于更新 Apple 外围固件的启动项（例如:MultiUpdater.efi）。

- DmgLoading: <span style="color:#FF3030">Any</span>

  - 定义用于 macOS Recovery 的磁盘映像（Disk Image, DMG）加载策略。

    - Disabled — 加载 DMG 磁盘映像的行为将会失败。大多数情况下 Disabled 策略仍会允许加载 macOS Recovery，因为通常会有 boot.efi 文件，它与 Apple 安全启动兼容。但是，手动下载存储在 com.apple.recovery.boot 目录中的 DMG 磁盘映像将无法被加载。
    - Signed — 仅加载 Apple 签名的 DMG 磁盘映像。由于 Apple 安全启动的设计，不管 Apple 安全启动是什么状态，Signed 策略都会允许加载任何 Apple 签名的 macOS Recovery，这可能并不总是令人满意。虽然使用已签名的 DMG 磁盘映像更可取，但验证磁盘映像签名可能会稍微减慢启动时间（最多 1 秒）。
    - Any — 任何 DMG 磁盘映像都会作为普通文件系统挂载。强烈不建议使用 Any 策略，当激活了 Apple 安全启动时会导致启动失败。

- EnablePassword: <span style="color:#FF3030">False</span>

  - 为敏感操作启用密码保护。

- ExposeSensitiveData: <span style="color:#FF3030">2</span>

  - 用于向操作系统暴露敏感数据的位掩码（总和）。

    - 0x01 — 将可打印的引导器路径作为 UEFI 变量暴露出来
    - 0x02 — 将 OpenCore 版本作为 UEFI 变量暴露出来
    - 0x04 — 将 OpenCore 版本暴露在启动选择菜单的标题位置
    - 0x08 — 将 OEM 信息作为一组 UEFI 变量暴露出来

- HaltLevel: <span style="color:#FF3030">默认</span>

  - EDK II 调试级别的位掩码（总和），使 CPU 在获得 HaltLevel 消息后中止（停止执行）。可能的值与 DisplayLevel 值相匹配。

- PasswordHash: <span style="color:#FF3030">留空</span>

  - 密码使用的哈希值（Hash）。

- PasswordSalt: <span style="color:#FF3030">留空</span>

  - 密码使用的加盐值（Salt）。

- ScanPolicy: <span style="color:#FF3030">0</span>

  - 定义操作系统检测策略。

- SecureBootModel: <span style="color:#FF3030">Disabled</span>

  - Apple 安全启动的机型。

    - Default — 最近的可用型号，目前设置为 j137
    - Disabled — 无机型，禁用 Apple 安全启动

::: danger 警告
并非所有的苹果安全启动模式都支持所有的硬件配置。
:::

- Vault: <span style="color:#FF3030">Optional</span>

  - 启用 OpenCore 的 Vault 机制。

    - Optional — 无要求，不设置 Vault，不安全。
    - Basic — 需要有 vault.plist 文件存放在 OC 目录下。这个值提供了基本的文件系统完整性验证，可以防止无意中的文件系统损坏。
    - Secure — 需要有 vault.sig 签名的 vault.plist 文件存放在 OC 目录下。这个值包括了 Basic 完整性检查，但也会尝试建立一个可信的引导链。

## Serial

- Init: <span style="color:#FF3030">False</span>

  - 执行串口初始化。

    - 该选项将在启用（任何）调试记录之前，在 OpenCore 内执行串行端口初始化。

- Override: <span style="color:#FF3030">False</span>

  - 覆盖串行端口属性。如果此选项设置为 False，则不会覆盖来自自定义的任何串行端口属性。

## Tools

将工具选项添加到 OC 开机引导菜单中。

# PlatformInfo

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

## Automatic

True

## CustomMemory

False

## Generic

- AdviseFeatures: <span style="color:#FF3030">True</span>

  - 用支持的 bit 更新 `FirmwareFeatures`，升级 macOS 时可能需要该选项。

- MLB: <span style="color:#FF3030">false</span>

  - 000

- MaxBIOSVersion: <span style="color:#FF3030">0</span>

  - 将 `BIOSVersion` 设置为 `9999.999.999.999.999`，在使用 Automatic PlatformInfo 时推荐用于旧版的 Mac，以避免在非官方支持的 macOS 版本中进行 BIOS 更新。

- ProcessorType: <span style="color:#FF3030">0</span>

  - 000

- ROM: <span style="color:#FF3030">false</span>

  - 000

- SpoofVendor: <span style="color:#FF3030">True</span>

  - 将 SMBIOS 中的 Vendor 字段设置为 `Acidanthera`。

- SystemMemoryStatus: <span style="color:#FF3030">Auto</span>

  - 用来表示内存是否可以更换和升级，此值也控制着「关于本机」中「内存」选项卡的可见性。

- SystemProductName: <span style="color:#FF3030">false</span>

  - 000

- SystemSerialNumber: <span style="color:#FF3030">false</span>

  - 000

- SystemUUID: <span style="color:#FF3030">DDF44B32-F002-B6FA-6507-F02F741AAFD6</span>

  - 000

## UpdateDataHub

True

## UpdateNVRAM

True

## UpdateSMBIOS

True

## UpdateSMBIOSMode

Create

## UseRawUuidEncoding

False

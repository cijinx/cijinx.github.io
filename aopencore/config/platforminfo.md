# PlatformInfo

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

## Automatic

True

基于 `Generic` 属性而不是 `DataHub`、`NVRAM` 和 `SMBIOS` 属性生成机型信息。

默人的 OC 配置项中使用的是`Generic`，不需要考虑其他的配置机型的方式。只需要开启此项，并在下面的`Generic`配置项中正确填写相关配置即可。

## CustomMemory

False

使用 OC 自定义内存开启此项则会完全取代 SMBIOS 中任何现有的内存配置。只有当 `UpdateSMBIOS` 设置为 `True` 时才生效。

## Generic

- AdviseFeatures: <span style="color:#FF3030">True</span>

  - 用支持的 bit 更新 `FirmwareFeatures`，升级 macOS 时可能需要该选项。

- MLB: <span style="color:#FF3030">M0000000000000001</span>

  - 生成三码填写

- MaxBIOSVersion: <span style="color:#FF3030">0</span>

  - 将 `BIOSVersion` 设置为 `9999.999.999.999.999`，在使用 Automatic PlatformInfo 时推荐用于旧版的 Mac，以避免在非官方支持的 macOS 版本中进行 BIOS 更新。

- ProcessorType: <span style="color:#FF3030">0</span>

  - 一些因特尔 ES、QS 或其他不能正确显示 CPU 的处理器及 AMD 的 CPU 配置正确的 CPU 及核心数。

- ROM: <span style="color:#FF3030">空</span>

  - 此处留空

- SpoofVendor: <span style="color:#FF3030">True</span>

  - 将 SMBIOS 中的 Vendor 字段设置为 `Acidanthera`。

- SystemMemoryStatus: <span style="color:#FF3030">Auto</span>

  - 用来表示内存是否可以更换和升级，此值也控制着「关于本机」中「内存」选项卡的可见性。

- SystemProductName: <span style="color:#FF3030">iMac19,1</span>

  - 配置机型

- SystemSerialNumber: <span style="color:#FF3030">W00000000001</span>

  - 生成三码填写

- SystemUUID: <span style="color:#FF3030">00000000-0000-0000-0000-000000000000</span>

  - 生成三码填写

## UpdateDataHub

True

更新 `Data Hub` 字段。根据 `Automatic` 的值，这些字段会从 `Generic` 或 `DataHub` 中读取。

## UpdateNVRAM

True

是否更新 NVRAM 中关于机型信息的相关字段。

## UpdateSMBIOS

True

更新 `SMBIOS` 字段。根据 `Automatic` 的值，这些字段会从 `Generic` 或 `SMBIOS` 中读取。

## UpdateSMBIOSMode

Create

更新 SMBIOS 字段的方式。

## UseRawUuidEncoding

False

对 `SMBIOS` 的 `UUID` 使用原始编码。

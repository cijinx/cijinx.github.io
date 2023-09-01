# ACPI

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

ACPI（Advanced Configuration and Power Interface，高级配置和电源接口）是发现和配置计算机硬件的开放标准。这里先把 Root 下面的几条 `#WARNING` 删除，这几条没有实际意义。

## Add

<span style="color:#888">这部分主要添加不同硬件需要用的 DSDT 以及 SSDT 文件。</span>

<table>
  <tr>
    <td>CPU硬件</td>
    <td>CPU</td>
    <td>EC</td>
    <td>AWAC</td>
    <td>NVRAM</td>
    <td>USB</td>
  </tr>
  <tr>
    <td>Skylake(七代)</td>
    <td rowspan="4">SSDT-PLUG</td>
    <td rowspan="4">SSDT-EC-USBX</td>
    <td>/</td>
    <td>/</td>
    <td>/</td>
  </tr>
  <tr>
    <td>Kaby Lake(八代)</td>
    <td>/</td>
    <td>/</td>
    <td>/</td>
  </tr>
  <tr>
    <td>Coffee Lake(九代)</td>
    <td rowspan="2">SSDT-AWAC</td>
    <td>SSDT-PMC</td>
    <td>/</td>
  </tr>
  <tr>
    <td>Comet Lake(十代)</td>
    <td>/</td>
    <td>SSDT-RHUB</td>
  </tr>
</table>

## Delete

<span style="color:#FF3030">初始配置略过</span>

<span style="color:#888">这部分主要设置禁用的 DSDT 以及 SSDT 文件。</span>

## Patch

<span style="color:#FF3030">初始配置略过</span>

<span style="color:#888">这部分是配置热补丁的选项。</span>

## Quirks

此目录下有以下配置项,初始配置与解释如下:

- FadtEnableReset: <span style="color:#FF3030">False</span>

  - 在 FADT 表中提供寄存器复位标志，用于修复旧硬件的重启和关机。除非不启用就无法关机和重启，否则不建议启用。

- NormalizeHeaders: <span style="color:#FF3030">False</span>

  - 清理 ACPI 表头字段以解决 macOS ACPI 实现错误导致的引导崩溃。一些主板的 ACPI 表需要打开这个修复 macOS 10.13 系统的启动。

- RebaseRegions: <span style="color:#FF3030">True</span>

  - 尝试试探性地重新定位 ACPI 内存区域，使用自定义 DSDT 则必须开启。

- ResetHwSig: <span style="color:#FF3030">False</span>

  - 启用这一选项可以解决固件无法在重新启动过程中保持硬件签名导致的休眠唤醒问题。

- ResetLogoStatus: <span style="color:#FF3030">False</span>

  - 无法在有 BGRT 表的系统上显示 OEM Windows 标志的硬件需要开启。

- SyncTableIds: <span style="color:#FF3030">False</span>

  - 解决当用 Opencore 引导 windows 7 及更早的系统时，因缺少 SLIC 表而无法激活 windows 的问题。

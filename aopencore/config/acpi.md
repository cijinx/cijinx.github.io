# ACPI

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

ACPI（Advanced Configuration and Power Interface，高级配置和电源接口）是发现和配置计算机硬件的开放标准。这里先把 Root 下面的几条 `#WARNING` 删除，这几条没有实际意义。

## Add

添加的 ACPI 表存放在`./OC/ACPI/`目录中。

<span style="color:#888">这部分主要添加不同硬件需要用的 DSDT 以及 SSDT 文件。</span>

<table>
  <tbody>
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
  </tbody>
</table>

## Delete

<span style="color:#888">从 ACPI 栈中删除选定的表。</span>

1. `All`

   如果设置为 `true` ，则所有符合条件的 ACPI 表都会被删除。否则只删除第一个匹配到的。

2. `Comment`

   注释。

3. `Enabled`

   设置为 `true` 将删除匹配到的 ACPI 表。即此条目生效。

4. `OemTableId`

   将表的 OEM ID 作为匹配值。

5. `TableLength`

   设置匹配的大小，填写 `0` 不设置匹配大小，将匹配到任意大小。

6. `TableSignature`

   设置表的签名作为匹配值。

::: info 注
当需要匹配多处时即 `All` 的值为 `true` 时，不要设置表的签名 `TableSignature` 的值。尤其是在不同类型的重命名操作的时候。
:::

## Patch

<span style="color:#888">添加或删除的 ACPI 的二进制热补丁。</span>

1. `Base`

   为重命名补丁指定一个 ACPI 路径，让 OC 通过取得该路径的偏移量来查找（或替换）重命名补丁。留空时忽略。

   只支持正确的**绝对路径**（例如：`\_SB.PCI0.LPCB.HPET`）。目前支持的类型有：`Device`、`Field`、`Method`。

2. `BaseSkip`

   OC 查找和替换之前跳过找到 `Base` 的数。设置为 `0` 不跳过。

3. `Comment`

   注释

4. `Count`

   应用此补丁的数量，设置为 `0` 应用到所有找到的匹配 `Base` 的数量。

5. `Enabled`

   设置为 `true` 应用此条 ACPI 补丁

6. `Find`

   找到的 Data，如果设置长度必须和 `Replace` 相等。

   ::: info 注
   如果留空那么当指定 `Base` 时，查询到 `Base`会立即生效。
   :::

7. `Limit`

   要查询的最大字节数，如果设置值为 `0` 那么将会查询整个 ACPI 表

8. `Mask`

   **查询比较期间**使用的数据（按位掩码）。通过忽略未屏蔽位进行模糊查询（设置为 `0`），如果设置，此值的长度必须和 `Replace` 相等。

9. `OemTableId`

   将表的 OEM ID 作为匹配值。

10. `Replace`

    替换数据。

11. `ReplaceMask`

    **替换数据期间**使用的数据（按位掩码）。通过忽略未屏蔽位进行模糊查询（设置为 `0`），如果设置，此值的长度必须和 `Replace` 相等。

12. `Skip`

    在应用替换之前要跳过的找到的数量。设置为 `0` 不跳过任何事件。

13. `TableLength`

    将表的大小匹配为此处所设置的值。

14. `TableSignature`

    将表的签名匹配为此处所设置的值。

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

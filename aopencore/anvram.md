# NVRAM

> 本文档会把 config 的项目分开来，内容繁琐，请仔细阅读相关配置项。配置 `config.plist` 强制要求在 Windows 环境下使用 <span style="color:#FF3030">Propertree</span> 来编辑，其他任何软件都不建议使用。

NVRAM 注入（如引导标识符和 SIP）
设置易失性 UEFI 变量（通常被称作 NVRAM 变量）。使用 man nvram 获取详细信息。macOS 广泛使用 NVRAM 变量使 操作系统、BootLoader、固件 之间互通，因此需要提供多个 NVRAM 变量才能正常运行 macOS。

## Add

```sh
4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14
   DefaultBackgroundColor      Data       <00000000> //默认开机背景色为黑色

7C436110-AB2A-4BBB-A880-FE41995C9F82
   boot-args                   String     -v
   csr-active-config           Data       <E7030000> //关闭 SIP 保护
   prev-lang:kbd               String     zh:0 //语言设置相关,这个是中文
   ForceDisplayRotationInEFI   Number     0
```

## Delete

<span style="color:#FF3030">初始配置略过</span>

根据官方的说法在上一个配置项中(2.6.1-Add)添加的选项只有在本身不存在且未被屏蔽的情况下才会被设置,如果想要覆盖一个现有的变量值,需要先在此处(2.6.2-Delete)将现有的值删除才能添加。

## LegacyOverwrite

False

允许用 `nvram.plist` 文件中的变量覆盖现有 NVRAM 中的变量。

## LegacySchema

## WriteFlash

False

允许将所有添加的变量写入闪存。

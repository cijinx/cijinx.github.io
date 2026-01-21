# 删除 config 多余配置项

OC 的 config 配置文件是针对各种不同的硬件平台，根据不同个性化配置将所有配置项全部展示出来，但是在默认的配置文件中有些是针对特殊的硬件的配置项。如果针对自己的硬件平台并没有启用的配置项，而这些配置项的父级选项为`Array`类型则可以删除这些配置项（完全是强迫症，不做此步骤完全不影响）。<span style="color:#FF3030">删除这些项目前请确保没有对其做定制化的修改并且没有生效的配置项。</span>

## APCI

删除`Delete`、`Patch`中的<span style="color:#FF3030">子项目</span>。

## Booter

删除`MmioWhitelist`、`Patch`中的<span style="color:#FF3030">子项目</span>。

## Kernel

删除`Block`、`Force`、`Patch`中的<span style="color:#FF3030">子项目</span>。

## Misc

- Debug
  - DisplayLevel:<span style="color:#FF3030">0</span>
  - Target:<span style="color:#FF3030">0</span>

删除`Entries`中的<span style="color:#FF3030">子项目</span>。

## UEFI

删除`ReservedMemory`中的<span style="color:#FF3030">子项目</span>。

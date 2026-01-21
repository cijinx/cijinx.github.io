# Linux

## PVE 安装初始设置

### 合并 local 与 local-lvm 逻辑卷

1. 显示所有逻辑卷

```sh
df -h
```

其中 `/dev/mpper/pve-root` 是系统自动给 local 的可用空间。

2. 删除 local-lvm 逻辑卷

```sh
lvremove pve/data
```

3. 将可用空间分配给 local

```sh
lvextend -l +100%FREE -r pve/root
```

4. 重新加载逻辑卷应用调整后的设置

```sh
resize2fs /dev/mapper/pve-root
```

5. 调整 local 逻辑卷的存储文件类型

登录 PVE 的 web 管理界面

数据中心->存储->"local-lvm"->移除->"local"->编辑->内容->全选->"OK"

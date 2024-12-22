# DNS 信息收集-NSLOOKUP

## ping

```sh
ping www.baidu.com
```

使用 commond+c 退出。

也可以使用`ping <网址> -c <数量>`指定发送数量，例如：

```sh
ping www.baidu.com -c 1
```

## nslookup

```sh
nslookup www.baidu.com
```

## dig

语法：`dig <选项> <域名>`

```sh
dig www.baidu.com
```

`dig`指定解析服务器，例如：

```sh
dig @114.114.114.114 www.baidu.com
```

`dig`查询指定类型，例如：

```sh
dig www.baidu.com A
```

其中，A 表示查询 A 记录，即 IPv4 地址。
使用`any`查询所有记录，例如：

```sh
dig www.baidu.com any
```

通过 IP 地址查询域名，例如：

```sh
dig -x 8.8.8.8
```

查询 dns 域名服务器使用的`bind`的软件版本信息，例如：

```sh
dig txt chaos version.bind @ns1.dns.org
```

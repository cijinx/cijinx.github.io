# ping

## ping

## arping

```sh
#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Usage - ./arping.sh <interface>"
    echo "Example - ./arping.sh eth0"
    echo "Example will perform an ARP scan of the local subnet to which eth0 is assigned"
    exit
fi
interface=$1 # 将用户输入的接口名称赋值给变量interface
prefix=$(ifconfig $interface | grep -oP '(?<=inet\s)\d+(\.\d+){2}') # 使用正则表达式从ifconfig命令的输出中提取IP地址的前缀
for addr in $(seq 1 254); do # 遍历从1到254的地址
    arping -c 1 ${prefix}.${addr} | grep "bytes from" | awk '{print $5}' # 使用arping命令发送ARP请求，并使用grep和awk命令提取响应中的IP地址
done
```

## netdiscover

主动扫描

```sh
netdiscover -i eth0 -r 10.0.0.0/24
```

被动扫描

```sh
netdiscover -p
```

## hping3

```sh
hping3 -c 100 -d 120 -S -w 64 -p 80 --flood --rand-source 192.168.1.100 target_ip
```

## fping

单个地址

```sh
fping 10.0.0.1 -c 1
```

多个地址

```sh
fping -g 10.0.0.0/24 -c 1
```

多个地址，结果输出到文件

```sh
fping -g 10.0.0.0/24 -c 1 > output.txt
```

## nc

扫描端口

```sh
nc -nv -z -w 1 10.0.0.1 1-100
```

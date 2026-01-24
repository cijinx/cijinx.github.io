# Redis 文档

```sh
docker run -d --name=redis-stack -p 6379:6379 -p 8001:8001 \
 -e REDIS_ARGS="--requirepass abc123456" \
 -v /local-data/:/data \
 -v `pwd`/local-redis-stack.conf:/redis-stack.conf \
 redis/redis-stack:latest
```

```sh
docker run -d --name=redis-stack -p 6379:6379 -p 8001:8001 \
 -e REDIS_ARGS="--requirepass abc123456" \
 -v /Users/martin/Documents/AppData/redis-stack/data:/data \
 -v /Users/martin/Documents/AppData/redis-stack/conf/redis-stack.conf:/redis-stack.conf \
 redis/redis-stack:latest
```

```sh
docker run -d --name=redis-stack -p 6379:6379 -p 8001:8001 \
 -v /Users/martin/Documents/AppData/redis-stack/data:/data \
 -v /Users/martin/Documents/AppData/redis-stack/conf/redis-stack.conf:/redis-stack.conf \
 redis/redis-stack:latest
```

-v /local-data/:/data \

# 持久化本地存储

-v `pwd`/local-redis-stack.conf:/redis-stack.conf \

# 使用本地配置文件

# OpenAI AI 界面

`docker-compose.yml`文件：

```yaml
services:
  openai:
    container_name: openai
    image: ghcr.io/open-webui/open-webui:v0.5.4
    restart: always
    network_mode: host
    ports:
      - 8280:8080
    volumes:
      - /Users/martin/Documents/AppData/openai/data:/app/backend/data
    environment:
      - TZ=Asia/Shanghai
      - OLLAMA_BASE_URL=http://10.0.0.2:11434
```

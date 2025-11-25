---
layout: home
---

<MdEditor v-model="text" />

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref(`
# 标题
## 简介
## 相关链接
## 详细文档
`);
</script>

---
layout: home
---

<MdEditor v-model="text" @onSave="onSave"></MdEditor>

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

const onSave = (txt, html) => {
const blob = new Blob([txt],{ type: 'text/markdown' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'document.md';
a.click();
URL.revokeObjectURL(url);
};

</script>

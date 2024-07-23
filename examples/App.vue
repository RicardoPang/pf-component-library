<template>
  <div class="app">
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<!-- examples用于本地运行 测试 查看效果等 -->
<!-- components 存放所有组件 类似存放package中 -->
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

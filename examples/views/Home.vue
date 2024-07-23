<template>
  <div class="nav-container">
    <h1 class="nav-title">组件</h1>
    <ul class="nav-list">
      <li v-for="(item, index) in list" :key="index" class="nav-item">
        <router-link :to="item.path" class="nav-link">
          {{ item.text }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ref([
  {
    path: '/basic',
    text: '基础组件'
  },
  {
    path: '/form',
    text: 'Form组件'
  },
  {
    path: '/vscroll',
    text: '虚拟滚动列表组件'
  },
  {
    path: '/tree',
    text: 'Tree 组件'
  }
])
</script>

<style scoped>
.nav-container {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.nav-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 10px 0;
}

.nav-link {
  display: block;
  padding: 10px 15px;
  font-size: 18px;
  color: #555;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.nav-link:hover {
  background-color: #e3f2fd;
  color: #0d47a1;
  border-color: #0d47a1;
}

.nav-link:active {
  background-color: #bbdefb;
  color: #0d47a1;
}

.nav-link.active {
  background-color: #0d47a1;
  color: #fff;
  border-color: #0d47a1;
}
</style>

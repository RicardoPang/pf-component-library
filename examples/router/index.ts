import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Basic from '../views/Basic.vue'
import Form from '../views/Form.vue'
import VirtualScroll from '../views/VirtualScroll.vue'
import VirtualScrollDetail from '../views/VirtualScrollDetail.vue'
import Tree from '../views/Tree.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/basic',
      name: 'basic',
      component: Basic
    },
    {
      path: '/form',
      name: 'form',
      component: Form
    },
    {
      path: '/vscroll',
      name: 'vscroll',
      component: VirtualScroll
    },
    {
      path: '/virtualScrollDetail',
      name: 'virtualScrollDetail',
      component: VirtualScrollDetail
    },
    {
      path: '/tree',
      name: 'tree',
      component: Tree
    }
  ]
})

export default router

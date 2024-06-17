import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Container from '../components/Container/src/Container.vue'

const data = [
  {
    icon: 'house',
    name: '首页(基础组件)',
    index: '/'
  },
  {
    icon: 'location-dot',
    name: '省市区选择',
    index: '/chooseArea'
  },
  {
    icon: 'sort',
    name: '趋势标记',
    index: '/trend'
  },
  {
    icon: 'clock',
    name: '时间选择',
    index: '/chooseTime'
  },
  {
    icon: 'bell',
    name: '通知菜单',
    index: '/notification'
  },
  {
    icon: 'bars',
    name: '导航菜单',
    index: '/menu'
  },
  {
    icon: 'arrows-turn-right',
    name: '城市选择',
    index: '/chooseCity'
  },
  {
    icon: 'bars-progress',
    name: '进度条',
    index: '/progress'
  },
  {
    icon: 'calendar',
    name: '日历',
    index: '/calendar'
  },
  {
    icon: 'gear',
    name: '表单',
    index: '/form'
  },
  {
    icon: 'medal',
    name: '弹出框表单',
    index: '/modalForm'
  },
  {
    icon: 'table',
    name: '表格',
    index: '/table'
  }
]

const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Container,
      props: {
        data
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        }
      ]
    }
  ]
})

export default router

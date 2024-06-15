import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'PF组件库',
  description: '基于vue3+ts的组件库',
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '指南',
        link: '/'
      },
      {
        text: '组件',
        link: '/components/button'
      }
    ],

    sidebar: [
      {
        text: '组件',
        items: [
          {
            text: 'Button 按钮',
            link: '/components/button'
          },
          {
            text: 'Collpase 折叠面板',
            link: '/components/collapse'
          },
          {
            text: 'Dropdown 下拉菜单',
            link: '/components/dropdown'
          },
          {
            text: 'Icon 图标',
            link: '/components/icon'
          },
          {
            text: 'Message 消息提示',
            link: '/components/message'
          },
          {
            text: 'Tooltip 文字提示',
            link: '/components/tooltip'
          },
          {
            text: 'Input 文字输入',
            link: '/components/input'
          },
          {
            text: 'Switch 开关',
            link: '/components/switch'
          },
          {
            text: 'Select 选择器',
            link: '/components/select'
          },
          {
            text: 'Form 表单',
            link: '/components/form'
          }
        ]
      }
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/RicardoPang/pf-component-library'
      },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/pf-component-library'
      }
    ]
  }
})

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
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
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
      },
      {
        text: '文章',
        link: '/components/git'
      }
    ],

    sidebar: [
      {
        text: '基础组件',
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
      },
      {
        text: '复杂组件',
        items: [
          {
            text: 'VirtualScroll 虚拟滚动',
            link: '/components/virtualScroll'
          },
          {
            text: 'Tree 树形控件',
            link: '/components/tree'
          }
        ]
      },
      {
        text: '我的文章',
        items: [
          {
            text: 'Git指令整理',
            link: '/components/git'
          },
          {
            text: 'Git 代码回滚',
            link: '/components/gitRollback'
          },
          {
            text: '使用-.gitignore-忽略-git-仓库中的文件',
            link: '/components/gitignore'
          },
          {
            text: '前端工程化',
            link: '/components/engineering'
          },
          {
            text: '前端网络请求-TypeScrpt封装Axios',
            link: '/components/network'
          },
          {
            text: '大文件上传',
            link: '/components/bigFile'
          },
          {
            text: '深入浅出：理解浏览器与 Node.js 的 Event Loop',
            link: '/components/eventLoop'
          },
          {
            text: '前端性能优化',
            link: '/components/performance'
          },
          {
            text: '前端监控与埋点',
            link: '/components/monitor'
          },
          {
            text: '前端脚手架',
            link: '/components/cli'
          },
          {
            text: 'Node Library依赖分析',
            link: '/components/library'
          },
          {
            text: '前端组件库',
            link: '/components/ui'
          },
          {
            text: '深入理解Webpack',
            link: '/components/webpack'
          },
          {
            text: '从零开始实现一个简化版 Webpack 打包器',
            link: '/components/miniWebpack'
          },
          {
            text: '深入理解Vue',
            link: '/components/vue'
          },
          {
            text: '微信小程序',
            link: '/components/program'
          },
          {
            text: '从零开始，手写完整的Promise原理',
            link: '/components/promise'
          },
          {
            text: '前端必备技术栈',
            link: '/components/basicAbility'
          },
          {
            text: '前端缓存',
            link: '/components/cache'
          },
          {
            text: '掌握设计模式，构建高效代码',
            link: '/components/design'
          },
          {
            text: 'Node文件处理',
            link: '/components/fs'
          },
          {
            text: '深入解析V8引擎：JavaScript对象存储与性能优化',
            link: '/components/googlev8'
          },
          {
            text: 'HTTP',
            link: '/components/http'
          },
          {
            text: 'web开发',
            link: '/components/koa'
          },
          {
            text: '从零开始实现一个简化版 Webpack 打包器',
            link: '/components/miniWebpack'
          },
          {
            text: '移动端适配',
            link: '/components/mobile'
          },
          {
            text: 'Typescript 安全编码的秘密武器',
            link: '/components/typescript'
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

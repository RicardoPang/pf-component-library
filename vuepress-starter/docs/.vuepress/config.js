import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',

  title: 'pf-component-library 组件库',
  description: '基于vue3+ts的组件库',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/RicardoPang/pf-component-library'
      },
      {
        text: 'Npm',
        link: 'https://www.npmjs.com/package/pf-component-library'
      }
    ],

    sidebar: [
      '/',
      '/componentDocs/card',
      '/componentDocs/button',
      '/componentDocs/icon'
    ]
  }),

  bundler: viteBundler()
})

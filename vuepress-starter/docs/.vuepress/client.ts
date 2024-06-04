import { defineClientConfig } from '@vuepress/client'
import './public/fonts/iconfont.css'
import './styles/button.less'
import './styles/icon.less'
import Card from './components/card.vue'
import Button from './components/button.vue'
import Icon from './components/icon.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('PFCard', Card)
    app.component('PFButton', Button)
    app.component('PFIcon', Icon)
  }
})

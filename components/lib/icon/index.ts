import type { App } from 'vue'
import '../../css/fonts/iconfont.css'
import Icon from './src/main.vue'

Icon.name = 'PFIcon'

const install = (app: App): void => {
  app.component(Icon.name as string, Icon)
}

export default {
  install
}

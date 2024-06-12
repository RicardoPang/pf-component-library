import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './src/Icon.vue'

library.add(fas)

const install = (app: App): void => {
  app.component(Icon.name as string, Icon)
}

export default {
  install
}

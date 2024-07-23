import type { App } from 'vue'
import Select from './src/Select.vue'

/**
 * components目录是用来存放组件库。components/lib目录下每个组件（如Select, Button, Form等）都有自己的index方法。这个方法使得每个组件可以通过Vue的插件安装机制被添加到Vue应用中
 * 这种方式允许用户在Vue应用中全局或按需使用这些组件
 */
const install = (app: App): void => {
  app.component(Select.name as string, Select)
}

export default {
  install
}

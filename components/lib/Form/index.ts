import type { App } from 'vue'
import Form from './src/Form.vue'
import FormItem from './src/FormItem.vue'

const install = (app: App): void => {
  app.component(Form.name as string, Form)
  app.component(FormItem.name as string, FormItem)
}

export default {
  install
}

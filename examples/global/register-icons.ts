import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from '../utils'

function registerIcons(app: App<Element>) {
  // el-icon-xxx
  for (const i in ElementPlusIconsVue) {
    // 注册全部组件
    app.component(`el-icon-${toLine(i)}`, (ElementPlusIconsVue as any)[i])
  }
}

export default registerIcons

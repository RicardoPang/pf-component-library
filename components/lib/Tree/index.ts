import type { App } from 'vue'
import Tree from './src/Tree.vue'
import TreeNode from './src/TreeNode.vue'

const install = (app: App): void => {
  app.component(Tree.name as string, Tree)
  app.component(TreeNode.name as string, TreeNode)
}

export default {
  install
}

export interface MenuProps {
  // 导航菜单的数据
  data: any[]
  // 默认选中的菜单
  defaultActive?: string
  // 是否是路由模式
  router?: boolean
  // 菜单标题的键名
  name?: string
  // 菜单标识的键名
  index?: string
  // 菜单图标的键名
  icon?: string
  // 菜单子菜单的键名
  children?: string
}

export interface MenuItem {
  // 导航图标
  icon?: string
  // 处理之后的图标
  i?: any
  // 导航名称
  name: string
  // 导航标识
  index: string
  // 导航子菜单
  children?: MenuItem[]
}

export interface InfiniteMenuProps {
  data: MenuItem[]
  // 默认选中的菜单
  defaultActive?: string
  // 是否是路由模式
  router?: boolean
  // 菜单标题的键名
  name?: string
  // 菜单标识的键名
  index?: string
  // 菜单图标的键名
  icon?: string
  // 菜单子菜单的键名
  children?: string
}

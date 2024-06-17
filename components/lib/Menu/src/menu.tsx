import { defineComponent, useAttrs } from 'vue'
import Icon from '../../Icon/src/Icon.vue'
import type { PropType } from 'vue'
import type { MenuItem } from './types'

export default defineComponent({
  name: 'PfInfiniteMenu',
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    // 默认选中的菜单
    defaultActive: {
      type: String,
      default: ''
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false
    },
    // 菜单标题的键名
    name: {
      type: String,
      default: 'name'
    },
    // 菜单标识的键名
    index: {
      type: String,
      default: 'index'
    },
    // 菜单图标的键名
    icon: {
      type: String,
      default: 'icon'
    },
    // 菜单子菜单的键名
    children: {
      type: String,
      default: 'children'
    }
  },

  setup(props) {
    const renderMenu = (data: any[]) => {
      return data.map((item) => {
        item.i = item[props.icon!]
        const slots = {
          title: () => {
            return (
              <>
                <Icon icon={item.i} />
                <span class="pf-menu-title">{item[props.name!]}</span>
              </>
            )
          }
        }
        if (item[props.children] && item[props.children].length > 0) {
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              {renderMenu(item[props.children!])}
            </el-sub-menu>
          )
        }
        return (
          <el-menu-item index={item[props.index]}>
            <Icon icon={item.i} />
            <span class="pf-menu-title">{item[props.name]}</span>
          </el-menu-item>
        )
      })
    }

    const attrs = useAttrs()
    return () => {
      return (
        <el-menu
          class="pf-menu-vertical-demo"
          {...attrs}
          default-active={props.defaultActive}
          router={props.router}
        >
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})

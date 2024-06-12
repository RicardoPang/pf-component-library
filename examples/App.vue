<template>
  <div class="app">
    <pf-button ref="buttonRef" @click="open">Test Button</pf-button>
    <pf-button plain @click="close">Plain Button</pf-button>
    <pf-button round>Round Button</pf-button>
    <pf-button circle>黑</pf-button>
    <pf-button disabled>Disabled Button</pf-button><br /><br />
    <pf-button type="primary">Primary</pf-button>
    <pf-button type="success">Success</pf-button>
    <pf-button type="info">Info</pf-button>
    <pf-button type="warning">Warning</pf-button>
    <pf-button type="danger">Danger</pf-button><br /><br />
    <pf-button type="primary" plain>Primary</pf-button>
    <pf-button type="success" plain>Success</pf-button>
    <pf-button type="info" plain>Info</pf-button>
    <pf-button type="warning" plain>Warning</pf-button>
    <pf-button type="danger" plain>Danger</pf-button><br /><br />
    <pf-button size="large">Large</pf-button>
    <pf-button size="small">Small</pf-button><br /><br />
    <pf-button size="large" loading>Loading</pf-button>
    <pf-button size="large" icon="arrow-up">Icon</pf-button><br /><br />
    <pf-button type="primary" disabled>Primary</pf-button>
    <pf-button type="success" disabled>Success</pf-button>
    <pf-button type="primary" plain disabled>Primary</pf-button>
    <pf-button type="success" plain disabled>Success</pf-button>

    <br /><br />
    <pf-collapse v-model="openedValue">
      <pf-collapse-item name="a" title="Title A">
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </pf-collapse-item>
      <pf-collapse-item name="b" title="Title B">
        <div>this is bbbbb test</div>
      </pf-collapse-item>
      <pf-collapse-item name="c" title="Disabled Title" disabled>
        <div>this is cccc test</div>
      </pf-collapse-item>
    </pf-collapse>

    <br /><br />
    <pf-tooltip content="hello tooltip">
      <pf-button> 激活 Tooltip </pf-button>
    </pf-tooltip>
    <br /><br />
    <pf-tooltip content="hello tooltip" placement="top-start">
      <pf-button> top-start </pf-button>
    </pf-tooltip>

    <pf-tooltip content="hello tooltip" placement="bottom-start">
      <pf-button> bottom-start </pf-button>
    </pf-tooltip>

    <pf-tooltip content="hello tooltip" placement="left-start">
      <pf-button> left-start </pf-button>
    </pf-tooltip>

    <pf-tooltip content="hello tooltip" placement="right-start">
      <pf-button> right-start </pf-button>
    </pf-tooltip>

    <br /><br />
    <pf-tooltip content="hello tooltip" trigger="click">
      <pf-button> 点击激活 Tooltip </pf-button>
    </pf-tooltip>

    <br /><br />
    <pf-tooltip trigger="click">
      <pf-button> 复杂 HTML 结构的Tooltip </pf-button>
      <template #content>
        <h3>this is the title</h3>
        <p>this is the content</p>
      </template>
    </pf-tooltip>

    <br /><br />
    <pf-tooltip content="hello tooltip" ref="tooltipRef" manual>
      <pf-button> 手动容器 </pf-button>
    </pf-tooltip>

    <br /><br />
    <pf-button type="primary" @click="open"> 点击手动触发显示 </pf-button>
    <pf-button type="danger" @click="close"> 点击手动触发隐藏 </pf-button>

    <br /><br />
    <pf-dropdown placement="bottom" :menu-options="options">
      <pf-button type="primary"> Hover 下拉菜单 </pf-button>
    </pf-dropdown>

    <br /><br />
    <pf-dropdown placement="bottom" :menu-options="options" trigger="click">
      <pf-button type="primary"> 点击触发下拉菜单 </pf-button>
    </pf-dropdown>

    <br /><br />
    <pf-dropdown
      placement="bottom"
      :menu-options="options"
      trigger="click"
      manual
      ref="tooltipRef"
    >
      <pf-button> 菜单容器 </pf-button>
    </pf-dropdown>
    <br /><br />
    <pf-button type="primary" @click="open"> 点击手动触发显示 </pf-button>
    <pf-button type="danger" @click="close"> 点击手动触发隐藏 </pf-button>

    <br /><br />
    <div class="basic block">
      <pf-button type="primary" @click="openMsg"> 创建一条消息 </pf-button>
      <pf-button @click="openMsg2"> 创建支持 VNode 的消息 </pf-button>
    </div>

    <br /><br />
    <pf-button @click="openMsg3('success')"> Success </pf-button>
    <pf-button @click="openMsg3('info')"> Info </pf-button>
    <pf-button @click="openMsg3('warning')"> warning </pf-button>
    <pf-button @click="openMsg3('danger')"> Danger </pf-button>

    <br /><br />
    <pf-button @click="openMsg"> 创建三条消息 </pf-button>
    <pf-button @click="closeAll"> 全部关闭 </pf-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import type { ButtonInstance } from '../components/lib/Button/src/types'
import type { MenuOption } from '../components/lib/Dropdown/src/types'
import { closeAll, createMessage } from '../components/lib/Message/src/method'
import type { TooltipInstance } from '../components/lib/Tooltip/src/types'

const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['collapse1'])
const size = ref<any>('3x')

const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

onMounted(() => {
  if (buttonRef.value) {
    // ref也会自动解包
    console.log('buttonRef', buttonRef.value.ref)
  }
  setTimeout(() => {
    openedValue.value = ['collapse1', 'collapse2']
    size.value = '2xl'
  }, 2000)
})

const tooltipRef = ref<TooltipInstance | null>(null)
console.log('🍌', tooltipRef)
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}

const openMsg = () => {
  createMessage({ message: 'Hello Message' })
}
const openMsg2 = () => {
  createMessage({ message: h('hi', 'this is bold') })
}

const openMsg3 = (type) => {
  createMessage({ message: 'hello Msg', type, showClose: true, duration: 3000 })
}
</script>

<style scoped>
.app {
  padding: 20px;
  color: #333;
}

.footer {
  padding: 0 8px;
  font-size: 12px;
  text-align: left;
}

.level {
  color: #9199a1;
  margin-bottom: 8px;
}

.price {
  color: #f01414;
}

.footer-spring {
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 12px;
}

.row-btns {
  margin-bottom: 8px;
}

.p-button {
  margin-right: 10px;
}

.block {
  margin-bottom: 20px;
}
</style>

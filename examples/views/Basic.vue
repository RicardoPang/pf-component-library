<!-- eslint-disable prettier/prettier -->
<template>
  <div class="home">
    <h3>Button 按钮</h3>
    <pf-button ref="buttonRef" @click="open">Test Button</pf-button>
    <pf-button plain @click="close">Plain Button</pf-button>
    <pf-button round>Round Button</pf-button>
    <pf-button circle>黑</pf-button>
    <pf-button disabled>Disabled Button</pf-button>
    <br />
    <br />
    <pf-button type="primary">Primary</pf-button>
    <pf-button type="success">Success</pf-button>
    <pf-button type="info">Info</pf-button>
    <pf-button type="warning">Warning</pf-button>
    <pf-button type="danger">Danger</pf-button>
    <br />
    <br />
    <pf-button type="primary" plain>Primary</pf-button>
    <pf-button type="success" plain>Success</pf-button>
    <pf-button type="info" plain>Info</pf-button>
    <pf-button type="warning" plain>Warning</pf-button>
    <pf-button type="danger" plain>Danger</pf-button>
    <br />
    <br />
    <pf-button size="large">Large</pf-button>
    <pf-button size="small">Small</pf-button>
    <br />
    <br />
    <pf-button size="large" loading>Loading</pf-button>
    <pf-button size="large" icon="arrow-up">Icon</pf-button>
    <br />
    <br />
    <pf-button type="primary" disabled>Primary</pf-button>
    <pf-button type="success" disabled>Success</pf-button>
    <pf-button type="primary" plain disabled>Primary</pf-button>
    <pf-button type="success" plain disabled>Success</pf-button>

    <br />
    <br />
    <h3>Icon 图标</h3>
    <pf-icon icon="arrow-up" />
    <pf-icon icon="pen-to-square" size="xl" />
    <pf-icon icon="share-nodes" type="primary" />
    <pf-icon icon="trash-can" color="#0e7a0d" />
    <pf-icon icon="magnifying-glass" size="xl" type="success" rotation="90" />
    <pf-icon
      icon="arrow-up-from-bracket"
      size="2x"
      type="danger"
      title="Upload"
    />
    <pf-icon icon="fa-spinner" spin />

    <br />
    <br />
    <h3>Collapse 折叠</h3>
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

    <br />
    <br />
    <h3>Tooltip 文字提示</h3>
    <pf-tooltip content="hello tooltip">
      <pf-button>激活 Tooltip</pf-button>
    </pf-tooltip>
    <br />
    <br />
    <pf-tooltip content="hello tooltip" placement="top-start">
      <pf-button>top-start</pf-button>
    </pf-tooltip>

    <pf-tooltip content="hello tooltip" placement="bottom-start">
      <pf-button>bottom-start</pf-button>
    </pf-tooltip>

    <pf-tooltip content="hello tooltip" placement="left-start">
      <pf-button>left-start</pf-button>
    </pf-tooltip>

    <pf-tooltip content="hello tooltip" placement="right-start">
      <pf-button>right-start</pf-button>
    </pf-tooltip>

    <br />
    <br />
    <pf-tooltip content="hello tooltip" trigger="click">
      <pf-button>点击激活 Tooltip</pf-button>
    </pf-tooltip>

    <br />
    <br />
    <pf-tooltip trigger="click">
      <pf-button>复杂 HTML 结构的Tooltip</pf-button>
      <template #content>
        <h3>this is the title</h3>
        <p>this is the content</p>
      </template>
    </pf-tooltip>

    <br />
    <br />
    <pf-tooltip content="hello tooltip" ref="tooltipRef" manual>
      <pf-button>手动容器</pf-button>
    </pf-tooltip>

    <br />
    <br />
    <pf-button type="primary" @click="open">点击手动触发显示</pf-button>
    <pf-button type="danger" @click="close">点击手动触发隐藏</pf-button>

    <br />
    <br />
    <h3>Dropdown 下拉菜单</h3>
    <pf-dropdown placement="bottom" :menu-options="options">
      <pf-button type="primary">Hover 下拉菜单</pf-button>
    </pf-dropdown>

    <br />
    <br />
    <pf-dropdown placement="bottom" :menu-options="options" trigger="click">
      <pf-button type="primary">点击触发下拉菜单</pf-button>
    </pf-dropdown>

    <br />
    <br />
    <pf-dropdown
      placement="bottom"
      :menu-options="options"
      trigger="click"
      manual
      ref="tooltipRef"
    >
      <pf-button>菜单容器</pf-button>
    </pf-dropdown>
    <br />
    <br />
    <pf-button type="primary" @click="open">点击手动触发显示</pf-button>
    <pf-button type="danger" @click="close">点击手动触发隐藏</pf-button>

    <br />
    <br />
    <div class="mb-4">
      <pf-button type="primary" @click="openMsg">创建一条消息</pf-button>
      <pf-button @click="openMsg2">创建支持 VNode 的消息</pf-button>
    </div>

    <br />
    <br />
    <h3>Message 消息</h3>
    <pf-button @click="openMsg3('success')">Success</pf-button>
    <pf-button @click="openMsg3('info')">Info</pf-button>
    <pf-button @click="openMsg3('warning')">warning</pf-button>
    <pf-button @click="openMsg3('danger')">Danger</pf-button>

    <br />
    <br />
    <pf-button @click="openMsg">创建三条消息</pf-button>
    <pf-button @click="closeAll">全部关闭</pf-button>

    <br />
    <br />
    <h3>Input 输入</h3>
    <pf-input v-model="test" placeholder="基础文本框，请输入" />
    <span>{{ test }}</span>

    <br />
    <br />
    <pf-input v-model="test" disabled />

    <br />
    <br />
    <pf-input v-model="test" placeholder="prepend append">
      <template #prepend>Https://</template>
      <template #append>.com</template>
    </pf-input>

    <pf-input v-model="test" placeholder="prefix suffix">
      <template #prefix>
        <pf-icon icon="fa-user" />
      </template>
      <template #suffix>
        <pf-icon icon="fa-user" />
      </template>
    </pf-input>

    <br />
    <br />
    <pf-input v-model="test" placeholder="大的 Input" size="large"></pf-input>
    <pf-input v-model="test" placeholder="普通的 Input"></pf-input>
    <pf-input v-model="test" placeholder="小的 Input" size="small"></pf-input>

    <br />
    <br />
    <pf-input
      v-model="test"
      placeholder="可以是一个 Textarea"
      type="textarea"
    ></pf-input>

    <br />
    <br />
    <pf-input v-model="test" placeholder="密码文本框，可以切换" showPassword />

    <br />
    <br />
    <pf-input v-model="test" clearable placeholder="输入字符以后可以点击清空" />

    <br />
    <br />
    <h3>Switch 开关</h3>
    <pf-switch v-model="isOn" />
    <pf-switch v-model="isOn" disabled />
    <pf-switch v-model="isOn" size="small" />
    <pf-switch v-model="isOn" size="large" />
    <pf-switch v-model="isOn" activeText="ON" inactiveText="OFF" />
    <pf-switch v-model="isOn" size="large" activeText="ON" inactiveText="OFF" />

    <br />
    <br />
    <pf-switch v-model="test" activeValue="right" inactiveValue="wrong" />
    <h4>model-value: {{ test }}</h4>

    <br />
    <br />
    <h3>Select 选择</h3>
    <pf-select
      v-model="test"
      placeholder="基础选择器，请选择"
      :options="options2"
    />

    <br />
    <br />
    <pf-select
      v-model="test"
      placeholder="可清空选择器，请选择"
      :options="options2"
      clearable
    />

    <br />
    <br />
    <pf-select
      v-model="test"
      placeholder="基础选择器，请选择"
      :options="options2"
      :renderLabel="customRender"
      clearable
    />

    <br />
    <br />
    <pf-select
      v-model="test"
      placeholder="可以过滤的选择器，请输入"
      :options="options2"
      filterable
      clearable
    />

    <br />
    <br />
    <pf-select
      v-model="remteoValue"
      placeholder="搜索远程结果"
      filterable
      clearable
      remote
      :remote-method="remoteFilter"
    />
    <h4>remote: {{ remteoValue }}</h4>

    <br />
    <br />
    <h3>Form 表单</h3>
    <pf-form :model="model" :rules="rules" ref="formRef">
      <pf-form-item label="email" prop="email">
        <pf-input v-model="model.email" placeholder="请输入邮箱" />
      </pf-form-item>
      <pf-form-item label="password" prop="password">
        <pf-input
          v-model="model.password"
          type="password"
          placeholder="请输入密码"
        />
      </pf-form-item>
      <pf-form-item label="confirmPwd" prop="confirmPwd">
        <pf-input
          v-model="model.confirmPwd"
          type="password"
          placeholder="请输入邮箱"
        />
      </pf-form-item>
      <pf-formItem prop="agreement" label="agreement">
        <pf-switch v-model="model.agreement" />
      </pf-formItem>
      <pf-formItem prop="gender" label="gender">
        <pf-select v-model="model.gender" :options="genderOptions" />
      </pf-formItem>
      <div>
        <pf-button @click.prevent="submit">Submit</pf-button>
        <pf-button @click.prevent="reset">Reset</pf-button>
      </div>
    </pf-form>
    <h4>
      form value:
      <pre>{{ model }}</pre>
    </h4>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, h, reactive } from 'vue'
import type { ButtonInstance } from 'pf-component-library'
import type { MenuOption } from 'pf-component-library'
import { closeAll, createMessage } from 'pf-component-library'
import type { TooltipInstance } from 'pf-component-library'

const buttonRef = ref<ButtonInstance | null>(null)
const openedValue = ref(['collapse1'])
const size = ref<any>('3x')
const test = ref('1')
const remteoValue = ref('')
const isOn = ref(false)
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]

const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const formRef = ref()

const model = reactive({
  email: '126@qq.com',
  password: '123',
  confirmPwd: '123',
  agreement: false,
  gender: 'female'
})
const rules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [
    { type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }
  ],
  confirmPwd: [
    { type: 'string', required: true, trigger: 'blur' },
    {
      validator: (rule, value) => value === model.password,
      message: '两次输入密码不一致',
      trigger: 'blur'
    }
  ],
  agreement: [
    { type: 'enum', required: true, enum: [true], message: '请同意协议' }
  ],
  gender: [{ type: 'string', required: true, trigger: 'change' }]
}

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '保密', value: 'secret' }
]

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('pass')
  } catch (error) {
    console.log(error)
  }
}
const reset = () => {
  // formRef.value.clearValidate()
  formRef.value.resetFields()
}

const states = [
  '北京',
  '上海',
  '天津',
  '重庆',
  '河北',
  '河南',
  '云南',
  '辽宁',
  '黑龙江',
  '湖南',
  '安徽',
  '山东',
  '新疆',
  '江苏',
  '浙江',
  '江西',
  '湖北',
  '广西',
  '甘肃',
  '山西',
  '内蒙古',
  '陕西',
  '吉林',
  '福建',
  '贵州',
  '广东',
  '青海',
  '西藏',
  '四川',
  '宁夏',
  '海南',
  '台湾'
]

const remoteFilter = (query) => {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filter((state) => {
            return state.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
          .map((label) => {
            return { label, value: label }
          })
        resolve(options)
      }, 500)
    } else {
      resolve([])
    }
  })
}

const customRender = (option) => {
  return h('div', { className: 'xyz' }, [
    h('b', option.label),
    h('span', option.value)
  ])
}

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
.home {
  padding: 20px;
  color: #333;
  margin-bottom: 300px;
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

/* 在全局样式中设置 */
.el-icon {
  font-size: 18px; /* 设置为你需要的尺寸 */
}
</style>

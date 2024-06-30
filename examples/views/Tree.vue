<template>
  <div class="pf-demo">
    <div class="btn-bar">
      <h3>点击按钮，展示tree</h3>
      <br />
      <br />
      <pf-button type="primary" @click="btnClick('tree-500')">500条</pf-button>
      <pf-button type="primary" @click="btnClick('tree-10000')">
        1w 条
      </pf-button>
      <pf-button type="primary" @click="btnClick('tree-30000-multi-disabled')">
        3w 条(含有大量 disabled)
      </pf-button>
      <pf-button type="primary" @click="btnClick('tree-100000')">
        10w 条
      </pf-button>
      <br />
      <br />
      <pf-button @click="onReload">刷新</pf-button>
      <pf-button @click="invokeRef('showCheckedOnly')">
        showCheckedOnly
      </pf-button>
      <pf-button @click="invokeRef('restore')">restore</pf-button>
      <pf-button @click="invokeRef('clear')">clear</pf-button>
    </div>

    <div class="tree-wrap" v-show="isShowDialog">
      <pf-tree
        ref="treeRef"
        hasInput
        checkedAction="dblclick"
        :expandKeys="expandKeys"
        expandLevel="all"
        :isLoading="isLoading"
        :showCheckbox="true"
        :showLine="false"
        :draggable="true"
        :defaultCheckedKeys="checkedKeys"
        @onChange="onChange"
        @onClickLabel="onClickLabel"
        @onClickCheckbox="onClickCheckbox"
      >
        <template v-slot:pre-input>
          <div class="pre-input">
            <pf-select v-model="test" placeholder="请选择" :options="options" />
          </div>
        </template>
        <template v-slot="{ slotScope }">
          <span>
            <pf-icon icon="fa-file" />
            {{ slotScope.label }}
          </span>
        </template>
        <template v-slot:loading>
          <i>加载中...</i>
        </template>
      </pf-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { TreeInstance } from '../../components/lib/Tree/src/types'

const checkedKeys = ref(['1-3'])
const isLoading = ref(true)
const isShowDialog = ref(false)
const expandKeys = ref<string[]>([])
const treeRef = ref<TreeInstance | null>(null)
const test = ref('')
const options = [
  { label: '北京', value: '1' },
  { label: '上海', value: '2' },
  { label: '天津', value: '3' },
  { label: '重庆', value: '4', disabled: true }
]

onMounted(() => {
  btnClick('tree-500')
})

const btnClick = async (count: string) => {
  isShowDialog.value = true
  axios.get(`/static/json/${count}.json`).then(({ data }) => {
    expandKeys.value = ['8-1', '10-1']
    treeRef.value?.setData(data)
    checkedKeys.value = ['1-4']
    isLoading.value = false
  })

  // let data
  // switch (count) {
  //   case 'tree-500':
  //     data = await import('../static/json/tree-500.json')
  //     break
  //   case 'tree-10000':
  //     data = await import('../static/json/tree-10000.json')
  //     break
  //   case 'tree-20000':
  //     data = await import('../static/json/tree-20000.json')
  //     break
  //   case 'tree-30000-multi-disabled':
  //     data = await import('../static/json/tree-30000-multi-disabled.json')
  //     break
  //   case 'tree-50000':
  //     data = await import('../static/json/tree-50000.json')
  //     break
  //   case 'tree-100000':
  //     data = await import('../static/json/tree-100000.json')
  //     break
  //   case 'tree-200000':
  //     data = await import('../static/json/tree-200000.json')
  //     break
  //   default:
  //     console.error('Invalid count')
  //     return
  // }
  // expandKeys.value = ['8-1', '10-1']
  // treeRef.value?.setData(data.default)
  // checkedKeys.value = ['1-4']
  // isLoading.value = false
}

const onChange = (checkedKeys: any, checkedNodes: any) => {
  console.log('onChange', checkedKeys, checkedNodes)
}

const onClickLabel = (node: any) => {
  console.log('onClickLabel', node)
}

const onClickCheckbox = (node: any) => {
  console.log('onClickCheckbox', node)
}

const onReload = () => {
  window.location.reload()
}

const invokeRef = (name: string) => {
  if (treeRef.value) {
    treeRef.value[name]()
  }
}
</script>

<style scoped>
.pf-demo {
  text-align: center;

  .pre-input {
    max-width: 84px;
  }

  .pf-icon {
    vertical-align: -2px;
  }

  .btn-bar {
    padding: 10px;
  }

  .tree-wrap {
    margin: 0px auto;
    width: 400px;
    height: 500px;
    padding-left: 20px;
    .pre-select {
      cursor: pointer;
      padding: 5px 10px;
    }
  }
}
</style>

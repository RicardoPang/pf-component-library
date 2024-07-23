<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PfTree from '@/components/lib/Tree/src/Tree.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
import PfSelect from '@/components/lib/Select/src/Select.vue'
import PfIcon from '@/components/lib/Icon/src/Icon.vue'

const checkedKeys = ref(['1-3'])
const isLoading = ref(true)
const isShowDialog = ref(false)
const expandKeys = ref([])
const treeRef = ref(null)
const test = ref('')
const options = [
  { label: '北京', value: '1' },
  { label: '上海', value: '2' },
  { label: '天津', value: '3' },
  { label: '重庆', value: '4', disabled: true }
]

onMounted(() => {
  btnClick('500')
})

const btnClick = async (count) => {
  isShowDialog.value = true
  axios
    .get(`http://localhost:3000/api/tree?count=${count}`)
    .then(({ data }) => {
      if (data.code === 0) {
        console.log(data, data.data.tree)
        const { tree } = data.data
        expandKeys.value = ['8-1', '10-1']
        treeRef.value?.setData(tree)
        checkedKeys.value = ['1-4', '1-5']
        isLoading.value = false
      }
    })
}

const onChange = (checkedKeys, checkedNodes) => {
  console.log('onChange', checkedKeys, checkedNodes)
}

const onClickLabel = (node) => {
  console.log('onClickLabel', node)
}

const onClickCheckbox = (node) => {
  console.log('onClickCheckbox', node)
}

const onReload = () => {
  window.location.reload()
}

const invokeRef = (name) => {
  if (treeRef.value) {
    treeRef.value[name]()
  }
}
</script>
<template>
  <div class="pf-tree-wrapper">
    <div class="btn-bar">
      <h3>点击按钮，展示tree</h3>
      <br />
      <br />
      <pf-button type="primary" @click="btnClick('500')">500条</pf-button>
      <pf-button type="primary" @click="btnClick('10000')">1w 条</pf-button>
      <pf-button type="primary" @click="btnClick('30000')">
        3w 条(含有大量 disabled)
      </pf-button>
      <pf-button type="primary" @click="btnClick('100000')">10w 条</pf-button>
      <br />
      <br />
      <pf-button @click="onReload">刷新</pf-button>
      <pf-button @click="invokeRef('showCheckedOnly')">只显示选中</pf-button>
      <pf-button @click="invokeRef('restore')">恢复</pf-button>
      <pf-button @click="invokeRef('clear')">清空</pf-button>
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
<style scoped>
.pf-tree-wrapper {
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

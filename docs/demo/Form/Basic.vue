<script setup>
import { reactive, ref } from 'vue'
import PfForm from '@/components/lib/Form/src/Form.vue'
import PfFormItem from '@/components/lib/Form/src/FormItem.vue'
import PfInput from '@/components/lib/Input/src/Input.vue'
import PfButton from '@/components/lib/Button/src/Button.vue'
import PfSwitch from '@/components/lib/Switch/src/Switch.vue'
import PfSelect from '@/components/lib/Select/src/Select.vue'
const model = reactive({
  email: '',
  password: '',
  confirmPwd: '',
  agreement: false,
  gender: ''
})
const gender = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '保密', value: 'secret' }
]
const formRef = ref()
const submit = async () => {
  alert('submitted!')
}
const reset = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <div>
    <pf-form :model="model" ref="formRef">
      <pf-formItem prop="email" label="the email">
        <pf-input v-model="model.email" />
      </pf-formItem>
      <pf-formItem prop="password" label="the password">
        <pf-input v-model="model.password" type="password" />
      </pf-formItem>
      <pf-formItem prop="agreement" label="agreement">
        <pf-switch v-model="model.agreement" />
      </pf-formItem>
      <pf-formItem prop="gender" label="gender">
        <pf-select v-model="model.gender" :options="gender" />
      </pf-formItem>
      <pf-formItem>
        <pf-button @click.prevent="submit" type="primary">Submit</pf-button>
        <pf-button @click.prevent="reset">Reset</pf-button>
      </pf-formItem>
    </pf-form>

    <h4>
      form value:
      <pre>{{ model }}</pre>
    </h4>
  </div>
</template>

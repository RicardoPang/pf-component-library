<template>
  <div class="form-demo">
    <pf-form
      :model="model"
      :rules="rules"
      ref="formRef"
      :labelWidth="150"
      labelPosition="right"
    >
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

    <h4 style="text-align: center; margin-top: 50px">
      form value:
      <pre>{{ model }}</pre>
    </h4>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

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
const rules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [
    { type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }
  ],
  confirmPwd: [{ type: 'string', required: true, trigger: 'blur' }],
  agreement: [
    { type: 'enum', required: true, enum: [true], message: '请同意协议' }
  ],
  gender: [{ type: 'string', required: true, trigger: 'change' }]
}
const formRef = ref()
const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch (e) {
    console.log('the promise', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}
</script>

<style scoped>
.form-demo {
  padding: 30px 100px;
  color: #333;
}
</style>

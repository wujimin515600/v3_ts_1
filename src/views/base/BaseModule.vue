<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-form :model="formState" :label-col="lay.labelCol" :wrapper-col="lay.wrapperCol">
        <a-form-item :label="item.name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import { reactive, type UnwrapRef } from 'vue'
import InputView from '@/components/base/InputView.vue'
interface DataItem {
  title: string,
  [x:string]: string
}
interface FormState {
  name: string
}
const data: DataItem[] = [
  {
    title: '搜索',
    type: 'search',
    name: 'name'
  },
]
const formState: UnwrapRef<FormState> = reactive({
  name: ''
})

const lay = reactive({
  labelCol: { style: { width: '150px' } },
  wrapperCol: { span: 14 }
})
</script>

<template>
  <a-modal
    v-model:open="open"
    :title="getTitle(props.data.title)"
    @ok="handleOk"
    @cancel="handleCancel"
    width="1000px"
  >
    <!-- <template> -->
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row :gutter="24">
        <template v-for="item in menuTitle" :key="item.dataIndex">
          <a-col :span="12">
            <template v-if="item.dataIndex === 'menu_visible'">
              <a-form-item :label="item.title" :name="item.title">
                <a-radio-group v-model:value="modalData[item.dataIndex]">
                  <a-radio :value="1">显示</a-radio>
                  <a-radio :value="2">隐藏</a-radio>
                </a-radio-group>
              </a-form-item>
            </template>
            <template v-else-if="item.dataIndex === 'menu_no'">
              <a-form-item :label="item.title" :name="item.title" tooltip="对应路由path和name">
                <a-input v-model:value="modalData[item.dataIndex]" />
              </a-form-item>
            </template>
            <template v-else-if="item.dataIndex === 'menu_sort'">
              <a-form-item :label="item.title" :name="item.title">
                <a-input-number
                  id="inputNumber"
                  v-model:value="modalData[item.dataIndex]"
                  :min="1"
                  :max="10"
                />
              </a-form-item>
            </template>
            <template v-else-if="item.dataIndex === 'menu_type'">
              <a-form-item :label="item.title" :name="item.title">
                <a-select v-model:value="modalData[item.dataIndex]" placeholder="选择类型">
                <a-select-option value="目录">目录</a-select-option>
                <a-select-option value="菜单">菜单</a-select-option>
              </a-select>
              </a-form-item>
            </template>
            
            <template v-else-if="item.dataIndex !== 'operation'">
              <a-form-item :label="item.title" :name="item.title">
                <a-input v-model:value="modalData[item.dataIndex]" />
              </a-form-item>
            </template>
          </a-col>
        </template>
      </a-row>
    </a-form>
    <!-- </template> -->
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

interface Title {
  [x: string]: string | number
}

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: ''
})

const props = defineProps({
  status: {
    type: Boolean,
    default: () => false
  },
  data: {
    default: () => {}
  }
})

const titleInfo: Title = {
  edit: '编辑',
  delete: '删除'
}

const getTitle = (title: string = '') => {
  return titleInfo[title] ?? 'modal'
}
const open = ref<boolean>(props.status)
const emit = defineEmits(['message-event'])
const menuTitle = ref<Title[]>([])
const modalData = ref<Title>({})

watch(
  props,
  (newValue) => {
    console.log('newValue', newValue)
    open.value = newValue.status
    modalData.value = newValue.data.data
    menuTitle.value = newValue.data.menuTitle
  },
  { deep: true }
)

const handleOk = (e: MouseEvent) => {
  // console.log('handleOk', e)
  open.value = false
  handleMessage({ status: false })
}

const handleMessage = (ops: { status: boolean }) => {
  emit('message-event', ops)
}
const handleCancel = () => {
  open.value = false
  handleMessage({ status: false })
}

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style lang="scss" scoped></style>

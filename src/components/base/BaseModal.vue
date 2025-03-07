<template>
  <a-modal v-model:open="open" :title="title" @ok="handleOk" @cancel="handleCancel" width="1000px">
    <!-- <template> -->
    <a-form
      :model="modalData"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-row :gutter="24">
        <template v-for="(item, index) in titles" :key="item.dataIndex +'_'+ index">
          <template v-if="control === ControlType['MENU']">
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

              <template v-else-if="item.dataIndex==='menu_parent'">
                <a-form-item :label="item.title" :name="item.title">
                  <a-select v-model:value="modalData[item.dataIndex]" placeholder="选择父级菜单" :virtual="false">
                    <template v-for="(route, num) in routes" :key="`-${num}`">
                      <a-select-opt-group v-if="route.children && route.children.length > 0">
                        <template #label>
                          <span>
                            {{ route.meta?.title }}
                          </span>
                        </template>
                        <a-select-option v-for="(routeItem) in route.children" :value="routeItem.path" :key="routeItem.name">{{ routeItem.meta?.title }}</a-select-option>
                      </a-select-opt-group>
                      <a-select-option v-else :value="route.path">{{ route.meta?.title }}</a-select-option>
                    </template>
                  </a-select>
                </a-form-item>
              </template>
              <template v-else-if="item.dataIndex==='menu_path'">
                <a-form-item :label="item.title" :name="item.title">
                  <a-input addon-before="src/views" v-model:value="modalData[item.dataIndex]" />
                </a-form-item>
              </template>
              <template v-else-if="item.dataIndex !== 'operation'">
                <a-form-item :label="item.title" :name="item.title">
                  <a-input v-model:value="modalData[item.dataIndex]" />
                </a-form-item>
              </template>
            </a-col>
          </template>
        </template>
      </a-row>
    </a-form>
    <!-- </template> -->
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { ControlType } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'

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
  data: {
    type: Object,
    default: () => {
      return {
        modalTitle: '',
        data: {},
        open: false,
        titles: [],
        type: '',
        routes: []
      }
    },
    required: true
  }
})

const open = ref<boolean>(false)
const emit = defineEmits(['message-event'])
const titles = ref<Title[]>([])
const modalData = ref<Title>({})
const title = ref('标题')
const control = ref('menu') //页面类型
const routes = ref<RouteRecordRaw[]>([]);

watch(
  props,
  (value) => {
    console.log('watch', value)
    title.value = value.data.title
    open.value = value.data.open
    modalData.value = value.data.data
    titles.value = value.data.titles
    control.value = value.data.type
    routes.value = value.data.routes
  },
  { deep: true }
)

const handleOk = (e: MouseEvent) => {
  const obj = {
        id: 0, // 随机
    key: 1, // 
  }
  console.log('handleOk', e, modalData)
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

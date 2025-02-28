<template>
  <a-card>
    <TableView
      :data="menuTable.data"
      :loading="menuTable.loading"
      :columns="menuTable.columns"
      :pagination="menuTable.pagination"
      @showModal="showModal"
      @showConfirm="showConfirm"
      @handleTableChange="handleTableChange"
      :type="type"
    >
    </TableView>
  </a-card>
  <!-- <template v-if="open"> -->
  <BaseModal :status="open" :data="modalData" destroyOnClose @message-event="handleMessage" />
  <!-- </template> -->
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref, reactive, onMounted, inject, createVNode } from 'vue'
import type { UserQueryParams } from '@/utils'
import type { TableProps } from 'ant-design-vue'
import Modal from 'ant-design-vue/es/modal/Modal'
import BaseModal from './BaseModal.vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import TableView from '@/components/base/TableView.vue'

export interface DataItem {
  menu_type: string
  children?: DataItem[]
}

defineProps({
  type: {
    type: String,
    default: ''
  }
})

const store = useUserStore()
const open = ref<boolean>(false)
const modalData = reactive({
  title: '',
  data: {}
  // menuTitle: []
})

const menuTable = inject('menuTable')
console.log('menuTable', menuTable)
// console.log('menuTable', menuTable)


// 初始化加载数据
onMounted(() => {
  store.getUsers(queryParams)
  //   console.log('user', store.userList)
})

// 查询参数
const queryParams = reactive<UserQueryParams>({
  page: 1,
  pageSize: 10
})

// 处理表格变化
const handleTableChange: TableProps['onChange'] = (pag, filters, sorter) => {
  queryParams.page = pag.current!
  queryParams.pageSize = pag.pageSize!
  queryParams.role = filters.role?.[0]
  store.getUsers(queryParams)
}

// 显示模态框
const showModal = (mode: 'delete' | 'edit', record: DataItem, columns: DataItem) => {
  console.log('column', columns, modalData, record)
  Object.assign(modalData, {
    title: mode,
    data: record,
    menuTitle: columns
  })
  open.value = true
  
}

const handleMessage = () => {
  open.value = false
}

const showConfirm = (record: DataItem) => {
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定要删除菜单 系统设置 （如果包含子菜单，将一并删除），此操作将永久删除, 是否继续?',
    onOk() {
      return new Promise((resolve, reject) => {
        // 删除操作
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {}
  })
}
</script>

<style lang="scss" scoped></style>

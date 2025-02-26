<template>
  <a-card>
    <a-table
      :columns="menuTable.columns"
      :data-source="menuTable.menus"
      :loading="menuTable.loading"
      :pagination="menuTable.pagination"
      @change="handleTableChange"
      :row-selection="rowSelection"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'menu_type'">
          <span>
            <a-tag :color="record.menu_type === '目录' ? 'cyan' : 'green'">
              {{ record.menu_type }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.dataIndex === 'menu_visible'">
          <span>
            <a-tag :color="record.menu_visible === 1 ? 'purple' : 'blue'">
              {{ record.menu_visible === 1 ? '显示' : '隐藏' }}
            </a-tag>
          </span>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a-button type="primary" size="small" ghost @click="showModal('edit', record ,menuTable.columns)">编辑
            </a-button>
            <a-button type="primary" size="small" danger ghost @click="showConfirm(record)">删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
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

interface DataItem {
  menu_type: string
  children?: DataItem[]
}



const store = useUserStore()
const open = ref<boolean>(false);
const modalData = reactive({
    title: '',
    data: {},
    // menuTitle: []
})

const menuTable = inject('menuTable')
// console.log('menuTable', menuTable)

const rowSelection = ref({
  checkStrictly: false,
//   onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
//   },
//   onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
//     console.log(record, selected, selectedRows)
//   },
//   onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
//     console.log(selected, selectedRows, changeRows)
//   }
})


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
    Object.assign(modalData, {
        title: mode,
        data: record,
        menuTitle: columns
    })
    open.value = true
    console.log('column', columns, modalData)
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
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {},
  });
};

</script>

<style lang="scss" scoped></style>

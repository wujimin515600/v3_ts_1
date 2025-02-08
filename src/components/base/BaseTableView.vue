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
          <a-popconfirm
            title="Sure to delete?"
            @confirm="onDelete(record.key)"
          >
            <a>编辑</a>
          </a-popconfirm>
          <a-popconfirm
            title="Sure to delete?"
            @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>

      <!-- <template #status="{ text }">
        <a-tag :color="text === 1 ? 'green' : 'red'">
          {{ text === 1 ? '启用' : '禁用' }}
        </a-tag>
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="showModal('edit', record)">编辑</a-button>
        <a-button type="link" danger @click="handleDelete(record.id)"> 删除 </a-button>
        <a-button type="link" @click="handleStatusChange(record.id, record.status === 1 ? 0 : 1)">
          {{ record.status === 1 ? '禁用' : '启用' }}
        </a-button>
      </template> -->
    </a-table>
  </a-card>

  <user-form-modal
    v-model:visible="modalVisible"
    :mode="modalMode"
    :current-data="currentUser"
    @refresh="handleRefresh"
  />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { ref, reactive, onMounted, inject } from 'vue'
import type { User, UserQueryParams } from '@/utils'
import type { TableProps } from 'ant-design-vue'
import Modal from 'ant-design-vue/es/modal/Modal'

const store = useUserStore()
const modalVisible = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const currentUser = ref<User | null>(null)

interface DataItem {
  menu_type: string
  // [x: string]: string,
  children?: DataItem[]
}

const menuTable = inject('menuTable')
console.log('menuTable', menuTable)

const rowSelection = ref({
  checkStrictly: false,
  onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    console.log(selected, selectedRows, changeRows)
  }
})

const columns: TableProps['columns'] = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    filters: [
      { text: '管理员', value: 'admin' },
      { text: '普通用户', value: 'user' }
    ]
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    slots: { customRender: 'status' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: true
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

// 初始化加载数据
onMounted(() => {
  store.getUsers(queryParams)
  console.log('user', store.userList)
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
const showModal = (mode: 'create' | 'edit', record?: User) => {
  modalMode.value = mode
  currentUser.value = record || null
  modalVisible.value = true
}

// 删除用户
const handleDelete = (id: string) => {
  Modal.confirm({
    title: '确认删除',
    content: '确定要删除该用户吗？',
    onOk: () => store.deleteUser(id)
  })
}

// 状态切换
const handleStatusChange = (id: number, status: 0 | 1) => {
  store.updateUserStatus(id, status)
}

// 刷新列表
const handleRefresh = () => {
  store.getUsers(queryParams)
}
const onDelete = (key) => {

}
</script>

<style lang="scss" scoped></style>

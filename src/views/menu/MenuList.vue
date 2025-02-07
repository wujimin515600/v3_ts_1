<!-- views/user/UserList.vue -->
<template>
    <a-card>
      <!-- 搜索区域 -->
      <div class="mb-4 flex justify-between">
        <a-form layout="inline" :model="queryParams">
          <a-form-item label="用户名">
            <a-input v-model:value="queryParams.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item label="角色">
            <a-select
              v-model:value="queryParams.role"
              style="width: 120px"
              allow-clear
            >
              <a-select-option value="admin">管理员</a-select-option>
              <a-select-option value="user">普通用户</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSearch">查询</a-button>
          </a-form-item>
        </a-form>
        <!-- <a-button type="primary" @click="showModal('create')">
          <template #icon><plus-outlined /></template>
          新建用户
        </a-button> -->
      </div>
  
      <!-- 用户表格 -->
      <a-table
        :columns="columns"
        :data-source="store.userList"
        :loading="store.loading"
        :pagination="store.pagination"
        @change="handleTableChange"
        bordered
      >
        <template #status="{ text }">
          <a-tag :color="text === 1 ? 'green' : 'red'">
            {{ text === 1 ? '启用' : '禁用' }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a-button type="link" @click="showModal('edit', record)">编辑</a-button>
          <a-button type="link" danger @click="handleDelete(record.id)">
            删除
          </a-button>
          <a-button
            type="link"
            @click="handleStatusChange(record.id, record.status === 1 ? 0 : 1)"
          >
            {{ record.status === 1 ? '禁用' : '启用' }}
          </a-button>
        </template>
      </a-table>
  
      <!-- 用户表单模态框 -->
      <user-form-modal
        v-model:visible="modalVisible"
        :mode="modalMode"
        :current-data="currentUser"
        @refresh="handleRefresh"
      />
    </a-card>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useUserStore } from '@/stores/userStore'
//   import UserFormModal from '@/components/UserFormModal.vue'
  import type { User, UserQueryParams } from '@/utils'
  import type { TableProps } from 'ant-design-vue'
import Modal from 'ant-design-vue/es/modal/Modal'
  
  const store = useUserStore()
  const modalVisible = ref(false)
  const modalMode = ref<'create' | 'edit'>('create')
  const currentUser = ref<User | null>(null)
  
  // 查询参数
  const queryParams = reactive<UserQueryParams>({
    page: 1,
    pageSize: 10
  })
  
  // 表格列配置
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
  
  // 搜索处理
  const handleSearch = () => {
    queryParams.page = 1
    store.getUsers(queryParams)
  }
  </script>
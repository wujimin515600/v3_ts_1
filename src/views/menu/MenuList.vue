<template>
  <a-card>
    <FormView />
    <DataView type="menu" />
    <a-table></a-table>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide } from 'vue'
import type { User, UserQueryParams } from '@/utils'
import type { TableProps } from 'ant-design-vue'
// import Modal from 'ant-design-vue/es/modal/Modal'
import FormView from '@/components/base/BaseFormView.vue'
import DataView from '@/components/BaseTableView.vue'
import { useMenuSystemStore } from '@/stores/menuSystemStore'

const store = useMenuSystemStore()
// const modalVisible = ref(false)
// const modalMode = ref<'create' | 'edit'>('create')
// const currentUser = ref<User | null>(null)

console.log('store', store)
provide('menuList', {
  search: [
    {
      type: 'input',
      title: '菜单名称',
      value: ''
    },
    {
      type: 'input',
      title: '菜单编码',
      value: ''
    }
  ]
})

provide('Search', () => {
  console.log('menuSearch')
})
provide('menuTable', {data: store.menus,...store})
// 查询参数
const queryParams = reactive<UserQueryParams>({
  page: 1,
  pageSize: 10
})



// 初始化加载数据
onMounted(() => {
  store.fetchMenus(queryParams)
})

// 处理表格变化
const handleTableChange: TableProps['onChange'] = (pag, filters, sorter) => {
//   queryParams.page = pag.current!
//   queryParams.pageSize = pag.pageSize!
//   queryParams.role = filters.role?.[0]
//   store.getUsers(queryParams)
}


// 删除用户
const handleDelete = (id: string) => {
//   Modal.confirm({
//     title: '确认删除',
//     content: '确定要删除该用户吗？',
//     onOk: () => store.deleteUser(id)
//   })
}

// 状态切换
const handleStatusChange = (id: number, status: 0 | 1) => {
//   store.updateUserStatus(id, status)
}

// 刷新列表
const handleRefresh = () => {
//   store.getUsers(queryParams)
}

// 搜索处理
const handleSearch = () => {
  queryParams.page = 1
//   store.getUsers(queryParams)
}
</script>

<!-- <template>
    <div class="container">
      <h1>菜单管理</h1>
      <a-button type="primary" @click="showAddDialog">添加菜单</a-button>
      
      <a-table :data="menuList" style="width: 100%; margin-top: 20px">
        <a-table-column prop="name" label="菜单名称" />
        <a-table-column prop="path" label="路由路径" />
        <a-table-column prop="icon" label="图标" />
        <a-table-column label="操作" width="180">
          <template #default="scope">
            <a-button size="small" @click="editMenu(scope.row)">编辑</a-button>
            <a-button size="small" type="danger" @click="deleteMenu(scope.row.id)">删除</a-button>
          </template>
        </a-table-column>
      </a-table>
  

      <a-dialog v-model="dialogVisible" :title="isEdit ? '编辑菜单' : '添加菜单'">
        <a-form :model="form" laba-width="80px">
          <a-form-item label="菜单名称">
            <a-input v-model="form.name" />
          </a-form-item>
          <a-form-item label="路由路径">
            <a-input v-model="form.path" />
          </a-form-item>
          <a-form-item label="图标">
            <a-input v-model="form.icon" />
          </a-form-item>
        </a-form>
        <template #footer>
          <a-button @click="dialogVisible = false">取消</a-button>
          <a-button type="primary" @click="submitForm">确认</a-button>
        </template>
      </a-dialog>
    </div>
  </template> -->

<!-- <script setup lang="ts">
  import { useMenuSystemStore, type MenuItem } from '@/stores/menuSystemStore'
import { ref, onMounted } from 'vue'
//   import { message } from 'element-plus'
//   import api from '@/utils'
import { message } from 'ant-design-vue'
  
//   interface MenuItem {
//     id: string
//     name: string
//     path: string
//     icon: string
//   }
  
  const store = useMenuSystemStore();
  const menuList = ref<MenuItem[]>(store.menus)
  const dialogVisible = ref(false)
  const isEdit = ref(false)
  const form = ref({
    id: '',
    name: '',
    path: '',
    icon: ''
  })
  
  // 获取菜单列表
//   const fetchMenus = async () => {
//     try {
//       const { data } = await api.get('/menus')
//       menuList.value = data
//     } catch (error) {
//       message.error('获取菜单列表失败')
//     }
//   }
  
  // 提交表单
  const submitForm = async () => {
    try {
      if (isEdit.value) {
        // await api.put(`/menus/${form.value.id}`, form.value)
      } else {
        // await api.post('/menus', form.value)
      }
      dialogVisible.value = false
    //   fetchMenus()
      message.success('操作成功')
    } catch (error) {
      message.error('操作失败')
    }
  }
  
  // 显示添加对话框
  const showAddDialog = () => {
    isEdit.value = false
    form.value = { id: '', name: '', path: '', icon: '' }
    dialogVisible.value = true
  }
  
  // 编辑菜单
  const editMenu = (menu: MenuItem) => {
    isEdit.value = true
    form.value = { ...menu }
    dialogVisible.value = true
  }
  
  // 删除菜单
  const deleteMenu = async (id: string) => {
    try {
    //   await api.delete(`/menus/${id}`)
    //   fetchMenus()
      message.success('删除成功')
    } catch (error) {
      message.error('删除失败')
    }
  }
  
  onMounted(() => {
    // fetchMenus()
  })
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  </style>
   -->

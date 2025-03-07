<template>
  <a-card>
    <FormView />
    <a-card>
      <a-space wrap>
        <a-button type="primary" ghost @click="addMenu">新增</a-button>
        <a-button type="dashed" disabled>查看</a-button>
        <a-button type="text" disabled>编辑</a-button>
        <a-button type="primary" danger ghost disabled>删除</a-button>
      </a-space>
    </a-card>
    <DataView type="menu" />
  </a-card>
  <BaseModal :data="modalData" destroyOnClose @message-event="handleMessage" />
</template>

<script setup lang="ts">
import { reactive, onMounted, provide, ref, watch } from 'vue'
import { ControlType, ModalTitle, type UserQueryParams } from '@/utils'
// import Modal from 'ant-design-vue/es/modal/Modal'
import FormView from '@/components/BaseFormView.vue'
import DataView from '@/components/BaseTableView.vue'
import { useMenuSystemStore } from '@/stores/menuSystemStore'
import BaseModal from '@/components/base/BaseModal.vue'
import { useRouter } from 'vue-router'
// import { title } from 'process'

const store = useMenuSystemStore()

// modal
const modalData = reactive({
  title: '',
  data: {},
  open: false,
  titles: [],
  routes: []
})


// 获取所有路由配置信息
const routes = useRouter()
  .getRoutes()
  .filter((item) => item.name === 'Layout')
// console.log('routes',routes)
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
provide('menuTable', { data: store.menus, ...store })
// 查询参数
const queryParams = reactive<UserQueryParams>({
  page: 1,
  pageSize: 10
})

// 初始化加载数据
onMounted(() => {
  store.fetchMenus(queryParams)
  // console.log('store.columns', store.columns)
})

const addMenu = () => {
  const obj = {
    // id: 0,
    // key: 1,
    menu_name: '',
    menu_no: '',
    menu_parent: '',
    menu_path: '',
    menu_sort: 1,
    menu_type: '目录',
    menu_visible: 1
  }
  Object.assign(modalData, {
    title: ModalTitle['ADD'],
    data: obj,
    titles: store.columns,
    open: true,
    type: ControlType['MENU'],
    routes: routes
  })

  // console.log('modalData', modalData, store.columns)

}
const handleMessage = () => {
  Object.assign(modalData, {
    open: false
  })
}
</script>

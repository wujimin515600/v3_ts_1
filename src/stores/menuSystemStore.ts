import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { message } from 'element-plus'
import {
  getMenu,
  createMenu as apiCreateMenu,
  updateMenu as apiUpdateMenu,
  deleteMenu as apiDeleteMenu
} from '@/api'
import { message } from 'ant-design-vue'

export interface MenuItem {
  id: string
  [x: string]: string | number
}
// menu_no: 1,
// menu_name: '菜单管理',
// menu_type: '目录',
// menu_sort: 1,
// menu_visible: 1,
// menu_parent: '',
// menu_path: 'Layout',
// id: 0,
export const useMenuSystemStore = defineStore('menu', () => {
  const menus = ref<MenuItem[]>([])
  const columns = ref<MenuItem[]>([])
  const showCreateDialog = ref(false)
  const currentMenu = ref<Partial<MenuItem>>({})

  const loading = ref(false)
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const fetchMenus = async (params: { page: any; pageSize: any }) => {
    try {
      const { data, title } = await getMenu()
    //   console.log('store', res)
      menus.value = data
      columns.value = title
      pagination.value = {
        current: params.page,
        pageSize: params.pageSize,
        total: data
      }
    } catch (error) {
      message.error('获取菜单列表失败')
    }
  }

  const createMenu = async (menu: Omit<MenuItem, '_id'>) => {
    try {
      const { data } = await apiCreateMenu(menu)
      menus.value.push(data)
      showCreateDialog.value = false
      message.success('菜单创建成功')
    } catch (error) {
      message.error('菜单创建失败')
    }
  }

  const updateMenu = async (menu: MenuItem) => {
    try {
      const { data } = await apiUpdateMenu(menu)
      const index = menus.value.findIndex((m) => m._id === menu._id)
      if (index > -1) {
        menus.value.splice(index, 1, data)
      }
      message.success('菜单更新成功')
    } catch (error) {
      message.error('菜单更新失败')
    }
  }

  const deleteMenu = async (id: string) => {
    try {
      await apiDeleteMenu({})
      menus.value = menus.value.filter((m) => m._id !== id)
      message.success('菜单删除成功')
    } catch (error) {
      message.error('菜单删除失败')
    }
  }

  return {
    menus,
    columns,
    loading,
    pagination,
    showCreateDialog,
    currentMenu,
    fetchMenus,
    createMenu,
    updateMenu,
    deleteMenu
  }
})

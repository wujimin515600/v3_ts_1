import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDictionary,createDictionary as apiCreateDictionary,
    updateDictionary as apiUpdateDictionary,
    deleteDictionary as apiDeleteDictionary } from '@/api'
import { message } from 'ant-design-vue'
import type { Item } from '@/utils'

export interface DictionaryItem extends Item {}


export const useDictionaryStore = defineStore(
  'v3_ts_1_dictionary',
  () => {
    const dictionary = ref<DictionaryItem[]>([])
    const columns = ref<DictionaryItem[]>([])
    const showCreateDialog = ref(false)
    const currentDictionary = ref<Partial<DictionaryItem>>({})

    const loading = ref(false)
    const pagination = ref({
      current: 1,
      pageSize: 10,
      total: 0
    })

    const fetchDictionary = async (params: { page: any; pageSize: any }) => {
      try {
        const { data, title } = await getDictionary()
          console.log('store', data)
        dictionary.value = data
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

    const createDictionary = async (menu: Omit<DictionaryItem, '_id'>) => {
      try {
        const { data } = await apiCreateDictionary(menu)
        dictionary.value.push(data)
        showCreateDialog.value = false
        message.success('菜单创建成功')
      } catch (error) {
        message.error('菜单创建失败')
      }
    }

    const updateDictionary = async (menu: DictionaryItem) => {
      try {
        const { data } = await apiUpdateDictionary(menu)
        const index = dictionary.value.findIndex((m) => m._id === menu._id)
        if (index > -1) {
          dictionary.value.splice(index, 1, data)
        }
        message.success('菜单更新成功')
      } catch (error) {
        message.error('菜单更新失败')
      }
    }

    const deleteDictionary = async (id: string) => {
      try {
        await apiDeleteDictionary({})
        dictionary.value = dictionary.value.filter((m) => m._id !== id)
        message.success('菜单删除成功')
      } catch (error) {
        message.error('菜单删除失败')
      }
    }

    return {
      dictionary,
      columns,
      loading,
      pagination,
      showCreateDialog,
      currentDictionary,
      fetchDictionary,
      createDictionary,
      updateDictionary,
      deleteDictionary
    }
  },
  {
    persist: true
  }
)

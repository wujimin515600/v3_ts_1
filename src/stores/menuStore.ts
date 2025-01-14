import { ref } from 'vue'
import { defineStore } from 'pinia'
// import type { User } from '@/utils'

export const useMenuStore = defineStore(
  'v3_ts_1_menu',
  () => {
    const selectedKey = ref<string>()
    const openKeys = ref<string[]>([])

    const setOpenKeys = (item: string[]) => {
      openKeys.value = item
    }

    const setSelectedKey = (item: string) => {
      selectedKey.value = item
    }

    return { selectedKey, openKeys, setSelectedKey, setOpenKeys }
  },
  {
    persist: true
  }
)

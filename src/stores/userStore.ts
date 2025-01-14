import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/utils'

export const useUserStore = defineStore(
  'v3_ts_1_user',
  () => {
    const data = reactive({
      user: {
        token: ''
      }
    })

    const setUser = (item: User) => {
      data.user = item
    }

    const removeUser = () => {
      data.user = { token: ''}
    }

    return { data, setUser, removeUser }
  },
  {
    persist: true
  }
)

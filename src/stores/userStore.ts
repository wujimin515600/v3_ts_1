import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref('')

    const getToken = (str: string) => {
      token.value = str
    }

    const removeToken = () => {
      token.value = ''
    }
    return { token, getToken, removeToken }
  },
  {
    persist: {
      key: 'token', //设置存储的key
      storage: localStorage //表示存储在localStorage
    }
  }
)

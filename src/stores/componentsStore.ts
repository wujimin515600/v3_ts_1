import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
// import type { User } from '@/utils'

export const useMenuStore = defineStore(
  'v3_ts_1_components',
  () => {

    const components = reactive({
      list: []
    })


    const addCom = (com: any) => {
      // todo

      components.list.push(com)
    }

    const delCom = (com: any) => {
      // todo

      // components.list.delete(com)
    }
    return { components, addCom, delCom }
  }, {
    persist: true
  })
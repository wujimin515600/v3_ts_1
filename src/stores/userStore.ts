import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, UserQueryParams } from '@/utils'
import { getUsers as getUser, updateUser, deleteUser as apiDeleteUser } from '@/api'
import type { Params } from '@/api/request'

export const useUserStore = defineStore(
  'v3_ts_1_user',
  () => {
    const data = reactive({
      user: {
        token: ''
      }
    })
    const userList = ref<User[]>([])
    const loading = ref(false)
    const pagination = ref({
      current: 1,
      pageSize: 10,
      total: 0
    })

    const setUser = (item: User) => {
      data.user = item
    }

    const removeUser = () => {
      data.user = { token: '' }
    }

    // 获取用户列表
    const getUsers = async (params: UserQueryParams) => {
      loading.value = true
      try {
        const res: { items: User[]} = await getUser(params)
        // console.log('store', res)
        userList.value = res.items
        pagination.value = {
          current: params.page,
          pageSize: params.pageSize,
          total: res.items
        }
      } finally {
        loading.value = false
      }
    }

    // 删除用户
    const deleteUser = async (id: string) => {
      await apiDeleteUser({id: id})
      await getUsers({
        page: pagination.value.current,
        pageSize: pagination.value.pageSize
      })
    }

    // 更新用户状态
    const updateUserStatus = async (id: number, status: 0 | 1) => {
      await updateUser({id, status})
      await getUsers({
        page: pagination.value.current,
        pageSize: pagination.value.pageSize
      })
    }

    return { data,userList,loading, pagination, setUser, removeUser, getUsers, deleteUser, updateUserStatus }
  },
  {
    persist: true
  }
)

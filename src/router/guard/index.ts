import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

export const setPageGuard = (router: Router) => {
  // const userToken = useTokenStore(); // 在这使用pinia会报实例没有挂在的错误

  // const isAuthenticated: boolean = false
  router.beforeEach((to, from, next) => {
    const useStore = useUserStore() // 定义 store 接收
    const token: string = useStore.data.user?.token ?? ''
    if (to.name !== 'Login' && token.length === 0) next({ name: 'Login' })
    else next()
  })
}

import type { Router } from 'vue-router'
import {useTokenStore } from '@/stores/userStore'

export const setPageGuard = (router: Router) => {
  // const userToken = useTokenStore(); // 在这使用pinia会报实例没有挂在的错误

  // const isAuthenticated: boolean = false
  router.beforeEach((to, from, next) => {
      const {token} = useTokenStore();
    if (to.name !== 'Login' && (!token || token.length === 0)) next({ name: 'Login' })
    else next()
  })
}

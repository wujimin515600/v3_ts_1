import type { Router } from 'vue-router'

export const setPageGuard = (router: Router) => {
  const isAuthenticated: boolean = false
  router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
  })
}

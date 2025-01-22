import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useMenuStore } from '@/stores/menuStore'
import { getOpenKeys } from '@/utils'

export const setPageGuard = (router: Router) => {
  // const userToken = useTokenStore(); // 在这使用pinia会报实例没有挂在的错误

  router.beforeEach((to, from, next) => {

    const useStore = useUserStore() // 定义 store 接收
    const menuStore = useMenuStore()
    const token: string = useStore.data.user?.token ?? ''
    if (to.name !== 'Login' && token.length === 0) {
      next({ name: 'Login' })
    } else {
      // 注意 ant-design-vue 的menu的selectKeys 需要的key 是小写，需要把router的name 转一下
      menuStore.setSelectedKey(((to.name) as string).toLowerCase());
      menuStore.setOpenKeys(getOpenKeys(to.path));
      next()
    }
  })
}

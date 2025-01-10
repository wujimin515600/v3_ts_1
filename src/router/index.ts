import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import UserView from '@/views/user/UserHome.vue'
import addUserView from '@/views/user/UserAdd.vue'
import temlateView from '@/views/base/BaseModule.vue'
import { basicRoutes } from './routes'
import { setPageGuard } from './guard'
import { addChildrenRoute } from '@/utils/addRouter'
// console.log('basic', basicRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

const UserRouter: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'User',
    // component: UserView,
    // redirect: '/user',
    children: [
      {
        path: 'userlist',
        name: 'UserList',
        component: UserView,
        meta: {
          title: '用户列表',
          icon: 'UserOutlined'
        }
      },
      {
        path: 'adduser',
        name: 'AddUser',
        component: addUserView,
        meta: {
          title: '添加用户',
          icon: 'UsergroupAddOutlined'
        }
      }
    ],
    meta: {
      title: '用户管理',
      icon: 'UserOutlined'
    }
  }
]

const templateRouter: RouteRecordRaw[] = [
  {
    path: 'base',
    name: 'Base',
    children: [
      {
        path: 'temlate',
        name: 'temlate',
        component: temlateView,
        meta: {
          title: '模块列表',
          icon: 'UserOutlined'
        }
      }
    ],
    meta: {
      title: '基础模块',
      icon: 'UserOutlined'
    }
  }
]

addChildrenRoute(router, '/', UserRouter[0])
addChildrenRoute(router, '/', templateRouter[0])

setPageGuard(router)
export default router

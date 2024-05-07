import type { RouteRecordRaw } from 'vue-router'
import HView from '../../views/HView.vue'
import HomeView from '@/layout/LayoutView.vue'
import LoginView from '../../views/LoginView.vue'
import NotFoundView from '../../views/NotFoundView.vue'
import AboutView from '@/views/AboutView.vue'

const LayoutRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: HomeView,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HView,
        meta: {
          title: '控制台',
          icon: 'HomeTwoTone'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: AboutView,
        meta: {
          title: '关于',
          icon: 'GoldTwoTone'
        }
      }
    ]
  }
]

const LoginRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: '登录',
      hidden: true
    }
  }
]
const NotFoundRouter: RouteRecordRaw[] = [
  {
    path: '/not',
    name: 'Not',
    component: NotFoundView,
    meta: {
      title: '404',
      hidden: true
    }
  }
]


export const basicRoutes: RouteRecordRaw[] = [
  ...LayoutRouter,
  ...LoginRouter,
  ...NotFoundRouter,
  // ...UserRouter
]

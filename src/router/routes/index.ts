import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import LoginView from '../../views/LoginView.vue'
import NotFoundView from '../../views/NotFoundView.vue'
import AboutView from '@/views/AboutView.vue'

const LayoutRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '',
    component: HomeView,
    children: []
  }
]

const LoginRouter: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]
const NotFoundRouter: RouteRecordRaw[] = [
  {
    path: '/not',
    name: 'Not',
    component: NotFoundView
  }
]

const AboutRouter: RouteRecordRaw[] = [
  {
    path: '/about',
    name: '关于',
    component: AboutView
  }
]
export const basicRoutes: RouteRecordRaw[] = [
  ...LayoutRouter,
  ...LoginRouter,
  ...NotFoundRouter,
  ...AboutRouter
]

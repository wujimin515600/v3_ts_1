import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import LoginView from '../../views/LoginView.vue'
import NotFoundView from '../../views/NotFoundView.vue'

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
export const basicRoutes: RouteRecordRaw[] = [...LayoutRouter, ...LoginRouter, ...NotFoundRouter]

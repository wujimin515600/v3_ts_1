import { MockMethod } from 'vite-plugin-mock'
import { getMenus, getUsers, Login } from './modules'

const mocks: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    response: Login
  },
  {
    url: '/api/users',
    method: 'post',
    response: getUsers
  },
  {
    url: '/api/getMenus',
    method: 'post',
    response: getMenus
  }
]

export default mocks

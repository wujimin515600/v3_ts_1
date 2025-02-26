import { MockMethod } from 'vite-plugin-mock'
import { getMenus, getUsers, Login, getDictionary } from './modules'

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
  },
  {
    url: '/api/getDictionary',
    method: 'post',
    response: getDictionary
  }
]

export default mocks

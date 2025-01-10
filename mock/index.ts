import { MockMethod } from 'vite-plugin-mock'
import { getUsers, Login } from './modules'

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
  }
]

export default mocks

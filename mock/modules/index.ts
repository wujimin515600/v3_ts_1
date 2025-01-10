import { returnOption } from './dto'
import { createUserList, users } from './user'

/**
 * login
 * @param axios请求的信息包含 url,body,query,headers
 * @return Object
 */

export const Login = ({ body }) => {
  const { username, password } = body
  const user = createUserList().find(
    (item) => item.username === username && item.password === password
  )
  if (!user) {
    return returnOption['userNotFound']
  }

  return { data: user, ...returnOption['success'] }
}

export const getUsers = ({ headers }) => {
  const { token } = headers
  if (!token) {
    return returnOption['invainToken']
  }

  return { data: users, ...returnOption['success'] }
}

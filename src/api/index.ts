import { get, post, type Params } from './request'

// service
//   .get('/api/login')
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// service
//   .post('/api/login',{})
//   .then((response) => {
//     console.log(response)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

export const Login = async (params: Params) => {
  return await post('/login', params)
}

export const getUsers = async (params: Params) => {
  return await post('/users', params)
}

export const deleteUser = async (params: Params) => {
  return {msg: '删除成功', data: []}
}
export const updateUser = async (params: Params) => {
  return { msg: '修改成功', data: []}
}

export const createUser = async (params: Params) => {
  return {msg: '创建成功', data: []}
}

export const getMenu = async() => {
  // return {msg: '创建成功', data: []}
  return await post('/getMenus', {})
}

export const deleteMenu = async (params: Params) => {
  return {msg: '删除成功', data: []}
}
export const updateMenu = async (params: Params) => {
  return { msg: '修改成功', data: []}
}

export const createMenu = async (params: Params) => {
  return {msg: '创建成功', data: []}
}

export const getDictionary = async() => {
  // return {msg: '创建成功', data: []}
  return await post('/getDictionary', {})
}

export const deleteDictionary = async (params: Params) => {
  return {msg: '删除成功', data: []}
}
export const updateDictionary = async (params: Params) => {
  return { msg: '修改成功', data: []}
}

export const createDictionary = async (params: Params) => {
  return {msg: '创建成功', data: []}
}
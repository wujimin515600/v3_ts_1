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

export const getUser = async (params: Params) => {
  return await post('/users', params)
}

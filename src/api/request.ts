import axios from 'axios'
import { message } from 'ant-design-vue'
// import QS from 'qs'
import { useUserStore } from '@/stores/userStore'

// const baseURL: string = 'http://127.0.0.1'
const baseURL: string = '/api'

// 创建axios实例
const service = axios.create({
  //   baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  baseURL,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加请求头等信息
    const useStore = useUserStore() // 定义 store 接收
    const token: string = useStore.data.user?.token ?? ''
    if (token) {
      config.headers['Token'] = token
    }
    return config
  },
  (error) => {
    // 请求错误处理
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做处理，例如只返回data部分
    const res = response.data
    if (res.code !== 200) {
      message.error(res.msg, 5000)
      // (content, [duration], onClose)
      // 50001: 非法的token; 50002: 其他客户端错误; 50003: 认证失败; 50004: 授权失败; 50005: 未找到用户
      if (
        res.code === 50001 ||
        res.code === 50002 ||
        res.code === 50003 ||
        res.code === 50004 ||
        res.code === 50005
      ) {
        // 移除token
        // resetToken();
        // 跳转到登录页面
        // location.reload()
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    message.error(error.msg, 5000)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error)
  }
)
export interface Params {
  [x: string]: string | undefined
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: Params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: Params) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
// export default service

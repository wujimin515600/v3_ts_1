import type { Params } from "@/api/request"

export interface User {
  userId: number
  avatar: string
  username: string
  password: string
  roles: string[]
  buttons: string[]
  routes: string[]
  desc: string
  token: string
}

export interface HeaderRightMenu {
  title: string
  path: string | undefined
  type: string
}

export interface MenuItemInfo {
  keyPath: string[]
  key: string
}

/**
 * @description: 首字母大写转化
 * @param {string} str - 要处理的字符串 示例:user
 * @return {string} 已经处理完成的字符串 示例:User
 */
export const capitalizeEachWord =  (str: string = ''): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * @description: 获取二级嵌套路由的展开项
 * @param {string} path - 要处理的路径 示例: /user/adduser
 * @return {Array} 返回的数据 示例: []/['User']
 */
export const getOpenKeys = (path: string = ''): Array<any>=> {
  const arr = path.split('/').filter(item => item);
  if (arr.length === 1) return [];
  return [capitalizeEachWord(arr[0])];
}


export interface UserQueryParams extends Params {
  username?: string
  role?: string
  page: number
  pageSize: number
}
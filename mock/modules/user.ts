import Mock from 'mockjs'
//用户信息数据
export function createUserList() {
  return [
    {
      userId: 1,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['platform'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token'
    },
    {
      userId: 2,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['admin'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token'
    }
  ]
}

export const users = Mock.mock({
  'items|30': [
    {
      userId: '@id',
      username: '@name',
      password: '888888',
      // 'age|18-30': 1,
      avatar: Mock.Random.image(),
      desc: '用户',
      roles: [''],
      buttons: ['cuser.detail'],
      routes: [],
      token: 'Token'
    }
  ]
})

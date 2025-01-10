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

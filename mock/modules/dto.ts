// 50001: 非法的token; 50002: 其他客户端错误; 50003: 认证失败; 50004: 授权失败; 50005: 未找到用户
export enum Code {
  success = 200,
  invainToken = 50001,
  systemError = 50002,
  verifyFail = 50003,
  authFail = 50004,
  userNotFound = 50005
}

export const returnOption = {
  success: {
    code: Code.success,
    msg: '登录成功'
  },
  invainToken: {
    code: Code.invainToken,
    msg: '非法的token'
  },
  systemError: {
    code: Code.systemError,
    msg: '其他客户端错误'
  },
  verifyFail: {
    code: Code.verifyFail,
    msg: '认证失败'
  },
  authFail: {
    code: Code.authFail,
    msg: '授权失败'
  },
  userNotFound: {
    code: Code.userNotFound,
    msg: '帐户或密码错误'
  }
}

interface api {
  [key: string]: string
}
export interface responseType <T> {
  content: T
  success: boolean
  msg: string
}
const apis: api = {
  // userAbout
  login: '/login',// 登陆接口
  fetchUserInfo: '/fetchUserInfo',//通过token获取用户信息
}

export default apis

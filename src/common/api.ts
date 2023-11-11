interface api {
  [key: string]: string
}
export interface responseType<T> {
  content: T
  success: boolean
  msg: string
}
const apis: api = {
  // userAbout
  login: '/login',// 登陆接口
  fetchUserInfo: '/fetchUserInfo',// 通过token获取用户信息
  posts: '/myPosts',// 获取用户所有的帖子
  postDetail: '/postDetail', // 获取帖子详情
  register: '/register', //注册新用户
}

export default apis

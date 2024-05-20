enum AxiosRequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  HEAD = 'head',
  OPTIONS = 'options'
}

export interface responseType<T> {
  content: T
  success: boolean
  msg: string
}

// interface IcompleteApi {
//   [key: string]: string | {
//     name: string
//     method: AxiosRequestMethod
//     func?: (...args: unknown[]) => Promise<responseType<unknown>>
//   }
// }

type apiType = {
  [key: string]: string
}


const apis: apiType = {
  // userAbout
  login: '/login',// 登陆接口
  fetchUserInfo: '/fetchUserInfo',// 通过token获取用户信息
  posts: '/myPosts',// 获取用户所有的帖子
  register: '/register', //注册新用户
  // posts
  fetchPost: '/fetchPost',// 获取帖子详情
  deletePost: '/deletePost',// 删除帖子
}

export default apis

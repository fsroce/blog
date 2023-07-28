import axios from 'axios'
import { defineStore } from 'pinia'

export interface userAbout {
  islogin?: boolean
  userName: string
  userId: number
  avatar?: string
  identity?: string
  token?: string
}

const useUserStore = defineStore('userAbout', {
  state: (): userAbout => ({
    userName: '',
    userId: 0,
    avatar: '',
    islogin: false
  }),
  actions: {
    changeState ({ userName, avatar, identity, token, userId }: userAbout) {
      this.$patch({
        userName, avatar, identity, userId, islogin: true
      })
      token && localStorage.setItem('blog_token', token)
      // 完成登录后的鉴权
      token && (axios.defaults.headers.common.Authorization = token)
    }
  }
})

export default useUserStore

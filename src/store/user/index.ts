import { defineStore } from 'pinia'

export interface userAbout {
  islogin?: boolean
  userName: string
  userId: number
  token: string
  avatar?: string
  identity?: string
}

const useUserStore = defineStore('userAbout', {
  state: (): userAbout => ({
    userName: '',
    userId: 0,
    token: '',
    avatar: '',
    islogin: false
  }),
  actions: {
    changeState ({ userName, avatar, identity, token, userId }: userAbout) {
      this.$patch({
        userName, avatar, identity, token, userId, islogin: true
      })
      localStorage.setItem('blog_token', token)
    }
  }
})

export default useUserStore

import apis, { responseType } from '@/common/api'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface userAbout {
  islogin?: boolean
  userName: string
  userId: number
  avatar?: string
  identity?: string
  token?: string
  postsId?: number[]
}

const useUserStore = defineStore('userAbout', {
  state: (): userAbout => ({
    userName: '',
    userId: 0,
    avatar: '',
    islogin: false,
    postsId: []
  }),
  actions: {
    changeState ({ userName, avatar, identity, token, userId }: userAbout) {
      this.$patch({
        userName, avatar, identity, userId, islogin: true
      })
      token && localStorage.setItem('blog_token', token)
      // 完成登录后的鉴权
      token && (axios.defaults.headers.common.Authorization = token)
    },
    async getUserInfo(token: string) {
      token = token ? token : localStorage.getItem('blog_token') as string
      const { data } = await axios.post(apis.fetchUserInfo, { token })
      if (data.success) {
        this.changeState(data.content)
      } else {
        // TODO
      }
      return data.success
    },
    getPosts () {
      const userId = this.userId
      if (userId !== undefined) {
        axios.get(`${apis.posts}/${userId}`).then(res => {
          const { data } = res
          if (data.success) {
            const { content } = data
            this.postsId = content
          } else {
            alert(data.msg)
          }
        }, rej => {
          console.log(rej)
        })
      }
    }
  }
})

export default useUserStore

import apis from '@/common/api'
import { setLoading } from '@/helper'
import useCreateMessage from '@/hooks/useCreateMessage'
import router from '@/router'
import axios from 'axios'
import { defineStore } from 'pinia'

export interface IBriefPost {
  postId: number
  userId: number
  img?: string
  excerpt?: string
  title?: string
  updateTime?: string
}

export interface userAbout {
  islogin?: boolean
  userName: string
  userId: number
  avatar?: string
  identity?: string
  token?: string
  posts?: IBriefPost[]
}

const useUserStore = defineStore('userAbout', {
  state: (): userAbout => ({
    userName: '',
    userId: 0,
    avatar: '',
    islogin: false,
    posts: []
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
    async userLogin ({ name, pwd }: { name: string, pwd: string }) {
      console.log('user login loading...')
      setLoading(true)
      try {
        const { data } = await axios.post(apis.login, { name, pwd })
        if (data.success) {
          this.changeState(data.content)
          useCreateMessage('登录成功，两秒后跳转')
          router.push('/')
        } else {
          console.log(data.msg)
        }
        console.log('login', data)
        setLoading(false)
        console.log('user login loaded')
        return data.success
      } catch (e) {
        setLoading(false)
      }
      return false
    },
    async getUserInfo(token: string) {
      token = token ? token : localStorage.getItem('blog_token') as string
      try {
        console.log('get user info loading...');
        setLoading(true)
        const { data } = await axios.post(apis.fetchUserInfo, { token })
        console.log(data)
        if (data.success) {
          this.changeState(data.content)
          await this.getPosts(data.content.userId)
        } else {
          router.push('/login')
        }
        setLoading(false)
        console.log('get user info loaded');
        return data.success
      } catch (e) {
        setLoading(false)
      }
      return false
    },
    async getPosts (userId: number | string) {
      const { data } = await axios.get(`${apis.posts}/${userId}`)
      if (data.success) {
        this.$patch({ posts: data.content })
      }
    }
  }
})

export default useUserStore

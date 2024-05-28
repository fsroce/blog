import { defineStore } from "pinia"
import apis from "@/common/api"
import axios from "axios"
import { responseType } from "@/common/api"
import useCreateMessage from "@/hooks/useCreateMessage"
import { setLoading } from "@/helper"
export interface Ipost {
  content: string
  excerpt?: string
  img?: string
  postId: number
  updateTime: Date | number | string
  userId?: number
  userName?: string
  title: string
}

export interface postFormData {
  [key: number | string]: Ipost
}

const usePostDetail = defineStore('PostDetail', {
  state: (): postFormData => ({
  }),
  actions: {
    async fetchPostContent(postId: number | string) {
      if (this.$state[postId]) {
        console.log('本地获取post')
        return this.$state[postId].content
      }
      console.log('获取服务器post')
      try {
        setLoading(true)
        const { data } = await axios.get<responseType<Ipost>>(`${apis.fetchPost}/${postId}`)
        // console.log('post detail', data);
        setLoading(false)
        if (data.success) {
          this.$state[postId] = data.content
          return data.content
        } else {
          useCreateMessage(`获取文章失败，错误信息 ${data.msg}`)
          return false
        }
      } catch (e) {
        setLoading(false)
        console.log(e);
      }
      return false
    },
    async deletePost (postId: number | string) {
      try {
        const { data } = await axios.post(apis.deletePost, { postId })
        if (data.success) {
          await useCreateMessage('删除成功！两秒后跳转首页')
          delete this.$state[postId]
          return true
        }
      } catch (e) {
        console.log(e);
      }
      return false
    },
    async getUpdedPost (postId: number | string) {
      try {
        const { data } = await axios.get<responseType<Ipost>>(`${apis.fetchPost}/${postId}`)
        if (data.success) {
          this.$state[postId] = data.content
          return true
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
})

export default usePostDetail

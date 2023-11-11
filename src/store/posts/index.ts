import { defineStore } from "pinia"
import apis from "@/common/api"
import axios from "axios"
export interface Ipost {
  content: string
  excerpt: string
  img?: string
  postId: number
  uploadTime: Date
}

export interface postFormData {
  [key: number]: Ipost
}

const usePostDetail = defineStore('PostDetail', {
  state: (): postFormData => ({
  }),
  actions: {
    async fetchPostContent(postId: number) {
      if (this.$state[postId]) {
        return this.$state[postId].content
      }
      const { data } = await axios.get(`${apis.postDetail}/${postId}`)
      console.log(data);
      // key 是 postId， value是内容
      return data
    }
  }
})

export default usePostDetail

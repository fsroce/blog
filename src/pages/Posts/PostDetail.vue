<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import { ref, onMounted, computed, watch } from 'vue'
import usePostDetail, { Ipost } from '@/store/posts/index'
import useUserStore from '@/store/user'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const md = new MarkdownIt()
const contentArea = ref<HTMLElement | null>(null)
const { postId } = route.params
const postDetail = usePostDetail()
const userStore = useUserStore()
const userId = computed(() => userStore.userId)
const postRef = ref<Ipost>({} as Ipost)
const computedPost = computed(() => postDetail.$state[postId as string])
onMounted(() => {
  postDetail.fetchPostContent(postId as string)
  // 使得state更新可以驱动渲染，但是本地更新不会驱动state更新
  watch(() => computedPost.value, (newVal: Ipost) => {
    postRef.value = { ...newVal }
    const content = md.render(newVal?.content || '')
    if (contentArea.value) {
      contentArea.value.innerHTML = content
    }
  }, { deep: true, immediate: true })
})

const deletePost = () => {
  if ((postRef.value.postId !== undefined) && (postRef.value.userId === userId.value)) {
    postDetail.deletePost(postRef.value.postId).then(success => {
      console.log(success);
      success && router.push('/')
    })
  }
}
</script>

<template>
  <div id="outer">
    <h3 id="title">{{ postRef.title }}</h3>
    <div v-if="postRef.img" id="img-container">
      <img :src="postRef.img">
    </div>
    <div id="content" ref="contentArea"></div>
    <div id="date-author" v-if="postRef.userName">作者：{{ postRef.userName }}</div>
    <div id="date-author">更新时间：{{ postRef.updateTime }}</div>
    <div id="button">
      <button v-if="userId === postRef.userId" @click="deletePost">删除</button>
      <button v-if="userId === postRef.userId" @click="1">修改</button>
    </div>
  </div>
</template>

<style scoped>
#outer {
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
  background-color: green;
  word-break: break-all;
  white-space: pre-wrap;
}
#img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
#date-author {
  text-align: right;
}
#button {
  display: flex;
  justify-content: center;
}
button {
  margin: 10px;
  width: 100px;
  height: 30px;
  outline: none;
  background-color: rgba(0, 255, 255, .7);
  border: none;
  border-radius: 10px;
}
</style>

<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import { ref, onMounted, computed } from 'vue'
import usePostDetail, { postFormData } from '@/store/posts/index'
import useUserStore from '@/store/user'
import { useRoute, useRouter } from 'vue-router'
import useSingleDataflow from '@/hooks/useSingleDataflow'
const route = useRoute()
const router = useRouter()
const md = new MarkdownIt()
const contentArea = ref<HTMLElement | null>(null)
const { postId } = route.params
const postDetail = usePostDetail()
const userStore = useUserStore()
const userId = computed(() => userStore.userId)
const onArticleUpded = () => {
  const content = md.render(postRef?.value?.content || '')
  if (contentArea.value) {
    contentArea.value.innerHTML = content
  }
}
const postRef = useSingleDataflow<postFormData>(postDetail, postId as string, onArticleUpded)
onMounted(() => {
  postDetail.fetchPostContent(postId as string)
})

const deletePost = () => {
  if ((postRef.value?.postId !== undefined) && (postRef.value.userId === userId.value)) {
    postDetail.deletePost(postRef.value.postId).then(success => {
      console.log(success);
      success && router.push('/')
    })
  }
}
</script>

<template>
  <div id="outer" class="doc-style">
    <h3 id="title">{{ postRef?.title }}</h3>
    <div v-if="postRef?.img" id="img-container">
      <img :src="postRef.img">
    </div>
    <div id="content" ref="contentArea"></div>
    <div id="date-author" v-if="postRef?.userName">作者：{{ postRef.userName }}</div>
    <div id="date-author" v-if="postRef?.updateTime">更新时间：{{ postRef?.updateTime }}</div>
    <div id="button">
      <button v-if="userId === postRef?.userId" @click="deletePost">删除</button>
      <button v-if="userId === postRef?.userId" @click="router.push(`/edit/${postRef.postId}`)">修改</button>
    </div>
  </div>
</template>

<style>
.doc-style {
  width: 80%;
  margin: 0 auto;
  margin-top: 10px;
  word-break: break-all;
  white-space: pre-wrap;
}
</style>

<style scoped>
#outer {
  background-color: green;
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

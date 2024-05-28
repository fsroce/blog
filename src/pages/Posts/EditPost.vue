<script lang="ts" setup>
import useSingleDataflow from '@/hooks/useSingleDataflow';
import useClickInside from '@/hooks/useClickInside';
import useUserStore from '@/store/user';
import usePostDetail, { Ipost } from '@/store/posts';
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import apis from '@/common/api';
import useCreateMessage from '@/hooks/useCreateMessage';
import router from '@/router';
const md = new MarkdownIt()
const userInfo = useUserStore()
const posts = usePostDetail()
const userId = computed(() => userInfo.userId)
const route = useRoute()
const { postId } = route.params
const post = computed(() => posts.$state[postId as string])
const postRef = useSingleDataflow(posts, postId as string)
const excerpt = ref<HTMLElement | null>(null)
const title = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const readArea = ref<HTMLElement | null>(null)
const clickArea = reactive({
  title: useClickInside(title),
  content: useClickInside(content),
  excerpt: useClickInside(excerpt)
})
const onArticalUpded = () => {
  const content = md.render(postRef?.value?.content || '')
  if (readArea.value) {
    readArea.value.innerHTML = content
  }
  if (postRef.value?.updateTime) {
    postRef.value.updateTime = new Date()
  }
}
onMounted(() => {
  posts.fetchPostContent(postId as string)
})

const updArtical = () => {
  if (userId.value !== post.value.userId) return
  // 设置下文章判定更新的键
  const articalUpdKey: (keyof Ipost)[] = ['content', 'excerpt', 'title']
  const isArticalUpded = articalUpdKey.some((key) => postRef.value && (postRef.value[key] !== post.value[key]))
  if (isArticalUpded) {
    axios.post(apis.updPost, postRef.value).then(async res => {
      if (res.data.success) {
        await useCreateMessage('更新成功，两秒后跳转首页')
        posts.getUpdedPost(postId as string)
        router.push('/')
      }
    })
  }
}
const cancelUpd = () => {
  //
}
watchEffect(() => {
  if (!clickArea.content) {
    if (post?.value?.content === postRef?.value?.content) return
    onArticalUpded()
  }
  if (!clickArea.title) {
    if (post?.value?.title === postRef?.value?.title) return
    onArticalUpded()
  }
})
</script>

<template>
  <div id="isAuthor" class="doc-style" v-if="userId === postRef?.userId">
    <div id="title" ref="title">
      <h3 v-show="!clickArea.title">{{ postRef.title || '标题' }}</h3>
      <input id="editTitle" type="text" v-model.lazy="postRef.title" v-show="clickArea.title">
    </div>
    <div id="excerpt" ref="excerpt">
      <div v-show="!clickArea.excerpt">{{ postRef.excerpt || '摘要' }}</div>
      <input id="editExcerpt" v-model.lazy="postRef.excerpt" v-show="clickArea.excerpt">
    </div>
    <div id="content" ref="content">
      <div id="readArea" ref="readArea" v-show="!clickArea.content">{{ postRef.content }}</div>
      <textarea id="editcontent" v-show="clickArea.content" v-model.lazy="postRef.content" />
    </div>
    <div id="date" v-if="postRef?.userName && postRef?.updateTime">
      <div>更新时间{{ postRef.updateTime }}</div>
      <div>作者{{ postRef.userName }}</div>
    </div>
    <div id="button">
      <button @click="updArtical">发布</button>
      <button @click="cancelUpd">取消</button>
    </div>
  </div>
  <div id="notAuthor" v-else></div>
</template>

<style scoped>
#isAuthor {
  background-color: yellowgreen;
}

#notAuthor {}
</style>

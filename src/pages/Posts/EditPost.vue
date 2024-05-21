<script lang="ts" setup>
import useSingleDataflow from '@/hooks/useSingleDataflow';
import useClickInside from '@/hooks/useClickInside';
import useUserStore from '@/store/user';
import usePostDetail from '@/store/posts';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt()
const userInfo = useUserStore()
const posts = usePostDetail()
const userId = computed(() => userInfo.userId)
const route = useRoute()
const { postId } = route.params
const postRef = useSingleDataflow(posts, postId as string)
const title = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const readArea = ref<HTMLElement | null>(null)
const clickArea = reactive({
  title: useClickInside(title),
  content: useClickInside(content)
})
watch(() => clickArea.content, (newVal) => {
  if (newVal) return
  onContentUpded()
})
const onContentUpded = () => {
  const content = md.render(postRef?.value?.content || '')
  if (readArea.value) {
    readArea.value.innerHTML = content
  }
}
onMounted(() => {
  posts.fetchPostContent(postId as string)
})
</script>

<template>
  <div id="isAuthor" class="doc-style" v-if="userId === postRef?.userId">
    <div id="title" ref="title">
      <h3 v-show="!clickArea.title">{{ postRef.title }}</h3>
      <input id="editTitle" type="text" v-model.lazy="postRef.title" v-show="clickArea.title">
    </div>
    <div id="content" ref="content">
      <div id="readArea" ref="readArea" v-show="!clickArea.content">{{ postRef.content }}</div>
      <textarea id="editcontent" v-show="clickArea.content" v-model.lazy="postRef.content" />
    </div>
    <div id="date" ref="date" v-if="postRef?.userName && postRef?.updateTime">
      <div>更新时间{{ postRef.updateTime }}</div>
      <div>作者{{ postRef.userName }}</div>
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

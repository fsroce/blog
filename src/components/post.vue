<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import { useRoute } from 'vue-router'
import usePostDetail from '@/store/posts/index'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'PostDetail'
})
const route = useRoute()
const md = new MarkdownIt()
const postWrapper = ref<HTMLElement | null>()
console.log(postWrapper);

const postStore = usePostDetail()
onMounted(() => {
  const postId = +route.params.id || 0
  if (!postId) return
  postStore.fetchPostContent(postId).then(content => {
    content = md.render(content)
    console.log(content, typeof content);
    if (postWrapper.value) {
      postWrapper.value.innerHTML = content
    }
  })
})
</script>

<template>
  <div class="post_outer" ref="postWrapper">
  </div>
</template>

<style scoped>
.post_outer {
  background-color: red;
  margin: 0 auto;
}
</style>

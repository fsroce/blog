<script lang="ts" setup>
import { onMounted } from 'vue';
import useSingleDataflow from '@/hooks/useSingleDataflow'
import usePostDetail, { postFormData } from '@/store/posts/index'
const post = usePostDetail()
const postRef = useSingleDataflow<postFormData>(post, 0)

onMounted(() => {
  post.fetchPostContent(0)
})
</script>

<template>
  <div>
    {{ postRef }}
  </div>
</template>
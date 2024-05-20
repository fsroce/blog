<script lang="ts" setup>
import useUserStore from '@/store/user';
import { computed, onMounted } from 'vue'
import BriefPost from '@/components/BriefPost.vue'


const userStore = useUserStore()
const posts = computed(() => userStore.posts)
onMounted(() => {
  console.log('home mounted')
})
</script>

<template>
  <template v-for="(post) in posts" :key="post.postId">
    <brief-post :post="post" />
  </template>
</template>

<style scoped></style>

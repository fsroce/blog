<script lang="ts" setup>
import useUserStore from '@/store/user';
import { computed, onMounted } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'
import BriefPost from '@/components/BriefPost.vue'

// test
import { setLoading } from '@/helper'

const userStore = useUserStore()
const posts = computed(() => userStore.posts)
onMounted(() => {
  console.log('home mounted')
})
</script>

<template>
  <global-header />
  <template v-for="(post) in posts" :key="post.postId">
    <brief-post :post="post" />
  </template>
</template>

<style scoped></style>

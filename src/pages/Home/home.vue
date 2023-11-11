<script lang="ts" setup>
import post from '@/components/post.vue'
import useUserStore from '@/store/user';
import { onMounted } from 'vue'
const userStore = useUserStore()
onMounted(() => {
  userStore.getPosts()
})
</script>

<template>
  <div></div>
  <post></post>
</template>

<style scoped></style>

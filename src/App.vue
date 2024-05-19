<template>
  <!-- <global-header></global-header> -->
  <router-view></router-view>
  <!-- <post-detail></post-detail> -->
</template>

<script lang="ts" setup>
// import GlobalHeader from '@/components/header.vue'
// import PostDetail from '@/components/post.vue'
// import home from './pages/Home/home.vue'
import { onMounted } from 'vue'
import useUserStore from '@/store/user'
import router from './router'
const userStore = useUserStore()
let path = window.location.pathname
onMounted(async () => {
  console.log('app mounted');
  
  const token = localStorage.getItem('blog_token')
  if (token) {
    await userStore.getUserInfo(token)
  } else {
    router.push(`/login`)
  }
})
</script>

<style>
#app {
  width: 100%;
  height: 99vh;
}
</style>

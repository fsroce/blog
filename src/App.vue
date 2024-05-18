<template>
  <!-- <global-header></global-header> -->
  <router-view></router-view>
  <!-- <post-detail></post-detail> -->
</template>

<script lang="ts" setup>
import GlobalHeader from '@/components/header.vue'
import PostDetail from '@/components/post.vue'
import home from './pages/Home/home.vue'
import { onMounted } from 'vue'
import useUserStore from './store/user'
import router from './router'
import { useSetLoading } from './hooks/useSetLoading'
const userStore = useUserStore()
let path = window.location.pathname
console.log('App', path);
onMounted(() => {
  const token = localStorage.getItem('blog_token')
  if (token) {
    // 防止因token校验带来的闪屏问题
    userStore.islogin = true
    // 本地存有token，获取用户信息
    userStore.getUserInfo(token).then(res => {
      console.log('App', res);
      if (res) {
        router.push(path)
      } else {
        userStore.islogin = false
        router.push(`/login/redirect=${path}`)
      }
    }).catch(e => {
      userStore.islogin = false
      router.push(`/login/redirect=${path}`)
      console.log(e)
    })
  }
})
useSetLoading(true)
setTimeout(() => {
  useSetLoading(false)
}, 5000)
</script>

<style>
#app {
  width: 100%;
  height: 99vh;
}
</style>

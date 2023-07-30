<template>
  <global-header></global-header>
  <!-- <router-view></router-view> -->
</template>

<script lang="ts" setup>
import GlobalHeader from '@/components/header.vue'
import { onBeforeMount, computed } from 'vue'
import useUserStore from './store/user'
import axios from 'axios';
import apis from './common/api'
import router from './router'
const userStore = useUserStore()
const islogin = computed(() => userStore.islogin)
onBeforeMount(() => {
  const token = localStorage.getItem('blog_token')
  if (token) {
    // 本地存有token，获取用户信息
    axios.post(apis.fetchUserInfo, { token }).then(res => {
      const { data } = res
      if (data.success) {
        userStore.changeState(data.content)
      }
    }).catch(e => {
      console.log(e)
      router.push('/login')
    })
  } else {
    router.push('/login')
  }
})
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>

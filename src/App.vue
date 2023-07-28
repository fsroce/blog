<template>
  <global-header></global-header>
  <router-view></router-view>
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
    axios.post(apis.fetchUserInfo, { token }).then(res => {
      const { data } = res
      userStore.changeState(data.content)
    }).catch(e => {
      console.log(e)
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

<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { onBeforeMount, computed } from 'vue'
import useUserStore from './store/user'
import axios from 'axios';
import apis from './common/api';
const userStore = useUserStore()
const islogin = computed(() => userStore.islogin)
onBeforeMount(() => {
  const token = localStorage.getItem('blog_token')
  if (token) {
    axios.post(apis.fetchUserInfo, { token })
  }
})
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>

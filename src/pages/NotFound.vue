<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, ref, onBeforeUnmount } from 'vue'
let timer: number | undefined | string
const countDown = ref(5)
const router = useRouter()
onMounted(() => {
  timer = window.setInterval(() => {
    if (countDown.value > 0) {
      countDown.value -= 1
    } else {
      timer && clearInterval(timer)
      router.push('/')
    }
  }, 1000)
})
onBeforeUnmount(() => {
  timer && clearInterval(timer)
})
</script>

<template>
  <div id="outer">
    <h2>there is nothing here</h2>
    date now
    <div>{{ new Date() }}</div>
    <div>redirecting to home page in {{ countDown }} seconds...</div>
  </div>
</template>

<style scoped>
#outer {
  width: fit-content;
  margin: 60px auto;
}
h2 {
  text-align: center;
}
div {
  text-align: center;
  margin-top: 20px;
}
</style>

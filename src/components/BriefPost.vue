<script lang="ts" setup>
import { PropType, onMounted } from 'vue';
import { IBriefPost } from '@/store/user/index'
import router from '@/router';
import useUserStore from '@/store/user/index';
const props = defineProps({
  post: {
    type: Object as PropType<IBriefPost>,
    required: true
  }
})
const userInfo = useUserStore()
onMounted(() => {
  userInfo.getPosts(userInfo.userId)
})
</script>

<template>
  <div id="outer">
    <img id="pic" :src="props.post.img && props.post.img" />
    <div id="content" @click="router.push(`/posts/${post.postId}`)">
      <h3>{{ props.post.title }}</h3>
      <p>{{ props.post.excerpt }}</p>
      <div id="date">{{ props.post.updateTime }}</div>
    </div>
  </div>
</template>

<style scoped>
#outer {
  width: 80%;
  height: 200px;
  margin: 0 auto;
  margin-top: 25px;
  border-radius: 20px;
  background-color: rgb(114, 167, 114);
  display: flex;
  overflow: hidden;
}
#pic {
  width:160px;
  height: 160px;
  background-color: yellow;
  margin: auto;
  margin-left: 20px;
  user-select: none;
}
#content {
  width: 100%;
  height: 80%;
  margin: auto;
  overflow: hidden;
}
#date {
  margin: auto 25px auto auto;
  text-align: end;
}
h3, p {
  margin-left: 20px;
}
p {
  max-height: 60px;
  overflow: hidden;
  text-overflow: clip;
}
</style>

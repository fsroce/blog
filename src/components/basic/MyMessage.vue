<script lang="ts" setup>
import { ref } from 'vue';
import { destoryMsg } from '@/hooks/useCreateMessage'
const visible = ref(true)
const closeMsg = () => {
  console.log('my_message_close');
  visible.value = false
  destoryMsg()
}

defineProps(['msg'])
</script>

<template>
  <teleport to='#message'>
    <div class="message_wrapper" v-if="visible">
      <div class="message_msg"> {{ msg }} </div>
      <div class="message_close" title="关闭"
        @click="closeMsg"
      >x</div>
    </div>
  </teleport>
</template>

<style scoped>
#message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(107, 97, 97, 0.3);
  color: #bfa;
  user-select: none;
}
.message_wrapper {
  width: 90%;
  height: 60px;
  background-color: white;
  margin: 20px auto;
  max-width: 800px;
  overflow: hidden;
  display: flex;
  border-radius: 10px;
}
.message_msg {
  /* background-color: purple; */
  width: 80%;
  height: 90%;
  margin: auto;
  text-align: center;
  line-height: 54px;
  text-overflow: hidden;
}
.message_close {
  height: 48px;
  width: 48px;
  border: 1px #bfa solid;
  border-radius: 5px;
  margin: auto;
  margin-top: 6px;
  margin-right: 15px;
  text-align: center;
  line-height: 45px;
  overflow: hidden;
  font-size: larger;
}
</style>
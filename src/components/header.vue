<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { ref, watch } from 'vue'
import router from '@/router';
import { droptearMeau } from './droptears.vue';
import DropTear from './droptears.vue';
import useClickOutside from '@/hooks/useClickOutside'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'GlobalHeader'
})
const userDropOptions: droptearMeau[] = [
  { 
    description: '个人中心',
    func: () => { router.push('/user') } 
  },
  { 
    description: '我的文章',
    func: () => { router.push('/myPosts') }
  },
  {
    description: '退出登录',
    func: () => { router.push('/logout') }
  }
]
const homePage = () => {
  router.push('/')
}
// 控制droptear显示与隐藏
const isOpen = ref(false)
const showDropTear = ref(null)
const isClickOutside = useClickOutside(showDropTear)
watch(isClickOutside, () => {
  console.log(isClickOutside);
  if (isClickOutside.value && isOpen.value) {
    isOpen.value = false
  }
})
</script>

<template>
  <div class="header_outer">
    <div class="header_inner_box">
      <h3 class="title" @click="homePage">
        <a>fsrice blog</a>
      </h3>
      <div class="user_center"
        @click="isOpen=!isOpen"
        ref="showDropTear"
      >
        <img src="../common/svg/user.svg">
        <drop-tear :meau="userDropOptions"
          v-show="isOpen"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header_outer {
  width: 100%;
  height: 3.75rem;
  background-color: #bfa;
}
.header_inner_box {
  position: relative;
  height: 100%;
  width: 80%;
  margin: 0 auto;
  background-color: red;
}
.title {
  line-height: 3.75rem;
}
.user_center {
  position: absolute;
  height: 2.5rem;
  width: 2.5rem;
  background-color: blue;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto 0;
}
</style>

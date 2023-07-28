<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { validateFunction } from '@/components/basic/MyInput.vue'
import { reactive, ref } from 'vue'
import useUserStore, { userAbout } from '@/store/user/index'
import { throttle } from '@/helper/index'
import axios from 'axios'
import apis, { responseType } from '@/common/api'

// 登陆事件规则
const isEmpty: validateFunction = (arg: string | number) => (arg !== undefined && arg !== '')
export type rules = ({ msg: string, validateFunc: validateFunction })[]
const userNameRules: rules = [
  { msg: '账户名不能留空', validateFunc: isEmpty },
]
const passwordRules: rules = [
  { msg: '密码不能为空', validateFunc: isEmpty }
]
// 登录功能
const user = reactive({
  name: '',
  pwd: ''
})
const upass = ref(false), ppass = ref(false)
const userStore = useUserStore()
function login () {
  const passed = ref(false)
  const { name, pwd } = user
  passed.value = upass.value && ppass.value
  if (passed.value) {
    console.log('login', user)
    axios.post(apis.login, { name, pwd }).then(res => {
      const data = res.data as responseType<userAbout>
      if (data.success) {
        console.log(data)
        alert('login successfully')
        userStore.changeState(data.content)
      } else {
        alert(data.msg)
      }
    }, rej => {
      console.log(rej)
    })
  }
}
const submit = throttle(login, 2000, true)
</script>

<template>
  <div class="outer">
    <div class="container">
      <h1>Welcome</h1>
      <div class="form">
          <my-input type="text" @blur="(e: boolean) => upass = e" placeholder="您的账号" :rules="userNameRules" v-model="user.name" />
          <my-input type="password" @blur="(e: boolean) => ppass = e" placeholder="您的密码" :rules="passwordRules" v-model="user.pwd" />
          <button class="btn-login" @click="submit">登录</button>
      </div>
    </div>
    <ul class="bg-squares">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style>
.outer {
  width: 100%;
  height: 100vh;
  margin: auto;
  padding: 0;
  box-sizing: border-box;
  /* 弹性布局 居中显示 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  background: linear-gradient(to top left,#ffe29f,#ffa99f,#ff719a);
  /* 溢出隐藏 */
  overflow: hidden;
}
.container{
  width: 100%;
  text-align: center;
  color: #fff;
  overflow: hidden;
}
.container h1{
  font-size: 40px;
  font-weight: 100;
  letter-spacing: 2px;
  margin-bottom: 15px;
  /* 过渡效果 */
  transition: 1s ease-in-out;
}
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  opacity: 1;
  /* 不透明度改变时的过渡效果 */
  transition: opacity 0.5s;
}
.form input{
  border: 1px solid rgba(255,255,255,0.4);
  padding: 10px 15px;
  border-radius: .5rem;
  margin: 0 auto 42px auto;
  text-align: center;
  font-size: 15px;
  transition: 0.25s;
}
.form input::placeholder{
  color: #fff;
  font-size: 14px;
  font-weight: 300;
}
.form input:hover{
  background-color: rgba(255,255,255,0.4);
}
.form input:focus{
  background-color: #fff;
  width: 300px;
  color: #ff719a;
}
.btn-login{
  outline: none;
  background-color: #fff;
  color: #ff719a;
  border: none;
  width: 250px;
  padding: 10px 15px;
  border-radius: 3px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.25s;
}
.btn-login:hover{
  background-color: #f5f7f9;
}
/* 背景方块 */
.bg-squares{
  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 90%;
}
.bg-squares li{
  width: 40px;
  height: 40px;
  background-color: rgba(255,255,255,0.15);
  position: absolute;
  bottom: -160px;
  /* 执行动画：动画名 时长 线性 无限次播放 */
  animation: square 20s linear infinite;
}
/* 为每一个方块设置不同的位置、大小、动画延迟时间、动画时长、背景色 */
.bg-squares li:nth-child(1){
  left: 10%;
}
.bg-squares li:nth-child(2){
  left: 20%;
  width: 80px;
  height: 80px;
  /* 动画延迟时间 */
  animation-delay: 2s;
  /* 动画时长 */
  animation-duration: 17s;
}
.bg-squares li:nth-child(3){
  left: 25%;
  animation-delay: 4s;
}
.bg-squares li:nth-child(4){
  left: 40%;
  width: 60px;
  height: 60px;
  background-color: rgba(255,255,255,0.25);
  animation-duration: 22s;
}
.bg-squares li:nth-child(5){
  left: 70%;
}
.bg-squares li:nth-child(6){
  left: 80%;
  width: 120px;
  height: 120px;
  background-color: rgba(255,255,255,0.2);
  animation-delay: 3s;
}
.bg-squares li:nth-child(7){
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}
.bg-squares li:nth-child(8){
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}
.bg-squares li:nth-child(9){
  left: 25%;
  width: 10px;
  height: 10px;
  background-color: rgba(255,255,255,0.3);
  animation-delay: 2s;
  animation-duration: 40s;
}
.bg-squares li:nth-child(10){
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}
.container.success h1{
  transform: translateY(75px);
}
.container.success .form{
  opacity: 0;
  visibility: hidden;
}

/* 定义动画 */
@keyframes square {
  0%{
    transform: translateY(0);
  }
  100%{
    transform: translateY(-120vh) rotate(600deg);
  }
}
</style>

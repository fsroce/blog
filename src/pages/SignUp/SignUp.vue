<script lang="ts" setup>
import { reactive } from 'vue';
import { rules, userNameRules, passwordRules } from '@/pages/Login/loginRules'
import apis from '@/common/api'
import axios from 'axios';
import router from '@/router';
import { useRoute } from 'vue-router';
import useUserStore from '@/store/user';

const repeatPasswordRules: rules = [
  {
    msg: '确认密码不能为空！',
    validateFunc: (val) => val.trim() !== ''
  }, {
    msg: '两次输入的密码不一致！',
    validateFunc: (val1) => val1 && val1 === userInfo.pwd
  }
]
const userInfo = reactive({
  name: '',
  pwd: '',
  confirmPwd: ''
})
const allpass: { [key: string]: boolean } = reactive({
  name: false,
  pwd: false,
  confirmpwd: false
})
const signup = () => {
  if (Object.keys(allpass).every((key: string) => allpass[key])) {
    console.log('signup', allpass, userInfo);
    const route = useRoute()
    // 全盘通过
    const { name, pwd } = userInfo
    axios.post(apis.register, { name, pwd }).then(res => {
      const { data } = res
      if (data.success) {
        // TODO: REGIST SUCCESSFULLY
      }
    }).catch(e => {
      console.log(e);
      alert('error occured')
    })
  }
}
</script>

<template>
  <div class="login_outer">
    <div class="container">
      <h1>欢迎注册</h1>
      <div class="form">
        <my-input type="text" placeholder="您的邮箱" :rules="userNameRules" v-model="userInfo.name" @blur="(e: boolean) => allpass.name = e" />
        <my-input type="password" placeholder="您的密码" :rules="passwordRules" v-model="userInfo.pwd" @blur="(e: boolean) => allpass.pwd = e" />
        <my-input type="password" placeholder="重复密码" :rules="repeatPasswordRules" v-model="userInfo.confirmPwd" @blur="(e: boolean) => allpass.confirmpwd = e" />
        <button class="btn-login" @click="signup">注册</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * 23/7/25
 * Input组件
 * * 参数
 * type input类型
 * content input内容
 * placeholder placeholder
 * message input不合标准的错误提示
 * validateFunc input输入合格检测
 * 支持触发的事件
 * change 值改变时触发
 * pass 当输入的值满足条件触发
 * 
 * 失焦时会检测输入是否合格（传入validateFunc）
 */
import { reactive, PropType } from 'vue'
import { rules } from '@/pages/Login/login.vue'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type validateFunction = (arg: any) => (true | false)

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  content: {
    type: [Number, String],
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  rules: Object as PropType<rules>
})
const emits = defineEmits(['blur', 'change', 'update:modelValue'])
const inputVal = reactive({
  val: props.content,
  err: false,
  message: ''
})
const inputBlur = () => {
  console.log('blur')
  let pass = false, msg = ''
  const val = inputVal.val
  console.log(val)
  const validateFunc = props.rules || false
  if (validateFunc) {
    pass = validateFunc.every(func => {
      msg = func.msg
      // console.log(func.validateFunc(val))
      return func.validateFunc(val)
    })
    // console.log(pass);
    inputVal.err = !pass
    inputVal.message = msg
  } else {
    pass = true
    inputVal.err = false
  }
  if (typeof inputVal.val === 'string') inputVal.val = inputVal.val.trim()
  emits('update:modelValue', inputVal.val)
  emits('blur', pass)
}
const inputChange = () => {
  emits('change', inputVal.val)
  console.log('change')
}
</script>

<template>
  <div class="my_input">
    <input :type="type"
    :placeholder="placeholder"
    @blur="inputBlur"
    @change="inputChange"
    v-model="inputVal.val">
    <span v-if="inputVal.err" class="errmsg">{{ inputVal.message }}</span>
  </div>
</template>

<style scoped>
.my_input {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
input {
  width: 60%;
  height: 25px;
  padding-left: .625rem;
  outline: none;
  border-color: rgba(40, 158, 255, .7);
}
.errmsg {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  color: red;
}

@media (width > 50rem) {
  input {
    width: 17.125rem;
  }
}
</style>

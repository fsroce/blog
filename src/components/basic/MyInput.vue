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

type validateFunction = (arg: unknown) => (true | false)

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
  message: {
    type: String,
    default: ''
  },
  validateFunc: {
    type: Object as PropType<validateFunction[]>
  }
})
const emits = defineEmits(['blur', 'change', 'pass'])
const inputVal = reactive({
  val: props.content,
  err: false,
  message: props.message
})
const inputBlur = () => {
  console.log('blur')
  let pass = false
  const val = inputVal.val
  const validateFunc = props.validateFunc || false
  if (validateFunc) {
    pass = validateFunc.every(func => func(val))
  } else {
    pass = true
  }
  emits('pass', { val, pass })
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
}
input {
  width: 80%;
  height: 1.5625rem;
  padding-left: .625rem;
  border-radius: .3125rem;
  display: block;
  margin: 0 auto;
  margin-bottom: .3125rem;
  outline: none;
  border-color: rgba(40, 158, 255, .7);
}
.errmsg {
  display: block;
  margin: 0 auto;
  width: 80%;
  color: red;
}

@media (width > 50rem) {
  input {
    width: 17.125rem;
  }
}
</style>

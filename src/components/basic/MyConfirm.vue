<script lang="ts" setup>
import { anyFunction } from '@/hooks/useConfirm'
const props = defineProps<{
  msg: string
  onConfirm?: anyFunction
  onCancel?: anyFunction
}>()
</script>

<template>
  <teleport to='#confirm'>
    <div id="outer">
      <h3 id="msg">
        {{ props.msg }}
      </h3>
      <div id="button">
        <button @click="props.onConfirm">确定</button>
        <button @click="props.onCancel">取消</button>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
#outer {
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 5px;
  background-color: red;
  user-select: none;
  border-radius: 10px;
}
#button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}
#button button {
  margin-left: 30px;
}
</style>
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { PropType } from 'vue'
// eslint-disable-next-line no-undef
defineOptions({
  name: 'DropTear'
})
const emit = defineEmits(['click'])
export interface droptearMeau {
  description: string
  func: () => void
}
defineProps({
  meau: Array as PropType<droptearMeau[]>
})
const handleClick = (func: () => void) => {
  func()
  emit('click')
}
</script>

<template>
  <div class="droptear_outer">
    <div class="droptear_option"
      @click="handleClick(a.func)"
      v-for="(a, b) in meau" :key="b">
    {{ a.description }}
  </div>
  </div>
</template>

<style scoped>
.droptear_outer {
  z-index: 1;
  position: absolute;
  right: -0.9375rem;
  border-radius: 0.625rem;
  overflow: hidden;
  user-select: none;
}
.droptear_outer :last-child {
  border-bottom: none;
}
.droptear_option {
  width: 6.25rem;
  height: 1.875rem;
  line-height: 1.875rem;
  background-color: rgb(123, 170, 224);
  text-align: center;
  border-bottom: .0625rem solid rgba(8, 218, 222, 0.973);
}
.droptear_option:hover {
  background-color: #bfa;
}
</style>

<script lang="ts" setup>
import useConfirm from '@/hooks/useConfirm'
useConfirm('确定删除吗？', () => {
  console.log('删除')
}, () => {
  console.log('取消')
})
</script>

<template>
  <div></div>
</template>
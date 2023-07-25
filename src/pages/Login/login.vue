<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LoginPage'
})
</script>

<template>
  <div class="outer">
    <my-input></my-input>
  </div>
</template>

<style scoped>
.outer {
  width: 80%;
  height: 80%;
  margin: auto;
  background-color: #bfa;
}
</style>

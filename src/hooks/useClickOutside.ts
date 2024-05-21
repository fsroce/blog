import { onMounted, onUnmounted, ref, Ref } from "vue";

const useClickOutside = (ele: Ref<null | HTMLElement>): Ref<boolean> => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (ele.value) {
      if (ele.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    addEventListener('click', handler)
  })
  onUnmounted(() => {
    removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside

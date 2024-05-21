import { ref, Ref, onMounted, onBeforeMount } from 'vue'

const useClickInside = (ele: Ref<HTMLElement | null>): Ref<boolean> => {
  const isClickInside = ref(false)
  const handler = (e: MouseEvent) => {
    if (ele.value && ele.value.contains(e.target as Node)) {
      isClickInside.value = true
    } else {
      isClickInside.value = false
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onBeforeMount(() => {
    document.removeEventListener('click', handler)
  })
  return isClickInside
}

export default useClickInside

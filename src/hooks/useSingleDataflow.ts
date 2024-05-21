import { onMounted, computed, watch, ref, Ref, onBeforeUnmount, WatchStopHandle } from "vue";
import { Store } from "pinia";

type TStore<M> = Store & {
  $state: M
}
/**
 * 创建由store到当前页面的单项数据流 store更新会导致页面刷新 但是页面数据刷新不会导致store更新
 * @param store 要监听的store
 * @param property 要监听的
 * @param onRelyChange 当数据刷新时执行的回调
 * @returns Ref<Store['$state'][property]>
 */
function useSingleDataflow<K> (
  store: TStore<K>,
  property: keyof K,
  onRelyChange?: (...args: any) => any
): Ref<K[keyof K] | undefined> {
  const resRef = ref<K[keyof K]>()
  const computedRef = computed(() => store.$state[property])
  let unWatchFn: WatchStopHandle | undefined
  onMounted(() => {
    unWatchFn = watch(() => computedRef.value, (newVal) => {
      resRef.value = { ...newVal }
      onRelyChange && onRelyChange()
    }, { immediate: true, deep: true })
  })
  onBeforeUnmount(() => {
    unWatchFn && unWatchFn()
  })
  return resRef
}

export default useSingleDataflow

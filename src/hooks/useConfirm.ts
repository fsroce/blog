import MyConfirm from '@/components/basic/MyConfirm.vue'
import { h, render } from 'vue'
import { createDOMV2 } from '@/helper'
export type anyFunction = (...args: any) => any

const useConfirm = (msg: string, onConfirm?: anyFunction, onCancel?: anyFunction) => {
  const mountNode = document.querySelector('#confirm')
  const div = createDOMV2('confirm')
  if (mountNode) {
    document.removeChild(mountNode)
  }
  const vNode = h(MyConfirm, {
    msg,
    onConfirm: async () => {
      onConfirm && await onConfirm()
      div._destory()
    },
    onCancel: async () => {
      onCancel && await onCancel()
      div._destory()
    }
  })
  render(vNode, div.node)
}

export default useConfirm

import MyMessage from '@/components/basic/MyMessage.vue'
import { h, render } from 'vue'
import { createDOM } from '@/helper'

const useCreateMessage = (msg: string, timeout = 2000) => {
  // 创建Vnode
  const Vnode = h(MyMessage, {
    msg
  })
  // 挂载Vnode
  let mountNode
  const tmp = document.querySelector('#message')
  if (tmp) {
    mountNode = tmp
  } else {
    mountNode = createDOM('message')
  }
  
  document.body.appendChild(mountNode)
  render(Vnode, mountNode)

  if (timeout) {
    return new Promise((res) => {
      setTimeout(() => {
        destoryMsg()
        res(1)
      }, timeout)
    })
  }
}

export function destoryMsg() {
  const msgNode = document.querySelector('#message')
  if (msgNode) {
    render(null, msgNode)
    document.body.removeChild(msgNode)
  }
}

export default useCreateMessage

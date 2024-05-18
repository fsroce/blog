import MyLoading from '@/components/basic/MyLoading.vue'
import { createDOM } from '@/helper'
import { h, render } from 'vue'

function setLoading (loading: boolean) {
  const app = document.querySelector('#app') as HTMLElement
  if (loading) {
    const vNode = h(MyLoading)
    const loader = createDOM('loading')
    render(vNode, loader)
    app.appendChild(loader)
  } else {
    const dom = document.querySelector('#loading')
    dom && app.removeChild(dom)
  }
}

export { setLoading as useSetLoading }

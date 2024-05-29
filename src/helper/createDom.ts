/**
 * @description 创建一个DOM元素并将其挂在到body中
 * @param { string } nodeId 
 * @param { string } tag 
 */
function createDOM (nodeId: string, tag = 'div') {
  const node = document.createElement(tag)
  node.id = nodeId
  document.body.appendChild(node)
  return node
}

function createDOMV2 (nodeId: string, tag = 'div') {
  const node = document.createElement(tag)
  node.id = nodeId
  document.body.appendChild(node)
  return {
    node,
    _destory () {
      document.body.removeChild(node)
    }
  }
}
export {
  createDOMV2
}

export default createDOM

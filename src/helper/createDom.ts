function createDOM (nodeId: string, tag = 'div') {
  const node = document.createElement(tag)
  node.id = nodeId
  document.body.appendChild(node)
  return node
}

export default createDOM

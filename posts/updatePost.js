const { operationDB, changeDB } = require("../db")
const { responseData } = require("../helper")

async function updPost (req, res) {
  const data = responseData()
  const post = req.body
  try {
    if (!post.postId) throw new Error('修改后的文章不合法！')
    await operationDB(changeDB, { name: 'posts', filter: { postId: post.postId }, newData: { ...post } })
    data.success = true
  } catch (e) {
    data.msg = e.reason
  }
  res.send(data)
  res.end()
}

module.exports = {
  updPost
}
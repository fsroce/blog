const { operationDB, deleteDB } = require("../db")
const { responseData } = require("../helper")

async function deletePost (req, res) {
  let { postId } = req.body
  const data = responseData()
  postId = Number(postId)
  try {
    if (isNaN(postId)) {
      Promise.reject('不合法的postId')
    }
    await operationDB(deleteDB, { name: 'posts', query: { postId } })
    data.success = true
  } catch (e) {
    data.msg = e
    console.log(e)
  }
  res.send(data)
  res.end()
}

module.exports = { deletePost }

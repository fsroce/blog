const { query } = require("express");
const { operationDB, searchDB } = require("../db");
const { responseData, trickProps } = require("../helper");

async function getPost (req, res) {
  const data = responseData()
  let { postId } = req.params
  postId = Number(postId)
  console.log(postId);
  let dt
  try {
    if (isNaN(postId)) {
      await Promise.reject('空的postId或postId不合预期')
    }
    dt = await operationDB(searchDB, { name: 'posts', query: { postId } })
    data.content = trickProps(dt[0], ['_id'])
    data.success = true
  } catch (e) {
    data.msg = e
    data.content = ''
  }
  res.send(data)
  res.end()
}

module.exports = {
  getPost
}

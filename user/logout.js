const { verify } = require("jsonwebtoken");
const { responseData } = require("../helper");
const { validateToken } = require("./token");
const { operationDB, addPropsToDB } = require("../db");

async function logout (req, res) {
  const { token, userId } = req.body
  const data = responseData()
  try {
    if (token === undefined || userId === undefined) {
      throw new Error('空的token或userId')
    }
    validateToken(token).then(async res => {
      if (res.userId === userId) {
        // TODO: 释放成功接口
        // data.success = true
        await operationDB(addPropsToDB, { name: 'oldToken', data: token })
      } else {
        data.msg = 'token验证失败'
      }
    }, rej => {
      data.msg = rej
    })
  } catch (e) {
    console.log(e);
    data.msg = e.reason
  }
  res.send(data)
  res.end()
}

module.exports = {
  logout
}

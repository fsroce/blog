/**
 * 定期删除过期token
 */
async function deleteOldToken () {
  try {
    const dt = await operationDB(searchDB, { name: 'oldToken', query: {} }) || []
    for (let token of dt) {
      if (!jwt.verify(token)) {
        await operationDB(deleteDB, { name: 'oldToken', query: { token } })
      }
    }
  } catch (e) {}
}

module.exports = { deleteOldToken }

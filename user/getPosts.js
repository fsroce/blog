const {responseData, pickProps, trickProps} = require("../helper");
const {operationDB, searchDB} = require("../db");

/**
 * 此处的getPosts仅获取用户帖子的简洁版本 用于数据展示
 */
async function getPosts (req, res) {
    const data = responseData()
    const { userId } = req.params
    let dt
    try {
        if (userId === undefined) {
            await Promise.reject('空的userId')
        }
        dt = await operationDB(searchDB, { name: 'posts', query: { userId: +userId } })
        console.log(dt)
        data.success = true
        data.content = dt.map((post) => trickProps(post, ['_id', 'content']))
    } catch (e) {
        console.log(e)
        data.msg = e.reason
        data.content = []
    }
    res.send(data)
    res.end()
}

module.exports = {
    getPosts
}

const {responseData, pickProps} = require("../helper");
const {validateToken} = require("./token");
const {operationDB, searchDB} = require("../db");

/**
 * 通过前端传递的token获取用户信息
 */
async function fetchUser (req, res) {
    const data = responseData()
    const token = req.body.token
    // console.log(token)
    try {
        if (!token) await Promise.reject('空的token值')
        const { userId } = await validateToken(token)
        let dt
        console.log(userId, 16)
        dt = await operationDB(searchDB, { name: 'user', query: { userId } })
        console.log(dt, 'fetchUser', 18)
        if (dt.length > 1) {
            res.statusCode = 500
            await Promise.reject('internal err, repeated id')
        }
        dt[0].userName = dt[0].name
        dt = pickProps(dt[0], ['userName', 'userId', 'avatar'])
        res.statusCode = 200
        data.success = true
        data.content = dt
    } catch (e) {
        // code
        data.msg = e.reason
    }
    res.send(data)
    res.end()
}

module.exports = {
    fetchUser
}

const {notUndefined, responseData, pickProps} = require("../helper");
const {operationDB, searchDB} = require("../db");
const {setToken} = require("./token");

async function login (req, res) {
    const { name, pwd } = req.body
    const data = responseData()
    try {
        if (!notUndefined([name, pwd])) (res.statusCode = 400) && await Promise.reject('用户名或密码为空！')
        let dt = await operationDB(searchDB, { name: 'user', query: { name } })
        // 查找到一个以上的数据
        if (dt.length !== 1) {
            if (!dt.length) await Promise.reject('用户不存在')
            else await Promise.reject('内部错误')
        }
        dt = dt[0]
        if (dt.pwd !== pwd) {
            await Promise.reject('密码错误')
        }
        // 各项参数通过
        // 设置token
        dt.token = await setToken({ name: dt.name, userId: dt.userId })
        // 适应前端
        dt.userName = dt.name
        res.statusCode = 200
        data.content = pickProps(dt, ['userName', 'userId', 'avatar', 'token'])
        data.success = true
    } catch (e) {
        data.msg = e.reason || e
    }
    res.send(data)
    res.end()
}

module.exports = {
    login
}


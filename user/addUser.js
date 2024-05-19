const { responseData } = require('../helper')
const {searchDB, operationDB, changeDB, addPropsToDB} = require("../db");
const {setToken} = require("./token");
async function register (req, res) {
    const { name, pwd } = req.body
    // console.log(name, pwd)
    const data = responseData()
    let dt
    try {
        dt = await operationDB(searchDB, { name: 'user', query: { name } })
        // console.log(dt)
        if (dt.length) {
            // 用户名已经存在
            data.msg = '用户已存在！请更换用户名'
        } else {
            let nextId = await operationDB(searchDB, { name: 'nextId', query: {  } })
            nextId = +nextId[0].nextUserId
            if (nextId === undefined) throw new Error('获取id时出错')
            await operationDB(changeDB, { name: 'nextId', filter: { nextUserId: nextId }, newData: { nextUserId: nextId + 1 } })
            // 封装data
            const tmp = {
                name, pwd, avatar: '', userId: nextId, identity: 'user'
            }
            await operationDB(addPropsToDB, { name: 'user', data: tmp })
            data.success = true
            const token = await setToken({ name, userId: nextId })
            data.content = token
            data.msg = '用户创建成功！'
        }
    } catch (e) {
        data.msg = e.reason
    }
    res.send(data)
    res.end()
}

module.exports = {
    register
}
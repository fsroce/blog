const jwt = require('jsonwebtoken')
const {operationDB, searchDB} = require("../db");
// 密钥
const secretKey = 'harlanfsrice567578e56776.77896ft5lambert3GDFHYJ5FG3FFD.KGIUUBGCHVJBKhvnl'
// token有效期
const expiresIn = '7d'
function setToken (payload) {
    return jwt.sign(payload, secretKey, { expiresIn })
}

/**
 * 返回 token对应的用户信息
 * @param token
 * @returns {Promise<*>}
 */
async function verifyToken (token) {
    if (!token) return Promise.reject(0)
    try {
        return await jwt.verify(token, secretKey)
    } catch (e) {
        console.log('验证token失败', e)
        return Promise.reject(e)
    }
}

/**
 * 验证 token是否有效并返回token存留信息
 * @param token
 * @returns {Promise<*|boolean>}
 */
async function validateToken(token) {
    if (!token) return Promise.reject(false)
    try {
        // 验证token是否过期
        const dt =  await operationDB(searchDB, { name: 'oldToken' }) || []
        for (let val of dt) {
            if (val.token === token) {
                return Promise.reject('token expired')
            }
        }
        return await verifyToken(token)
        // return true
    } catch (e) {
        console.log(e)
        return Promise.reject('error when handle token')
    }
}

module.exports = {
    setToken, validateToken
}

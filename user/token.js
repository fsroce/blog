const jwt = require('jsonwebtoken')
const {operationDB, searchDB, deleteDB} = require("../db");
// 密钥
const {secretKey} = require("./secretKey")
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
function verifyToken (token) {
    if (!token) return Promise.reject(0)
    try {
        return jwt.verify(token, secretKey)
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
        const dt =  await operationDB(searchDB, { name: 'oldToken', query: { token } }) || []
        for (let val of dt) {
            if (val.token === token) {
                return Promise.reject('token expired')
            }
        }
        return verifyToken(token)
        // return true
    } catch (e) {
        console.log(e)
        return Promise.reject('error while handling token')
    }
}

module.exports = {
    setToken, validateToken
}

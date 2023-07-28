const express = require('express')
const {login} = require("./user/login");
const {fetchUser} = require("./user/fetchUser");
const router = express.Router()

router.post('/login', login)
router.post('/fetchUserInfo', fetchUser)
module.exports = {
    router
}
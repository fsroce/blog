const express = require('express')
const {login} = require("./user/login");
const router = express.Router()

router.post('/login', login)
module.exports = {
    router
}
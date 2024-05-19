const express = require('express')
const {login} = require("./user/login");
const {fetchUser} = require("./user/fetchUser");
const {getPosts} = require("./user/getPosts");
const {register} = require("./user/addUser");
const router = express.Router()


router.post('/login', login)
router.post('/fetchUserInfo', fetchUser)
router.get('/myPosts/:userId', getPosts)
router.post('/register', register)
module.exports = {
    router
}
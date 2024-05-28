const express = require('express')
const {login} = require("./user/login");
const {fetchUser} = require("./user/fetchUser");
const {getPosts} = require("./user/getPosts");
const {register} = require("./user/addUser");
const {getPost} = require("./posts/getPost");
const { deletePost } = require('./posts/deletePost');
const {updPost} = require('./posts/updatePost');
const router = express.Router()


router.post('/login', login)
router.post('/fetchUserInfo', fetchUser)
router.get('/myPosts/:userId', getPosts)
router.post('/register', register)
router.post('/updPost', updPost)
router.get('/fetchPost/:postId', getPost)
router.post('/deletePost', deletePost)
module.exports = {
    router
}
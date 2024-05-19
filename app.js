const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./timedTask')
// 引入文件
const { router } = require('./router')
const app = express()
const port = 5050

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(router)
app.listen(port, () => {
    console.log(`serve start at ${port}`)
})

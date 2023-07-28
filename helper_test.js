const {responseData, notUndefined, trickProps, pickProps} = require("./helper");

const obj = {
    name: '1',
    pwd: '1',
    id: 0,
    avatar: '164154618541'
}


console.log(trickProps(obj, 'id'))

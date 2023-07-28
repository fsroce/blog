function notUndefined (arg) {
    if (arg instanceof Array) {
        return arg.every(e => e !== undefined)
    }
    return arg !== undefined
}

function responseData (content = '', msg = '', success = false) {
    return {
        success, content, msg
    }
}

/**
 * 从所给对象中选择出 props
 * @param obj
 * @param props
 * @returns {*|{}}
 */
function pickProps (obj, props) {
    if (!(props instanceof Array)) {
        return pickProps(obj, [props])
    }
    const ret = {}
    for (let prop of props) {
        ret[prop] = obj[prop]
    }
    return ret
}

/**
 * 从对象中去除 props
 * @param obj
 * @param props
 * @returns {*|{}}
 */
function trickProps (obj, props) {
    if (!(props instanceof Array)) {
        return trickProps(obj, [props])
    }
    const ret = {}
    for (let prop in obj) {
        if (props.indexOf(prop) === -1) {
            ret[prop] = obj[prop]
        }
    }
    return ret
}

module.exports = {
    notUndefined, responseData, trickProps, pickProps
}

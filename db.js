const { MongoClient, ObjectId} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017/'
const client = new MongoClient(url)
const dbName = 'fsblog'

/**
 *操作数据库
 * @param func
 * @param extraData
 * @returns {Promise<*>}
 */
async function operationDB (func, extraData) {
    let err = null
    try {
        await client.connect()
        console.log('连接成功')
        return await func(extraData)
    } catch (e) {
        console.log('连接失败', e)
        err = e
    } finally {
        await client.close()
        if (err) {
            return Promise.reject(err)
        }
        console.log('关闭连接')
    }
}

/**
 *在数据库中查找数据
 * @param name
 * @param query
 * @returns {Promise<WithId<Document>[]>}
 */
async function searchDB ({ name, query}) {
    // console.log(name, query)
    try {
        const database = client.db(dbName).collection(name)
        const result = await database.find(query).toArray()
        console.log('查询成功')
        return Promise.resolve(result)
    } catch (e) {
        console.log('查询失败', e)
        return Promise.reject(e)
    }
}

/**
 * 给数据库添加数据
 * @param name
 * @param data
 * @returns {Promise<number>}
 */
async function addPropsToDB ({ name, data }) {
    try {
        const db = client.db(dbName).collection(name)
        switch (name) {
            // case 'oldToken':
            //     await db.updateOne({"_id": new ObjectId("648f17acdfb58d642a8b0512")}, {$addToSet: {
            //         token: data.token
            //         }})
            //     break
            default:
                await db.insertOne(data)
        }
    } catch (e) {
        console.log('插入失败', e)
        return Promise.reject(e)
    }
}

/**
 * 更改数据库部分数据
 * @param name
 * @param oldData
 * @param newData
 * @returns {Promise<UpdateResult<Document>>}
 */
async function changeDB({ name, oldData, newData }) {
    try {
        const db = client.db(dbName).collection(name)
        return await db.updateOne(oldData, newData)
    } catch (e) {
        console.log('更改失败', e)
        return Promise.reject(e)
    }
}

/**
 * 从数据库中删除一个数据
 * @param name
 * @param query
 * @returns {Promise<never>}
 */
async function deleteDB({ name, query }) {
    try {
        const db = client.db(dbName).collection(name)
        await db.deleteOne(query)
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}

module.exports = {
    operationDB, searchDB, addPropsToDB, changeDB, deleteDB
}

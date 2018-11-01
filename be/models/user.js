
const mongoose = require('../util/mongoose')

// 查询users集合
const UsersModel = mongoose.model('users')

const getUserInfoById = (id)=>{
    //从数据库中获取数据返回的是一个promise对象
    return UsersModel.findById(id).then(results=>{
        return results
    }).catch(err=>{
        return false
    })
}

const auths =()=>{
    return{
        'performer':6,
        'list':1
    }
}

module.exports = {
    getUserInfoById,
    auths
}
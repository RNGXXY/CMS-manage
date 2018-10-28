
const mongoose = require('../util/mongoose')
const bcrypt = require('bcrypt')
const { hash } = require('../util')


// 创建的Model模型 （collection）
var UserModel = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    signupTime: String
}));


// 注册，存入数据库
const signup =async ({ username, password, nickname }) => {
    let _password = await hash(password)
    return new UserModel({
        username,
        nickname,
        password: _password,
        signupTime: Date.now()
    })
    .save()
    .then((results) => {
        let { _id, username, nickname, signupTime} = results
        return { _id, username, nickname, signupTime }
    })
    .catch(() => {
        return false
    })
}

// 登录，获取数据库，比对用户输入的密码和存入数据库中此用户的密码
// pwd:用户传入的密码
// password 数据库中此用户加密过的密码
// return 的结果是 是否匹配
const signin = async (pwd, { password }) => {
    return bcrypt.compare(pwd, password)
}

//通过用户名验证是否有这个用户
const judgeUserByUsername = (username) => {
    return UserModel
    .find({ username })
    .then((results) => {
        return results
    })
    .catch(() => {
        return false
    })
            
}

module.exports = {
    signup,
    signin,
    judgeUserByUsername
}
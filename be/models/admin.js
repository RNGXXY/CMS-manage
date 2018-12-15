
const mongoose = require('../util/mongoose')
// hash是bcrypt中的一个方法，分到util里去了，用于加密，将用于原来的密码进行加密，存入数据库
const { hash } = require('../util')

// 用于加密，在这里引入bcrypt是为了在用户登录的时候再生成一个加密密码，拿去与数据库中用户原来的密码进行比对，判断登录密码的正确与否
const bcrypt = require('bcrypt')


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
// return 的结果是true/false, 是否匹配
const signin = async (pwd, { password }) => {
    // bcrypt.compare()对比密码是否正确
    return bcrypt.compare(pwd, password)
}

//通过用户名验证是否有这个用户
const judgeUserByUsername = (username) => {
    return UserModel
    .find({ username })
    // 这个方法返回的是一个数组
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
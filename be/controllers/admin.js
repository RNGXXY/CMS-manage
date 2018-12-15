
const admin_model = require('../models/admin')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const PATH = require('path')
const { handleData } = require('../util')

// 注册
const signup = async (req,res,next)=>{
    //先判断有没有这个用户
    let _judge_result  = await admin_model.judgeUserByUsername(req.body.username)
    //_judge_result返回的是一个数组，数组中存着一个个数据对象
    if (!_judge_result.length) {    //如果没有这个用户，再去注册
        if (!req.body.nickname) {   //没穿昵称就让昵称=用户名
            req.body.nickname = req.body.username
        }
        let _data = await admin_model.signup(req.body)
        handleData(_data,res,'admin')
    }else{
        res.render('admin',{
          code:201,
          data:JSON.stringify('用户名已存在')  
        })
    }  
}


// 登录
const signin = async (req,res,next)=>{
    //先判断有没有这个用户，有的话返回这个用户的信息
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username)
    //_judge_result返回的是一个数组，数组中存着一个个数据对象
    if ( !!_judge_result.length ) { // 如果有这个用户
        // 登录验证，
        // req.body.password：这次请求发过来的密码，_judge_result[0]：数据库中保存的加密后的密码，
        // _data的值为true/false
        let _data = await admin_model.signin(req.body.password, _judge_result[0])
        // 如果前端利用完整的表单提交逻辑的话，可以利用res.redirect告知浏览器进行跳转
        // res.redirect('/')
        if (_data) {
            // 1、session
            // 登录成功后，保存session, 注意再这里存的东西不是为了给前端用的， 1. 用来验证 2. 存储一些用户信息做其他判断
            // req.session.userinfo={
            //     userid:_judge_result[0]._id,    //id
            //     level:_judge_result[0].level || 3   //等级
            // }

            // 2、对称加密
            // // 要加密的内容
            // let _payload = {
            //     userid:_judge_result[0].id,
            //     username:_judge_result[0].username,
            //     level:3
            // }
            // // 密钥
            // let _cert = 'hello'
            // // 加密的结果
            // var _token = jwt.sign(_payload,_cert);


            // 3、非对称加密
            // 生成私钥：ssh-keygen -t rsa -b 2048 -f private.key
            // 生成公钥：openssl rsa -in private.key -pubout -outform PEM -out public.key
            // 要加密的内容:id,username,安全级别
            let _payload = {
                userid:_judge_result[0].id,
                username:_judge_result[0].username,
                level:3
            }
            // 取出来私钥
            let _private = fs.readFileSync(PATH.resolve(__dirname, '../keys/private.key'))
            // 加密结果：内容，密钥，加密算法
            var _token = jwt.sign(_payload,_private, { algorithm: 'RS256'})
            // 将加密后的token返回给前端
            res.render('admin', { code: 200, data: JSON.stringify({
                token:_token
                }) 
            })
        } else {
            res.render('admin', { code: 203, data: JSON.stringify('密码错误') })
        }
    }else{
        res.render('admin',{
        code:202,
        data:JSON.stringify('用户名不存在')  
        })
    }   
}


module.exports = {
    signup,
    signin
}
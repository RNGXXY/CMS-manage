
const admin_model = require('../models/admin')
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
    //先判断有没有这个用户
    console.log(req.body)
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username)
    console.log(_judge_result)
    //_judge_result返回的是一个数组，数组中存着一个个数据对象
    if ( !!_judge_result.length ) { // 如果有这个用户
        // 登录
        let _data = await admin_model.signin(req.body.password, _judge_result[0])
        // 如果前端利用完整的表单提交逻辑的话，可以利用res.redirect告知浏览器进行跳转
        // res.redirect('/')
        if (_data) {
            res.render('admin', { code: 200, data: JSON.stringify('success') })
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
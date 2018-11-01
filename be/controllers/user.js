
const user_model = require('../models/user')
const isSignIn = (req,res,next)=>{
    // 判断是否登录

    res.render('user',{
        code:200,
        data:JSON.stringify({mas:'用户已登录'})
    })
}

// 返回用户信息
const info =async (req,res,next)=>{
    let _result = await  user_model.getUserInfoById(req.token.userid)

    res.render('user',{
        code:200,
        data:JSON.stringify({
            userid:_result._id,
            username:_result.username,
            nickname:_result.nickname
        })
    })
}

// 检查用户的等级，使用权限,这是一个同步的
const check = ( req, res ) => {
    
    let _confine = user_model.auths()[req.query.auth]

    let _can = req.token.level >= _confine

    res.render('user', { code: _can ? 200 : 402, data: JSON.stringify({ msg: _can ? '可以操作' : '不能操作' }) })

}


// 退出
const exit =async (req,res,next)=>{
    req.session.userinfo = null
    res.render('user',{
        code:200,
        data:JSON.stringify({msg:"退出成功"})
    })
}
module.exports = {
    isSignIn,
    info,
    exit,
    check
}
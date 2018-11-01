var express = require('express')
var router = express.Router();
var auth = require('../middlewares/auth')
var user_controller = require('../controllers/user')

//在发送路由请求的时候设置响应头
const resApplicationJson = (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

//为movie中的所有路由都使用这个中间件
router.use(resApplicationJson)

router.get('/isSignIn',auth.userSigninAuth,user_controller.isSignIn)

//auth中间件判断登录与否
router.get('/info',auth.userSigninAuth,user_controller.info)
// router.get('/exit',user_controller.exit)

// 验证权限
router.get('/check',auth.userSigninAuth,user_controller.check)

module.exports = router
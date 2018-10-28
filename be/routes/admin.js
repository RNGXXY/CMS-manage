
var express = require('express');
var router = express.Router();

var admin_controller = require('../controllers/admin')

//在发送路由请求的时候设置响应头
const resApplicationJson = (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

//为movie中的所有路由都使用这个中间件
router.use(resApplicationJson)


router.post('/signup',admin_controller.signup)
router.post('/signin',admin_controller.signin)


module.exports = router

var express = require('express');
var router = express.Router();

var userList_controller = require('../controllers/userList')

//在发送路由请求的时候设置响应头
// const resApplicationJson = (req,res,next)=>{
//     res.set('content-type', 'application/json; charset=utf8')
//     next()
// }

// //为admin中的所有路由都使用这个中间件
// router.use(resApplicationJson)


// router.post('/signup',admin_controller.signup)
// router.post('/signin',admin_controller.signin)
// router.get('/dataList',(req,res,next)=>{
//     console.log('111111')
//     res.send('haha')
// })
router.get('/listPage', userList_controller.listPage)
router.get('/listall', userList_controller.listall)
router.get('/listone', userList_controller.listone)
router.post('/addUser',  userList_controller.addUser)
router.get('/remove',  userList_controller.remove)


module.exports = router
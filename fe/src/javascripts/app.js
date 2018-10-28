// 引入样式
import '../stylesheets/app.scss'
// 引入路由
import router from './router'
// 主体结构视图
const body_template = require('./views/body.html')

//登录权限验证
import {userSigninAuth} from './util/auth'

//登录验证
userSigninAuth((auth)=>{  //如果登录了去主页
    // 渲染整体内容结构
    $('#wrapper').html(body_template)

    // 启动路由
    router.init()
},()=>{ //没有登录跳转到登录界面
    window.location.href='/admin.html'
})


// 引入样式
import '../stylesheets/app.scss'
// 引入路由
import router from './router'
// 主体结构视图
const body_template = require('./views/body.html')

//登录权限验证
import {userSigninAuth} from './util/auth'
// user控制器
import user_controller from './controllers/user/user'

// 渲染整体内容结构,先渲染页面dom元素，再init()
$('#wrapper').html(body_template)

//登录验证
let init = async()=>{
    // 先判断用户的登录状态，登录/未登录/登录过期
    let isSignIn = await userSigninAuth()
    if (isSignIn) {
        
        router.init()
        user_controller.renderUserInfo()
    } else {
        window.location.href="/admin.html"
    }
}

init();

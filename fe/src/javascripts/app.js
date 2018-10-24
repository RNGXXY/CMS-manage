// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'

// 主体结构视图
const body_template = require('./views/body.html')
// 渲染整体内容结构
$('#wrapper').html(body_template)


// 启动路由
router.init()
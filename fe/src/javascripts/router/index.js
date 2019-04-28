import SMERouter from 'sme-router'
// bus工具
import bus from '../util/bus'
// 首页视图
import home_template from '../views/home.html'
// 404视图
import not_found_template from '../views/404.html'

// position 控制器
import position_controller from '../controllers/position/position'

//product页面控制器
import singer_controller from "../controllers/singer/singer"

//movie页面控制器
import movie_controller from "../controllers/movie/movie"

// 用户管理
import userList_controller from "../controllers/userList/userList"

// 菜单管理
import menu_controller from "../controllers/menu/menu"

// page-header 控制器
import page_header_controller from '../controllers/page-header/page-header'

// page-header model
import page_header_model from '../models/page-header/page-header'


//最高权限页面控制器
import performer_controller from "../controllers/performer/performer"  
var router = null

// 记录上一次路由跳转的url
var prevUrl = ''

// 启动路由的方法
const _init = () => {
    // 实例化路由工具
    router = new SMERouter('router-view')

    // 中间件会先执行 为导航按钮添加高亮样式
    router.use((req, res, next) => {
        _activeLink(req.route) 
    })
    
    // 保证都能匹配到，中间都能执行 
    router.route('/', renderPageHeader)

    // 开始匹配各个路由
    router.route('/home', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(home_template)
    })
    // 保存职位路由
    router.route('/position-save', position_controller.save)
    // 职位列表路由
    router.route('/position-list', position_controller.list)
    router.route('/position-update', position_controller.update)
    router.route("/singer-list",singer_controller.list)

    //电影路由
    router.route("/movie-lead",movie_controller.lead)
    router.route("/movie-list",movie_controller.list)
    router.route("/movie-save",movie_controller.save)
    router.route("/movie-update",movie_controller.update)

    //用户管理路由
    router.route("/users-lead",userList_controller.lead)
    router.route("/users-list",userList_controller.list)
    router.route("/users-save",userList_controller.save)
    router.route("/users-update",userList_controller.update)

    //用菜单管理路由
    router.route("/menu-lead",menu_controller.lead)
    router.route("/menu-list",menu_controller.list)
    router.route("/menu-save",menu_controller.save)
    router.route("/menu-update",menu_controller.update)

    // 最高权限路由
    router.route("/performer",performer_controller.render)


    // 404路由
    router.route('/not-found', (req, res, next) => { // 当路由切换进来的时候执行
        res.render(not_found_template)
        _navLink('.not-found a[to]')
    })

    //上面的没有匹配到就会跳转404路由或者首页
    router.route('*', (req, res, next) => {
        if ( req.url === '' ) { // 刚进入项目，没有hash值，重定向到home
            res.redirect('/home')
        } else { // 如果路径匹配不到，导向404
            res.redirect('/not-found')
        }     
    })

    // 因为在控制器中无法使用到router，所以给bus绑定事件，在其他模块中触发bus的事件
    //enevt.on('xx',()=>{})
    bus.on('go', (path, body = {}) =>  router.go(path, body) )
    bus.on('back', () =>  router.back() )  
    

    // 给按钮添加事件
    _navLink()
}

// 渲染页面头部
const renderPageHeader = ( req, res, next ) => {
    // 这里的prevUrl就是上一次的URL
    page_header_controller.render(page_header_model.pageHeaderInfo(req.url, prevUrl))
    // 已经进入到当前路由了，将上一次路由改成当前的路由
    prevUrl = req.url
}

// 给导航按钮添加点击事件
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li.nav-link[to]')
    $navs.on('click', function () {
        let _path = $(this).attr('to')
        router.go(_path)
    })
}

// 给导航按钮添加不同的类名
// @param route 当前路由的hash值
const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.removeClass('active')
    $navs.filter(`[to='${route}']`)
         .addClass('active')
           
}



export default {
    init: _init,
    navLink: _navLink
}



import URL from 'url'

const pageHeaderInfo = (url, prevUrl) => {
    let _urlinfo = URL.parse(url)
    let _pathname = _urlinfo.pathname
    // search ?  是url种解析出来的 ?a=1&b=2&search
    let _search = URL.parse(prevUrl).search || ''
    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/users-list': {
            title: '用户管理',
            description: '用户列表',
            list: [
                { text: '用户列表' }
            ]
        },
        '/users-save': {
            title: '用户管理',
            description: '添加用户',
            list: [
                { text: '用户列表', path: '#/users-list'+_search },  
                { text: '添加用户'}
            ]
        },
        '/users-update': {
            title: '用户管理',
            description: '用户更新',
            list: [
                { text: '用户列表', path: '#/users-list'+_search },
                { text: '用户更新'}
            ]
        },
        '/menu-list': {
            title: '菜单管理',
            description: '菜单列表',
            list: [
                { text: '菜单列表' }
            ]
        },
        '/menu-save': {
            title: '菜单管理',
            description: '添加菜品',
            list: [
                { text: '菜单列表', path: '#/menu-list'+_search },  
                { text: '添加菜品'}
            ]
        },
        '/menu-update': {
            title: '菜单管理',
            description: '菜品更新',
            list: [
                { text: '菜单列表', path: '#/menu-list'+_search },
                { text: '菜品更新'}
            ]
        },
        '/movie-list': {
            title: '电影管理',
            description: '电影列表',
            list: [
                { text: '电影列表' }
            ]
        },
        '/movie-save': {
            title: '电影管理',
            description: '添加电影',
            list: [
                { text: '电影列表', path: '#/movie-list'+_search },  
                { text: '添加电影'}
            ]
        },
        '/movie-update': {
            title: '电影管理',
            description: '电影更新',
            list: [
                { text: '电影列表', path: '#/movie-list'+_search },
                { text: '电影更新'}
            ]
        },
        '/performer': {
            title: '演员信息',
            list: [
                { text: '演员信息', path: '#/performer' }
            ]
        },
    }
    return _infos[_pathname] || {  }
}


export default {
    pageHeaderInfo
}
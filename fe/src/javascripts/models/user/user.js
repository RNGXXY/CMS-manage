
// 判断是否登录
const isSignIn = ({ token })=>{
    return $.ajax({
        url:'/api/v1/user/isSignIn',
        data:{ token },
        success:(results)=>{
            return results
            
        }
    })
}

// 获取登录信息
const info = (_data)=>{
    return $.ajax({
        url:'/api/v1/user/info',
        data: {
            ..._data,
            token: localStorage.getItem('token') || ''
        },
        success:(results)=>{
            return results
        }
    })
}

// 退出，删除后端中的session中的info
const exit = ()=>{
    return $.ajax({
        url:'/api/v1/user/exit',
        success:(results)=>{
            return results
        }
    })
}

// 获取用户权限
const allow = (auth) => {
    return $.ajax({
        url: '/api/v1/user/check',
        data: { 
            auth,
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}

export default {
    isSignIn,
    info,
    exit,
    allow
}
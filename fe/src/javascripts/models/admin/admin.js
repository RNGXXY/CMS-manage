// 注册
const signup = (data)=>{
    return $.ajax({
        url:'/api/v1/admin/signup',
        type:'post',
        data,
        success:((results)=>{
            return results 
        })
    })
}

// 登录
const signin = (data)=>{
    console.log(1)
    return $.ajax({
        url:'/api/v1/admin/signin',
        type:'post',
        data,
        success:((results)=>{
            console.log(2,results)
            return results 
        })
    })
}

export default{
    signup,
    signin
}
const _none = ()=>{} 

const userSigninState = ()=>{   //登录的一个状态
    // console.log(!!localStorage.getItem('user'))
    return !!localStorage.getItem('user')
}

const userSigninAuth = (success = _none,file = _none)=>{
    let auth = userSigninState()
    if(auth){
        success(auth)
        return true
    }else{
        file()
        return false
    }
}

export  {
    userSigninState,
    userSigninAuth
}

export default {
    userSigninState,
    userSigninAuth
} 
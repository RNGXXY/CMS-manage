
import user_model from '../../models/user/user'
import toast from '../../util/toast'
// 渲染user
const renderUserInfo = async ()=>{
    // 1、获取用户信息
    let _result = await user_model.info()
    
    // 2、渲染用户信息
    if(_result.status === 304){
        toast('请重新登录')
        window.location.href = '/admin.html'
    }else{
        $('.nickname').html(_result.data.nickname)
    }

    // 退出按钮，事件,直接删掉localstorage
    $('.exit-btn').click( async function () {    
        localStorage.removeItem('token')
        window.location.href = '/admin.html'       
    })
    
}

export default {
    renderUserInfo
}
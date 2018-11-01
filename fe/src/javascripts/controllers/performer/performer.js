import { bus, handleToastByData } from '../../util'
import performer_template from '../../views/performer/performer.html'

import not_allow_template from '../../views/not-allow.html'
import user_model from '../../models/user/user'
import toast from '../../util/toast'

const render = async (req,res,next)=>{
    let _can = await user_model.allow('performer')
    if(_can.status === 403){
        toast('先去登录')
        window.location.href = '/admin.html'
    }
    if(_can.status === 402){
        res.render(not_allow_template)
        return false
    }


    res.render(performer_template)
    $('.sidebar-menu ').on('click','.performer',function(){
        //添加按钮点击跳转到添加save路由  
        bus.emit('go','/performer')
    })
}

export default {
    render
}
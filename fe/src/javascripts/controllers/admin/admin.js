import admin_template from '../../views/admin-forms.html'
import admin_modedl from '../../models/admin/admin'
import qs from 'querystring'
import handleToastByData from '../../util/handleToastByData';
import toast from '../../util/toast'

// 初始化
const init = ()=>{
    // 渲染视图
    render('signin')
    // 绑定事件
    bindEvent()
}

const bindEvent = ()=>{
    $('#admin-content').on('click','.switch-btn',function(){
        console.log(1)
        let _type = $(this).data('type')
        render(_type)
    })

    //注册表单
    $('#admin-content').on('submit','#signup-form',async function(e){
        e.preventDefault();
        let _params = $(this).serialize()
        let _result = await admin_modedl.signup(_params)
      
        switch ( _result.status ){
            case 500 : toast('失败，服务器除了问题'); break;
            case 201 : toast('用户名已存在'); break;
            default : toast('注册成功');
            render('signin');
            break; 

        } 
    })

     //登录
     $('#admin-content').on('submit','#signin-form',async function(e){
        e.preventDefault();
        let _params = $(this).serialize()
        let _result = await admin_modedl.signin(_params)
        console.log(_result)
        switch ( _result.status ) {
            case 203: toast('密码错误'); break;
            case 202:  toast('用户不存在'); break;
            default: 
                localStorage.user = qs.parse(_params).username
                window.location.href = "/"; 
            break;
        }
    })
}

//根据类型来渲染视图，显示不同的组件
// 一个组件可以是一模块，一个模块不一定是一个组件
// 组件是页面中一个独立的部分，其包括css，js，html
const render = (type)=>{
    var _html = template.render(admin_template,{
        type:type
    })
    $('#admin-content').html(_html)
}

export default{
    render,
    init
}
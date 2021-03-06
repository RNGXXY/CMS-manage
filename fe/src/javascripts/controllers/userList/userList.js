import { bus, handleToastByData } from '../../util'

import users_lead_tempalte from '../../views/userList/users-lead.html' 
import users_list_tempalte from '../../views/userList/users-list.html' 
import users_update_tempalte from '../../views/userList/users-update.html' 
import users_save_tempalte from '../../views/userList/users-save.html' 

import userList_model from '../../models/userList/userList'
import qs from 'querystring'

const lead =(req,res)=>{
    res.render(users_lead_tempalte)
}

//list视图
const list = async(req,res,next)=>{
    req.query = req.query || {} // 防止没有参数的时候，req.query为null
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
        search: req.query.search || ''
    }
    //编译模板
    let _html = template.render(users_list_tempalte, {    //art-template的template.render(模板，数据)
        data: JSON.parse(await userList_model.list(_page)).data
    })
    res.render(_html)
    
    //给添加按钮，绑定事件
    bindListEvent(_page);

    //搜索框的字
    $('#keywords').val(_page.search)
}

//list的事件绑定
const bindListEvent = (_page)=>{
     //跳转到添加页面
    $('.users-list #addbtn').on('click',function(){
        //添加按钮点击跳转到添加save路由  
        bus.emit('go','/users-save')
    })

    //跳转到更新页面
    $('.users-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        //router.go('/user/123?name=hwen', { mes: 'hallo world'})   
        //router.go的隐式传参
        // bus.on('go', (path, body = {}) =>  router.go(path, body) )
        //{ id }相当于给body对象添加了一个id的属性，id:id(es6语法直接写id)，当触发emit的时候，body身上的id就起作用了
        bus.emit('go','/users-update', { id }) 
    })

    //handleRemoveusers不是handleRemoveusers（）
    $('.pos-remove').on('click', function () {
        handleRemoveusers.call(this,_page)
    })

    //根据关键字搜索数据
    $('#possearch').on('click',async function(req,res){
        let _search = $('#keywords').val();
        let _params = {
            search:_search,
            pageNo:1
        }

        //上面已近配好了search，所以只需要根据关键字跳转就可以了
        // $.param()是jquery的一个方法，序列化对象，返回字符串：a=1900&b=1900
        bus.emit('go', `/users-list?${$.param(_params)}`)
    })
}
//删除事件
const handleRemoveusers = async function(_page){
    let id = $(this).parents('tr').data('id')
    let _data = await userList_model.remove({ id:id,..._page })
    this.parentNode.parentNode.remove()
    // 如果此页种只有一条数据，说明删除之后需要跳转到前一页 
    // 删除的时候此页还有多少条数据
    // let trs = $('.users-list__tabel tr[data-id]')
    // 如果只剩一个，将pageNo-1
    // let _pageNo = trs.length > 1 ? _page.pageNo : (_page.pageNo - (_page.pageNo > 1 ? 1 : 0))
    
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
            let _pageNo = _page.pageNo
            _pageNo -= data.isReact ? 1 : 0
            // 删除成功后，i依然需要将pageNo带上，否则，删除后，重新渲染的时候会回到默认的第一页
            bus.emit('go', '/users-list?pageNo='+_pageNo+'&_='+data.removeId+'&search='+_page.search)
        }
    })
}




//save视图的控制器
const save = (req,res,next)=>{ 
    res.render(users_save_tempalte)
    bindSaveEvent();
   
}

//save的事件绑定
const bindSaveEvent = ()=>{
    //添加按钮点击跳转到添加list路由   
    $('.users-save #back').on('click',function(){
        bus.emit('go','/users-list')
    })
    $('.users-save #save-user-form').submit(handleSaveSubmit)
    
    // $("#usersLogo").on('change',function(){
    //     let imgdom = $("#portrait");
    //     let imgurl = window.URL.createObjectURL(this.files[0]);
    //     imgdom.attr('src',imgurl)
    //     imgdom.show()
    // })
}

// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit =  async function(e){
    e.preventDefault()

    //函数防抖，防止多次提交
    if ( _isLoading ) return false;

    _isLoading = true
    // 拿到form的数据
    // let _params = qs.parse($(this).serialize())
    var d = {};
    var t = $(this).serializeArray();
    $.each(t, function() {
      d[this.name] = this.value;
    });
    let result = await userList_model.save(d)
    
    _isLoading = false

    handleToastByData(JSON.parse(result))
    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/users-list')
    // }})
}


//update视图
const update = async (req,res)=>{
    let { id } = req.body;
    let html = template.render(users_update_tempalte, {
        data: JSON.parse(await userList_model.listone({ id })).data  // 获取到列表数据
    })
    //根据这个id获取数据
    res.render(html)
    bindUpdateEvent()
}

///update的事件绑定
const bindUpdateEvent =()=>{
    // 返回按钮逻辑
    $('.users-update #back').on('click', function () {
        bus.emit('go', '/users-list')
    })

    $("#usersLogo").on('change',function(){
        let imgdom = $("#portrait");
        let imgurl = window.URL.createObjectURL(this.files[0]);
        imgdom.attr('src',imgurl)
        imgdom.show()
    })

    $('.users-update #update-users-form').submit(handleUpdateSubmit)
}

//update的表单提交
const handleUpdateSubmit = async function(e){
    e.preventDefault();
    // from表单数据
    var d = {};
    var t = $(this).serializeArray();
    $.each(t, function() {
      d[this.name] = this.value;
    });
    let _results = await userList_model.update(d) 
    handleToastByData(JSON.parse(_results))
}

export default {
    lead,
    list,
    save,
    update
} 
import { bus, handleToastByData } from '../../util'

import movie_lead_tempalte from '../../views/movies/movie-lead.html' 
import movie_list_tempalte from '../../views/movies/movie-list.html' 
import movie_update_tempalte from '../../views/movies/movie-update.html' 
import movie_save_tempalte from '../../views/movies/movie-save.html' 

import movie_model from '../../models/movie/movie'
import qs from 'querystring'

const lead =(req,res)=>{
    res.render(movie_lead_tempalte)
}

//list视图
const list = async(req,res,next)=>{
    //编译模板
    let _html = template.render(movie_list_tempalte, {    //art-template的template.render(模板，数据)
        data: (await movie_model.list()).data
    })
    res.render(_html)
    //给添加按钮，绑定事件
    bindListEvent();
}

//list的事件绑定
const bindListEvent = ()=>{
    $('.movie-list #addbtn').on('click',function(){
        //添加按钮点击跳转到添加save路由  
        bus.emit('go','/movie-save')
    })

    $('.movie-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        //router.go('/user/123?name=hwen', { mes: 'hallo world'})   
        //router.go的隐式传参

        // bus.on('go', (path, body = {}) =>  router.go(path, body) )
        //{ id }相当于给body对象添加了一个id的属性，id:id(es6语法直接写id)，当触发emit的时候，body身上的id就起作用了
        bus.emit('go','/movie-update', { id }) 
    })

    //handleRemovePosition不是handleRemovePosition（）
    $('.pos-remove').on('click',handleRemovePosition)
}
//删除事件
const handleRemovePosition = async function(){
    let id = $(this).parents('tr').data('id')
    let _data = await movie_model.remove({ id:id })
    handleToastByData(_data,{
        isReact:false,
        success:(data)=>{
            //data.removeId后端返回的results中有个removeId属性
            bus.emit('go', '/movie-list?_='+data.removeId)
        }
    })
}




//save视图的控制器
const save = (req,res,next)=>{ 
    res.render(movie_save_tempalte)
    bindSaveEvent();
    
}

//save的事件绑定
const bindSaveEvent = ()=>{
    //添加按钮点击跳转到添加list路由   
    $('.movie-save #back').on('click',function(){
        bus.emit('go','/movie-list')
    })
    $('.movie-save #save-moive-form').submit(handleSaveSubmit)
    
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

    let result = await movie_model.save()

    _isLoading = false

    handleToastByData(result)
    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/movie-list')
    // }})
}

//update视图
const update = async (req,res)=>{
    let { id } = req.body
    let html = template.render(movie_update_tempalte, {
        data: (await movie_model.listone({ id })).data  // 获取到列表数据
    })
    //根据这个id获取数据
    res.render(html)
    bindUpdateEvent()
}

///update的事件绑定
const bindUpdateEvent =()=>{
    // 返回按钮逻辑
    $('.movie-update #back').on('click', function () {
        bus.emit('go', '/movie-list')
    })

    $('.movie-update #update-form').submit(handleUpdateSubmit)
}

//update的表单提交
const handleUpdateSubmit = async function(e){
    e.preventDefault();
    //用了一个空的input来保存了id
    let _datastr = $(this).serialize()
    let _data = qs.parse(_datastr)
    let _results = await movie_model.update(_data)  
    handleToastByData(_results)
}

export default {
    lead,
    list,
    save,
    update
} 
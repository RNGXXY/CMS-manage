const url = require('url')
const querystring = require('querystring')
const { handleData } = require('../util')
const userList_model = require('../models/userList')

const userName = "用户_"+parseInt(Math.random()*1000+999)

// listPage控制器
const listPage = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await userList_model.listPage(req.query)
    handleData(_data, res, 'userList') //'userList'是字符串模板，后端采用的是ejx模板
}

// listall控制器
const listall = async (req, res) => {
    let _data = await userList_model.listall()
    handleData(_data, res, 'userList') //'userList'是字符串模板，后端采用的是ejx模板
}

// listone控制器
const listone = async (req, res) => {
    let arg = url.parse(req.url).query;
    let params = querystring.parse(arg);
    let _data = await userList_model.listone(params.id)
    handleData(_data, res, 'userList') //'users'是字符串模板，后端采用的是ejx模板
}

// 添加
const addUser = async (req, res) => {
    // 查询数据库中有无此用户
    let resData = await userList_model.listone('',req.body.userPhone)
    if(resData==null || !resData){
        req.body.userName = userName
        req.body.limitType = req.body.limitType ?  req.body.limitType : 'false'
        let _data = await userList_model.addUser(req.body)        //post用req.body
        handleData(_data,res,'userList')   
    }else{
        console.log('用户已存在')
        let _data = {}
        _data.code = 300
        _data.msg = '用户已存在'
        handleData(_data,res,'userList')  
    } 
}

//更新一条数据
const update = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await userList_model.update(req.body)     //post用req.body
    handleData(_data,res,'userList')   
}

//删除一条数据
const remove = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await userList_model.remove(req.body)     
    handleData(_data,res,'userList')   
}

module.exports = {
    listPage,
    listall,
    addUser,
    listone,
    update,
    remove
}
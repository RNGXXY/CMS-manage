const url = require('url')
const querystring = require('querystring')
const { handleData } = require('../util')
const menu_model = require('../models/menu')

const userName = "用户_"+parseInt(Math.random()*1000+999)

// listPage控制器
const listPage = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await menu_model.listPage(req.query)
    handleData(_data, res, 'menu') //'menu'是字符串模板，后端采用的是ejx模板
}

// listall控制器
const listall = async (req, res) => {
    let _data = await menu_model.listall()
    handleData(_data, res, 'menu') //'menu'是字符串模板，后端采用的是ejx模板
}

// listone控制器
const listone = async (req, res) => {
    let arg = url.parse(req.url).query;
    let params = querystring.parse(arg);
    let _data = await menu_model.listone(params.id)
    handleData(_data, res, 'menu') //'users'是字符串模板，后端采用的是ejx模板
}

// listByShop
const listByShop = async (req, res) => {
    let _data = await menu_model.listByShop(req.body)
    handleData(_data, res, 'menu') //'users'是字符串模板，后端采用的是ejx模板
}

// 添加
const addData = async (req, res) => {
    // 查询数据库中有无此用户
    let _data = await menu_model.addData(req.body)        
    handleData(_data,res,'menu')   
  
}

// //更新一条数据
const update = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await menu_model.update(req.body)     
    handleData(_data,res,'menu')   
}

//删除一条数据
const remove = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await menu_model.remove(req.body)     
    handleData(_data,res,'menu')   
}

module.exports = {
    listPage,
    listall,
    listone,
    listByShop,
    addData,
    update,
    remove
}
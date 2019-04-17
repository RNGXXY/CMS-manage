const { handleData } = require('../util')
const users_model = require('../models/users')

// list控制器
const list = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await users_model.list(req.query)
    handleData(_data, res, 'users') //'users'是字符串模板，后端采用的是ejx模板
}

// listall控制器
const listall = async (req, res) => {
    let _data = await users_model.listall()
    handleData(_data, res, 'users') //'users'是字符串模板，后端采用的是ejx模板
}

// 添加
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await users_model.save(req.body)        //post用req.body
    handleData(_data,res,'users')    
}



// 获取某一条数据
const listone = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await users_model.listone(req.query)     //get用req.query
    handleData(_data,res,'users')   
}  

//更新一条数据
const update = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await users_model.update(req.body)     //post用req.body
    handleData(_data,res,'users')   
}

//删除一条数据
const remove = async (req,res)=>{
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await users_model.remove(req.body)     
    handleData(_data,res,'users')   
}



module.exports = {
    list,
    listall,
    save,
    listone,
    update,
    remove
}
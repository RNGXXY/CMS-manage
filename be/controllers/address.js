const { handleData } = require('../util')
const address_model = require('../models/address')



// listall控制器
const listall = async (req, res) => {
    let _data = await address_model.listall()
    handleData(_data, res, 'data') //'address'是字符串模板，后端采用的是ejx模板
}

// listByUser
const listByUser = async (req, res) => {
    let _data = await address_model.listByUser(req.body.userId)
    handleData(_data, res, 'data') //'address'是字符串模板，后端采用的是ejx模板
}

// 添加
const addAddress = async (req, res) => {
    // 查询数据库中有无此用户
    let _data = await address_model.addAddress(req.body) 
    handleData(_data,res,'data')   
  
}

const deleteOne = async (req, res) => {
    // 查询数据库中有无此用户
    let _data = await address_model.deleteOne(req.body) 
    handleData(_data,res,'data')   
  
}


module.exports = {
    listall,
    listByUser,
    addAddress,
    deleteOne
}
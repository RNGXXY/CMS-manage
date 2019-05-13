const mongoose = require('../util/mongoose')
const onHandleTime = require('../util/onHandleTime')

// 创建的Model模型 （collection）
//在本地数据库中创建一个document
var AddressModel = mongoose.model('address', new mongoose.Schema({
    //定义集合中存储的数据名，数据格式
    userId:String,
    contacts:String,
    phoneNumber:String,
    cityName:String,
    detailedAddress:String,
    areaName:String,
    isDefault:Boolean,
    timestamp:String,
    updateTime:String
}));

// // 按页返回列表数据
// const listPage = async ({ pageNo = 1, pageSize = 5, search = '' }) => {
//     // let reg = new RegExp(search, 'g')
//     // let _query = {      // 查询的约定条件
//     //     $or:[
//     //         { userName: reg },   
//     //         { userId: reg },   
//     //         { userPhone: reg },   
//     //     ]
//     // }
//     // limit // 取几条
//     // skip // 从哪里开始
//     // let _all_items = await listall(_query)
//     // return AddressModel.find(_query)
//     let _all_items = await listall()
//     return AddressModel.find()
//     .sort({signTime: -1})
//     .skip((pageNo - 1) * pageSize)// 从哪一页开始
//     .limit(~~pageSize)// 截取多少，从这一页开始取多少个数据
//     .then((results) => {
//         return { 
//             data: results, 
//             pageInfo: { // 页码信息
//                 pageNo, // 当前页
//                 pageSize, // 一页数量
//                 total: _all_items.length, // 总数
//                 totalPage: Math.ceil(_all_items.length / pageSize), // 总页数
//                 search  // 搜索关键字
//             }
//         }
//     }).catch((err) => {
//         return false
//     })
// }



// 返回列表所有数据
const listall = (_query = {}) => {
    //_query，查找数据的规则，eg：年龄大于10……，为空则全部返回
    //Model.fin()查询数据库
    return AddressModel.find(_query).sort({ timestamp: -1 })
        .then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
}

// 获取用户的订单信息
const listByUser = (id) => {
    return AddressModel.find({userId:id}).sort({ timestamp: -1 })
        .then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
}

//保存新增数据
const addAddress = (body) => {
    //此时的时间，事件戳
    let _timestamp = Date.now()
    return new AddressModel({
        ...body,
        orderTime: onHandleTime(_timestamp),
        timestamp:_timestamp
    })
        .save() //保存数据到数据库
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })
}


const deleteOne = ({id}) => {
    return AddressModel.deleteOne({ _id:id }).then( async ()=>{
        return "删除成功"
    }).catch((err)=>{
        return false
    })
}



module.exports = {
    listall,
    listByUser,
    addAddress,
    deleteOne
}
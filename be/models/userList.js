const mongoose = require('../util/mongoose')
const fs = require('fs-extra') // 文件模块
const PATH = require('path') // 路径

// 创建的Model模型 （collection）
//在本地数据库中创建一个document
// usersList
var UserListModel = mongoose.model('userLists', new mongoose.Schema({
    //定义集合中存储的数据名，数据格式
    userId: Number,
    userName: String,
    userPhone: Number,
    signTime: Number,
    limitType: String,
}));

// 按页返回列表数据
const listPage = async ({ pageNo = 1, pageSize = 5, search = '' }) => {
    let reg = new RegExp(search, 'g')
    let _query = {      // 查询的约定条件
        $or:[
            { userName: reg },   
            { userId: reg },   
            { userPhone: reg },   
        ]
    }
    // limit // 取几条
    // skip // 从哪里开始
    // let _all_items = await listall(_query)
    // return UserListModel.find(_query)
    let _all_items = await listall()
    return UserListModel.find()
    .sort({signTime: -1})
    .skip((pageNo - 1) * pageSize)// 从哪一页开始
    .limit(~~pageSize)// 截取多少，从这一页开始取多少个数据
    .then((results) => {
        return { 
            data: results, 
            pageInfo: { // 页码信息
                pageNo, // 当前页
                pageSize, // 一页数量
                total: _all_items.length, // 总数
                totalPage: Math.ceil(_all_items.length / pageSize), // 总页数
                search  // 搜索关键字
            }
        }
    }).catch((err) => {
        return false
    })
}

// 返回所有列表数据
// const list = async ({ pageNo = 1, pageSize = 5, search = '' }) => {
//     let reg = new RegExp(search, 'g')
//     let _query = {      // 查询的约定条件
//         $or:[
//             { userName: reg },   
//             { userId: reg },   
//             { userPhone: reg },   
//             // { usersType: reg }
//         ]
//     }
//     // limit // 取几条
//     // skip // 从哪里开始
//     let _all_items = await listall()
//     // return UsersListModel.find(_query)
//     return UsersListModel.find()
//     .sort({createTime: -1})
//     .skip((pageNo - 1) * pageSize)// 从哪一页开始
//     .limit(~~pageSize)// 截取多少，从这一页开始取多少个数据
//     .then((results) => {
//         console.log(11,results)
//         return { 
//             items: results, 
//             pageInfo: { // 页码信息
//                 pageNo, // 当前页
//                 pageSize, // 一页数量
//                 total: _all_items.length, // 总数
//                 totalPage: Math.ceil(_all_items.length / pageSize), // 总页数
//                 search  // 搜索关键字
//             }
//         }
//     }).catch((err) => {
//         console.log(22)
//         return false
//     })
// }


// 返回列表所有数据
const listall = (_query = {}) => {
    //_query，查找数据的规则，eg：年龄大于10……，为空则全部返回
    //Model.fin()查询数据库
    //mongodb的方法：sort({createTime:-1})数据倒序返回
    return UserListModel.find(_query).sort({ createTime: -1 })
        .then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
}

//保存新增数据
const addUser = (body) => {
    //此时的时间，事件戳
    let _timestamp = Date.now()

    // body.usersLogo =  body.usersLogo  || default_logo
    return new UserListModel({
        ...body,
        signTime: _timestamp
    })
        .save() //保存数据到数据库
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })
}

// 返回一个数据
const listone = (id,phone='') => {
    if (id){
        return UserListModel.findById(id).
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
    }
    else if(!id && phone){
        return UserListModel.find({userPhone:phone}).
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
    }
   
}

//更新一个数据
const update =(body)=>{
    //更新后把原来的图片先删掉
        return UserListModel.update({ _id: body._id  }, {$set:{...body}}).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
} 
 
// 删除一个数据
// const update =async (body)=>{
//     if ( !body.usersLogo ) delete body.usersLogo

//     if (body.republish) {
//         let _timestamp =  Date.now()
//         body.createTime = _timestamp
//     }
//     //更新后把原来的图片先删掉
//     let {id} = body  
//     let _row = await listone({id})
//     if (_row.companyLogo &&_row.usersLogo != default_logo) {
//         fs.removeSync(PATH.resolve(__dirname,'../public'+_row.usersLogo))    
//     }
//     return UsersListModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
//         return results
//     }).catch((err) => {
//         return false
//     }) 
// }   

//删除一条数据
const remove = async ({ id, pageNo, pageSize })=>{
    let _row = await listone({ id })    //用listone从数据库中获得一条数据的信息
    return UserListModel.deleteOne({ _id:id }).then( async (results)=>{

        //  获取最新的数量,删除的过程中有新增数据的产生
        let _all_items = await listall()

        results.removeId = id
        results.isBack = (pageNo-1) * pageSize >= _all_items.length  

        results.removeId = id   //这个id是返回给前端用的
       
        return results
    }).catch((err)=>{
        return false
    })
}

module.exports = {
    listPage,
    listall,
    addUser,
    listone,
    update,
    remove
}
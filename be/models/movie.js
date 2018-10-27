const mongoose = require('../util/mongoose')
const fs = require('fs-extra') // 文件模块
const PATH = require('path') // 路径

// 创建的Model模型 （collection）
//在本地数据库中创建一个document
// movies，不加s，mongoose会自动加s，为了不懵逼，就加上
var MovieModel = mongoose.model('movies', new mongoose.Schema({
    //定义集合中存储的数据名，数据格式
    movieName: String,
    directorName: String,
    starName: String,
    showTime: String,
    language:String,
    movieType:String,
    createTime: String,
    movieLogo: String
}));

// 返回列表数据
const list = async ({ pageNo = 1, pageSize = 5, search = '' }) => {
    let reg = new RegExp(search, 'g')
    let _query = {      // 查询的约定条件
        $or:[
            { movieName: reg },   
            { directorName: reg },   
            { startName: reg },   
            { movieType: reg }
        ]
    }
    // limit // 取几条
    // skip // 从哪里开始
    let _all_items = await listall(_query)

    return MovieModel.find(_query)
    .sort({createTime: -1})
    .skip((pageNo - 1) * pageSize)// 从哪一页开始
    .limit(~~pageSize)// 截取多少，从这一页开始取多少个数据
    .then((results) => {
        return { 
            items: results, 
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


// 返回列表所有数据
const listall = (_query = {}) => {
    //_query，查找数据的规则，eg：年龄大于10……，为空则全部返回
    //Model.fin()查询数据库
    //mongodb的方法：sort({createTime:-1})数据倒序返回
    return MovieModel.find(_query).sort({createTime:-1})
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })
}

//默认lolo
let default_logo = '/uploads/movielogos/default.jpg'
//保存新增数据
const save = (body) => {
    //此时的时间，事件戳
    let _timestamp = Date.now()

    body.movieLogo =  body.movieLogo  || default_logo
    return new MovieModel({
        ...body,
        createTime: _timestamp
    })
        .save() //保存数据带数据库
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })
}

// 返回一个数据
const listone = ({ id }) => { 
    return MovieModel.findById(id).
        then((results) => {     //返回数据库的数据
            return results
        }).
        catch((err) => {
            return false
        })

}

//更新一个数据
const update =async (body)=>{
    if ( !body.movieLogo ) delete body.movieLogo

    if (body.republish) {
        let _timestamp =  Date.now()
        body.createTime = _timestamp
    }
    //更新后把原来的图片先删掉
    let {id} = body  
    let _row = await listone({id})
    if (_row.companyLogo &&_row.movieLogo != default_logo) {
        fs.removeSync(PATH.resolve(__dirname,'../public'+_row.movieLogo))    
    }
    return MovieModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}   

//删除一条数据
const remove = async ({ id, pageNo, pageSize })=>{
    let _row = await listone({ id })    //用listone从数据库中获得一条数据的信息
    return MovieModel.deleteOne({ _id:id }).then( async (results)=>{

        //  获取最新的数量,删除的过程中有新增数据的产生
        let _all_items = await listall()
        
        results.removeId = id
        results.isBack = (pageNo-1) * pageSize >= _all_items.length  

        results.removeId = id   //这个id是返回给前端用的
        if (_row.companyLogo &&_row.movieLogo != default_logo) {
            fs.removeSync(PATH.resolve(__dirname,'../public'+_row.movieLogo))    
        }
        return results
    }).catch((err)=>{
        return false
    })
}

module.exports = {
    list,
    listall,
    save,
    listone,
    update,
    remove
}
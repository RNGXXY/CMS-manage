const mongoose = require('../util/mongoose')
const fs = require('fs-extra') // 文件模块
const PATH = require('path') // 路径

// 创建的Model模型 （collection）
//在本地数据库中创建一个document
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
const list = () => {
    //_query，查找数据的规则，eg：年龄大于10……，为空则全部返回
    let _query={}
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
//保存新增数据
const save = (body) => {
    //此时的时间，事件戳
    let _timestamp = Date.now()
    //根据这个时间创建moment，保证事件一致

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
const update = (body)=>{
    if (body.republish) {
        let _timestamp =  Date.now()
        body.createTime = _timestamp
    }
    return MovieModel.updateOne({ _id: body.id }, { ...body }).then((results) => {
        return results
    }).catch((err) => {
        return false
    }) 
}   

//删除一条数据
const remove = async ({ id })=>{
    let _row = await listone({ id })    //用listone从数据库中获得一条数据的信息
    return MovieModel.deleteOne({ _id:id }).then((results)=>{
        results.removeId = id   //这个id是返回给前端用的
        fs.removeSync(PATH.resolve(__dirname,'../public'+_row.movieLogo))
        return results
    }).catch((err)=>{
        return false
    })
}

module.exports = {
    list,
    save,
    listone,
    update,
    remove
}
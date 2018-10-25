
const mongoose = require("../util/mongoose");
const Monment = require("moment");
const PATH = require("path");

//创建数据库模型,mongoose的是从Schema开始的，每个schema都会映射到一个MongoDB collection
var Singer = new mongoose.Schema({
    name: String,
    city: String,
    companyName: String,
    works: String,
    occupation: String,
    createTime: String,
    formatTime: String,
    personLogo: String
  });

var singerModel = mongoose.model("singer",Singer);


const list = ()=>{
    let _query = {};
    return singerModel.find(_query).sort({createTime:-1})
        .then((result)=>{
            return result;
    }).catch((err)=>{
        return false;
    })
}

module.exports = {
    list,
}
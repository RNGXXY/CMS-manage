const { handleData } = require("../util")
const singer_models = require("../models/singer");


//歌手列表信息
const list =async (req,res)=>{
    res.set("content-type","application/json;charset = utf8")
    let _listData = await singer_models.list();
    handleData(_listData,res,"singer");
}

module.exports = {
    list,
}
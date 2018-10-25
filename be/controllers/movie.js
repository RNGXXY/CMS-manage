const { handleData } = require('../util')
const movie_model = require('../models/movie')

// list控制器
const list = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    // res.send(JSON.stringify({a:1}))
    let _data = await movie_model.list()
    handleData(_data, res, 'movie') //'movie'是字符串模板，后端采用的是ejx模板
}

// 添加
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await movie_model.save(req.body)        //post用req.body
    handleData(_data,res,'movie')    
}



// 获取某一条数据
const listone = async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await movie_model.listone(req.query)     //get用req.query
    handleData(_data,res,'movie')   
}  

//更新一条数据
const update = async (req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await movie_model.update(req.query)     //get用req.query
    handleData(_data,res,'movie')   
}




module.exports = {
    list,
    save,
    listone,
    update
}
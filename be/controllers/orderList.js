const { handleData } = require('../util')
const orderList_model = require('../models/orderList')

const menu_model = require('../models/menu')

// listPage控制器
const listPage = async (req, res) => {
    // res.set('content-type', 'application/json; charset=utf8')
    let _data = await orderList_model.listPage(req.query)
    handleData(_data, res, 'orderList') //'orderList'是字符串模板，后端采用的是ejx模板
}

// listall控制器
const listall = async (req, res) => {
    let _data = await orderList_model.listall()
    handleData(_data, res, 'orderList') //'orderList'是字符串模板，后端采用的是ejx模板
}

// listByUser
const listByUser = async (req, res) => {
    let _data = await orderList_model.listByUser(req.body.userId)
    handleData(_data, res, 'orderList') //'orderList'是字符串模板，后端采用的是ejx模板
}

// 添加
const addData = async (req, res) => {
    // 查询数据库中有无此用户
    let _data = await orderList_model.addData(req.body)   
    let menuList = await menu_model.listall()
    let orderContent = req.body.orderContent
    await onChangeMenu(menuList,orderContent)
    handleData(_data,res,'orderList')   
  
}

// 根据订单内容修改菜品数量
const onChangeMenu = (menuList,orderContent,) => {
    menuList.forEach((menuItem,menuIndex)=>{
        orderContent.some((orderItem,orderIndex)=>{
            if(Number(menuItem.dishNum)<Number(orderItem.count)){

            }
            if(menuItem._id == orderItem.id){
                menuItem.imgLogo=''
                menuItem._id = String(menuItem._id)
                menuItem.dishNum = String(Number(menuItem.dishNum)-Number(orderItem.count))
                menu_model.update(JSON.stringify(menuItem),'true')
                return true
            }
        })
    })
}


module.exports = {
    listPage,
    listall,
    listByUser,
    addData,
}
import orderList_lead_tempalte from '../../views/orderList/orderList-lead.html' 
import orderList_list_tempalte from '../../views/orderList/orderList-list.html' 

import orderList_model from '../../models/orderList/orderList'

const lead =(req,res)=>{
    res.render(orderList_lead_tempalte)
}

//list视图
const list = async(req,res,next)=>{
    req.query = req.query || {} // 防止没有参数的时候，req.query为null
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
        search: req.query.search || ''
    }
    //编译模板
    let _html = template.render(orderList_list_tempalte, {    //art-template的template.render(模板，数据)
        data: JSON.parse(await orderList_model.list(_page)).data
    })
    res.render(_html)
}

export default {
    lead,
    list
} 
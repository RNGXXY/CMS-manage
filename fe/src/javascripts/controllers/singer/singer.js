import { bus, handleToastByData } from '../../util'
import singer_tempalte from "../../views/singer/singer.html";
import singer_models from "../../models/singer/singer"
const list =(req,res)=>{
    // 编译模板 
    // let html = template.render(position_list_template, {
    //     data: (await position_model.list()).data // 获取到列表数据
    // })
    // res.render(html)
   res.render(singer_tempalte);
}

export default {
    list,
}
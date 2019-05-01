
// 根据页数来返回数据
const list = (_page) => {
    return $.ajax({
        data:_page,
        url: '/api/v1/orderList/listPage', 
        success:(results) => {
           return results
        }
    })
}

export default {
    list
}
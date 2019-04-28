
// 根据页数来返回数据
const list = (_page) => {
    return $.ajax({
        data:_page,
        url: '/api/v1/menu/listPage', 
        success:(results) => {
           return results
        }
    })
}


// 提供保存数据
const save = () => {
    return new Promise((resolve) => {
        $('.menu-save #save-menu-form').ajaxSubmit({
            url: '/api/v1/menu/addData',
            type: 'POST',
            semantic:true,
            resetForm:true,     //成功提交后，重置所有表单元素的值 
            success: (results) => {
                resolve(results)
            }
        })
    })
}

//listone
const listone = (data)=>{
    return $.ajax({
        url:'/api/v1/menu/listone',
        data,
        success:(results)=>{
            return results
        }
    })
}

//update
const update = () => {
    // return $.ajax({
    //     url:'/api/v1/menu/update',
    //     type: 'POST',
    //     data,
    //     success:(results)=>{
    //         return results
    //     }
    // })
    return new Promise((resolve) => {
        $('.menu-update #update-menu-form').ajaxSubmit({
            url: '/api/v1/menu/update',
            type: 'POST',
            semantic:true,
            // resetForm:true,     //成功提交后，重置所有表单元素的值 
            success: (results) => {
                resolve(results)
            }
        })
    })
}

// remove
const remove = (data)=>{
    return $.ajax({
        url:'/api/v1/menu/remove',
        data,
        type:'delete',
        success:(results)=>{
            return results
        }
    })
}

export default {
    list,
    save,
    listone,
    update,
    remove
}

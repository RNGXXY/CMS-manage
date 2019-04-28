
//提供列表数据
// const list = (page) => {
//     return $.ajax({
//         url: '/api/v1/userList/listall', 
//         data:page,
//         success:(results) => {
//            return results
//         }
//     })
// }

// 根据页数来返回数据
const list = (_page) => {
    return $.ajax({
        data:_page,
        url: '/api/v1/userList/listPage', 
        success:(results) => {
           return results
        }
    })
}


// 提供保存数据
const save = (data) => {
    
    return $.ajax({
        url:'/api/v1/userList/addUser',
        type: 'POST',
        data,
        success:(results)=>{
            return results
        }
    })

    // return new Promise((resolve) => {
    //     $('.users-save #save-moive-form').ajaxSubmit({
    //         url: '/api/v1/users/addUser',
    //         type: 'POST',
    //         success: (results) => {
    //             resolve(results)
    //         }
    //     })
    // })
}

//listone
const listone = (data)=>{
    return $.ajax({
        url:'/api/v1/userList/listone',
        data,
        success:(results)=>{
            return results
        }
    })
}

//update
const update = (data) => {
    return $.ajax({
        url:'/api/v1/userList/update',
        type: 'POST',
        data,
        success:(results)=>{
            return results
        }
    })
}

// remove
const remove = (data)=>{
    return $.ajax({
        url:'/api/v1/userList/remove',
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

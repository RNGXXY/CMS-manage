


const list = ()=>{
    return $.ajax({
        url:"api/v1/singer/list",
        success:(result)=>{
            return result;
        }
    })
}

export default {
    list,
}
let onHandleTime = (timeStamp)=>{
    let year = new Date(timeStamp).getFullYear()
    let month = onHandleNum(new Date(timeStamp).getMonth()+1)
    let day = onHandleNum(new Date(timeStamp).getDate())
    let hour = onHandleNum(new Date(timeStamp).getHours())
    let minute =  onHandleNum(new Date(timeStamp).getMinutes())
    let second =  onHandleNum(new Date(timeStamp).getSeconds())
  
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
  
  let onHandleNum = (data)=>{
    if(Number(data)<10){
      return '0'+data
    }else{
      return data
    }
  }
  
  module.exports = onHandleTime
window.onload=()=>{
    
    // 重置
    var payNum = Array.from(document.getElementsByClassName('payNum'))[0]
    var reset = document.getElementById('reset')
    reset.onclick=function(){
        payNum.value = ''
    }

    // 生成小键盘
    let keyArr = ['1','2','3','0','4','5','6','.','7','8','9','支付']
    let keyBoards = function(){
        let workWrap = Array.from(document.getElementsByClassName('workWrap'))[0]
        keyArr.map((item,index)=>{
            let div = document.createElement('div');           // 创建元素
            let calssName = document.createAttribute("class"); // 创建属性
            calssName.value = 'keyBoard';                      // 设置属性值
            div.setAttributeNode(calssName);                   // 将属性插入元素中
            div.innerHTML=item
            workWrap.appendChild(div)

            if (item == '支付') {
                div.style.background = 'green'
                div.style.color = 'white'
            }
        })
    }
    keyBoards()

    // 点击小键盘出来相应的内容
    let keyBoard =  Array.from(document.getElementsByClassName('keyBoard'))
        keyBoard.forEach((item,index)=>{
            item.onclick = function(){
            let price = Array.from(document.getElementsByClassName('payNum'))[0]
            let num = this.innerText    // 键盘的值
            
            switch(num){
                case '0' :
                    if(price.value==='0') {
                        return false 
                    }
                    payNum.value =  payNum.value + num
                    break;
                case '.' :
                    if(price.value===''){
                        payNum.value = '0' + num
                        return false
                    }else if(price.value.indexOf('.') != -1){
                        return false
                    }
                    payNum.value =  payNum.value + num
                    break;
                case '支付' :
                    let paySuccess = Array.from(document.getElementsByClassName('paySuccess'))[0]
                    let payFail = Array.from(document.getElementsByClassName('payFail'))[0]
                    if(price.value){
                        paySuccess.style.display='block'
                        setTimeout(()=>{
                            paySuccess.style.display='none'
                            price.value = ''
                        },1500)
                    }
                    if(price.value === '0.'){
                        price.value = '0'
                    }
                    if(price.value === '0'){
                        payFail.style.display='block'
                        setTimeout(()=>{
                            payFail.style.display='none'
                        },1500)
                    }
                    if(!price.value){
                        payFail.innerText = '金额为空'
                        payFail.style.display='block'
                        setTimeout(()=>{
                            payFail.innerText = '支付失败'
                            payFail.style.display='none'
                        },1500)
                    }
                    break;
                default :
                    if(price.value === '0') {
                        payNum.value = num
                        return false
                    }
                    payNum.value =  payNum.value + num
            }
        }
    })
}
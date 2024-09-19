

const checkingResult = {} // 记录表单form状态 

let onSubmitBtn = {} 



export function createForm (info) {
    onSubmitBtn = document.querySelector(info.confirm)

    createFormCheck(info)

}

function createFormCheck(info){
    for(let key in info){
        let el = document.getElementsByName(key)

        // console.log(el, info[key]) 

        if(info[key].hasOwnProperty('value')) checkingResult[key] = false 

        if(el.length == 0) {
            continue
        }else if(el.length == 1){
            // realname/idnumber/occupation(select)//intro 
            createSimpleFormElement(el[0], info[key])

        }else if(el.length >= 1){
            //  gender(radio)/learning(checkbox)
            createComplexFormElement(el, info[key])
        }   
    }

    onSubmitBtn.addEventListener('click', (e) => handleSubmit(e, info), false)

}

function createSimpleFormElement(el, info){
    el.addEventListener(
        el.tagName.toLowerCase() === 'select' ? 'change':'input', 
        (e) => handleInput(e, info), 
        false
    )

}

function createComplexFormElement(collection, info){

    collection.forEach(el => {
        el.addEventListener('change', (e) => handleInput(e, info), false)
    })

}

function handleSubmit(e, info){
    e.preventDefault();
    const _info = {}

    for(let k in info){
        if(info.hasOwnProperty(k)){
            _info[k] = info[k].value
        }
    }
    info.submit(_info)

}

function handleInput(e, info){
    console.log(info)
    const {
        name,
        value,
        oIcon, 
        oWarn
    } = getElements(e) // 获取用户输入的信息 

    if(e.target.type === 'checkbox'){
        if(e.target.checked){
            info.value = [...info.value, value]
        }else{
            info.value = info.value.filter( e => e.value !== value)
        }
    }else{
        info.value = value  // 添加到form中 
    }

    const isPass = info.regular(info.value)
    checkingResult[name] = isPass
    oIcon.style.display = isPass ? 'inline-block' : 'none'
    oWarn.innerText = isPass ? '' : info.mark
    typeof info.listener === 'function' && info.listener(info)

    getCheckingResult()
}


function getElements(e){
    const tar = e.target
    const {value, name} = tar
    const parentNode = tar.parentNode
    const oIcon = parentNode.querySelector('.fa')
    const oWarn = parentNode.querySelector('.warn')

    return {
        name,
        value,
        oIcon, 
        oWarn
    }
}

function getCheckingResult(){
    for(let key in checkingResult){
        console.log(key, checkingResult[key])
        if(!checkingResult[key]) return false 
        onSubmitBtn.setAttribute('disabled', true)
    }

    onSubmitBtn.removeAttribute('disabled')
    return true 
}
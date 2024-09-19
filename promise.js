class Commitment{
	static PENDING = 'Pending'
    static FULFILLED = 'Fulfilled'
    static REJECTED = 'Rejected'
  
	constructor(func){
        this.status = Commitment.PENDING
        this.result = null //passing msg 

        this.resolveCallback = [] //在没有resolve之前，可以先保存.then传入的函数
        this.rejectCallback = []

        try {
            func(this.resolve.bind(this), this.reject.bind(this))
        }catch(err){
            this.reject(err)
        }
  }
  
  resolve(result){
    setTimeout( () => {
        // console.log('resolve -', this.status)
        if(this.status == Commitment.PENDING){
            this.status = Commitment.FULFILLED
            this.result = result
    
            this.resolveCallback.forEach( callback => {
                callback(result)
            })
        }
    })
  }
  
  reject(result){
    setTimeout( () => {
        // console.log('reject -', this.status)
        if(this.status == Commitment.PENDING){
            this.status = Commitment.REJECTED
            this.result = result
            
            this.rejectCallback.forEach( callback => {
                callback(result)
            })
        }
    
        
    })
    
  }

  //then 的两个入参，是两个函数。分别是成功和失败。
  //假如入参不是函数，就自动忽略，并且不会报错。
  then(onFULFILLED, onREJECTED){
    //链式表达式可以用返回 new Commitment来实现，暂时不实现了。返回一个新的Commitment，他就自己的.then方法
    // return new Commitment( (resolve, reject) => {
        onFULFILLED = typeof onFULFILLED == 'function'? onFULFILLED:()=>{}
        onREJECTED = typeof onREJECTED == 'function'? onREJECTED:()=>{}

        if( this.status == Commitment.PENDING){
            this.resolveCallback.push(onFULFILLED)
            this.rejectCallback.push(onREJECTED)
        }
        if(this.status == Commitment.FULFILLED){
            setTimeout( () => {
                onFULFILLED(this.result)
            })
        }
        if(this.status == Commitment.REJECTED){
            setTimeout( () => {
                onREJECTED(this.result)
            })
        }
    // })

    
    
  }
}

// console.log(1)
// let commitment = new Commitment( (resolve, reject)=> {
//     console.log(2)

//     setTimeout( ()=> {
//         resolve('111')
//         reject('222')
//         console.log(4)

//     })
// })
// commitment.then( 
//     (ret) => { console.log(ret)},
//     (err) => { console.log(err)},
// )
// console.log(3)


console.log('1')
let p1 = new Promise((resolve, reject) => {
    console.log('2')
    setTimeout( ()=> {
        resolve('111')
        reject('222')
        console.log('4')

    })
    
})

p1.then( 
    (ret) => { console.log(ret)},
    (err) => { console.log(err)},
).then(
    (ret) => { console.log(ret)},
    (err) => { console.log(err)},
)
console.log('3')
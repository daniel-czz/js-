class PubSub{
    constructor(){
        // this.events = {
        //     eventType: []
        // }
        this.events = {}
    }

    subscribe(eventType, callback){
        if(this.events.hasOwnProperty(eventType)){
            this.events[eventType].push(callback)
        }else{
            this.events[eventType] = [callback]
        }
    }

    publish(eventType, ...args){
        if(this.events.hasOwnProperty(eventType)){
            this.events[eventType].forEach(callback => {
                callback(...args)
            });
        }else{
            console.log(`${eventType} is not found`);
        }
    }

    unsubscribe(eventType, callback){
        if(this.events.hasOwnProperty(eventType)){
            this.events[eventType] = this.events[eventType].filter(e => {
                e == callback
            });
        }else{
            console.log(`${eventType} is not found`);
        }
    }

    unsubscribeAll(eventType){
        this.events[eventType] = []
    }

}

let ps = new PubSub()

ps.subscribe('game', function(...args){
    console.log('daniel subscribe ', args)
})

ps.subscribe('game', function(...args){
    console.log('Alice subscribe ', args)
})

ps.publish('game', 'juequling')






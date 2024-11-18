class eventEmitter{
  constructor(){
    this.events = {}
  } 

  on(event, listener){
    
    if(event in this.events){
      this.events[event].push(listener)

    }else{
      this.events[event] = [listener]
      console.log('add new listener', listener)

    }
  }

  emit(event, data) {
    if(event in this.events){
      this.events[event].forEach(listener => {
        listener(data)
      });
    }else{
      console.log("event does not exist")
    }
  }

  off(event, listener){
    if(event in this.events){
      this.events = this.events[event].filter(cur  => cur != listener);
      console.log('removed listener', listener)
    }else{
      console.log("event does not exist")
    }
  }
}

let test = new eventEmitter()
test.on('rousong jiao', function(passingInfo){ console.log(`Alice knows data ${passingInfo}`)})
test.emit('rousong jiao', 'rou song song')


import EventEmitter from "events"
const events = new EventEmitter();

function listenEvent(eventName: string, callback: (...args: Array<any>) => any){
    events.on(eventName, callback)
}

function listenEventOnce(eventName: string, callback: (...args: Array<any>) => any){
    events.once(eventName, callback)
}

function triggerEvent(eventName: string, ...args: Array<any>){
    events.emit(eventName, ...args)
}

export {listenEvent, listenEventOnce, triggerEvent}
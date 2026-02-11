import EventEmitter from "events"
const events = new EventEmitter();

/**
 * Starts listening for `eventName` globally
 * @param {string} eventName Eventname to listen for
 * @param {function} callback Function that should be executed when event is triggered
 */
function listenEvent(eventName: string, callback: (...args: Array<any>) => any){
    events.on(eventName, callback)
}


/**
 * Starts listening for `eventName` globally, but will only be handled once
 * @param {string} eventName Eventname to listen for
 * @param {function} callback FFunction that should be executed when event is triggered
 */
function listenEventOnce(eventName: string, callback: (...args: Array<any>) => any){
    events.once(eventName, callback)
}


/**
 * Triggers `eventname` event with the passed `args` 
 * @param {stirng} eventName Eventname to trigger
 * @param {...any} args Additional data to send
 */
function triggerEvent(eventName: string, ...args: Array<any>){
    events.emit(eventName, ...args)
}

export {listenEvent, listenEventOnce, triggerEvent}
# Logger Manager


- **Description**: Logs prettified info to console and to daily rotation log files  
- **In** `src/managers/logger/loggerManager.ts`  
- **On Init:** Creates log resources  

**Provides**:
```js
// Wether it should also print to console output
LoggerManager.debug_mode = false
// Logs a value and stores it in log file
LoggerManager.info(message: string, category?: string): void
// Logs message, alias for console.log
LoggerManager.raw(message: any): void
```

`LoggerManager.debug_mode: boolean`  
: Property that specifies if the logger should also log to console and allow debug logs.

`LoggerManager.info(message: string, category?: string)`  
: Send `message` to logs. If `category` is specified, it will be appended to the message.

`LoggerManager.raw(message: any)`  
: Alias for `console.log(message)`.
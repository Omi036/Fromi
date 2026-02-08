# Logger Manager
## Overview

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

### Fields
#### Properties
[`debug_mode`](https://fromi.readthedocs.io/en/latest/managers/Logger.html#loggermanager-debug-mode-boolean)

#### Methods
[`info()`](https://fromi.readthedocs.io/en/latest/managers/Logger.html#loggermanager-info-message-string-category-string)  
[`raw()`](https://fromi.readthedocs.io/en/latest/managers/Logger.html#loggermanager-info-message-string-category-string)  

#### Exports
`LoggerManager`

<br/>

### Docs
#### Properties
#### `LoggerManager.debug_mode: boolean`  
 &nbsp;&nbsp;&nbsp;&nbsp; Property that specifies if the logger should also log to console and allow debug logs.

<br/>

#### Methods
#### `LoggerManager.info(message: string, category?: string)`  
 &nbsp;&nbsp;&nbsp;&nbsp; Send `message` to logs. If `category` is specified, it will be appended to the message.

#### `LoggerManager.raw(message: any)`  
 &nbsp;&nbsp;&nbsp;&nbsp; Alias for `console.log(message)`.
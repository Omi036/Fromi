# HTTP Manager

## Overview

**Description**: Provides a base http server for other services.  
**In** `src/managers/http/httpManager.ts`  
**On Init:** None  
**Provides**:
```js
// Initializes the server
HTTPManager.createServer(): http.Server
// Handles other services, such as apis or websockets
HTTPManager.handle(handler: HTTPHandler): void
// Starts listening on port and hostname.
HTTPManager.listen(port?: number = 3000, hostname?: string = "0.0.0.0"): void
// Adds a listener for whatever event
HTTPManager.addEventListener(event: string, callback: Function): void
// The HTTP Server itself
HTTPManager.Server
```

<br/>

### Fields
#### Methods
[`createServer()`](https://fromi.readthedocs.io/en/latest/managers/HTTP.html#httpmanager-createserver-http-server)  
[`handle()`](https://fromi.readthedocs.io/en/latest/managers/HTTP.html#httpmanager-handle-handler-httphandler-void)  
[`listen()`](https://fromi.readthedocs.io/en/latest/managers/HTTP.html#httpmanager-listen-port-number-hostname-string-void)  
[`addEventListener()`](https://fromi.readthedocs.io/en/latest/managers/HTTP.html#httpmanager-addeventlistener-event-string-callback-function-void)  

#### Exports
`HTTPManager`

<br/>

### Docs

#### Methods

#### `HTTPManager.createServer(): http.Server`  
 &nbsp;&nbsp;&nbsp;&nbsp; Initializes the HTTP server.

#### `HTTPManager.handle(handler: HTTPHandler): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Handles other services such as APIs or websockets.

#### `HTTPManager.addEventListener(event: string, callback: Function): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Adds a listener for the given event.

#### `HTTPManager.listen(port?: number, hostname?: string): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Starts listening on port and hostname.
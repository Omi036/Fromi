# HTTP Manager

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
// The HTTP Server itself
HTTPManager.Server
```

<br/>

### Fields
#### Properties
`Server`

#### Methods
`createServer()`  
`handle()`  
`listen()`  

#### Exports
`HTTPManager`

<br/>

### Docs
#### Methods

#### `HTTPManager.createServer(): http.Server`  
 &nbsp;&nbsp;&nbsp;&nbsp; Initializes the HTTP server.

#### `HTTPManager.handle(handler: HTTPHandler): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Handles other services such as APIs or websockets.

#### `HTTPManager.listen(port?: number, hostname?: string): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Starts listening on port and hostname.
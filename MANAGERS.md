# Base Managers
Take in mind that these are the **base** managers, meaning they could've changed in your project if someone updated them.

## Index
<ul>
  <li><a href="#envinronment-manager">Envinronment Manager</a></li>
  <li><a href="#logger-manager">Logger Manager</a></li>
  <li><a href="#database-manager">Database Manager</a></li>
  <li><a href="#http-manager">HTTP Manager</a></li>
  <li><a href="#websocket-manager">WebSocket Manager</a></li>
  <li><a href="#api-manager">API Manager</a></li>
</ul>


<br/>

## Envinronment Manager
**Description**: Provides a getter for envinronment variables, may be used for other managers.  
**In** `src/managers/env/envManager.ts`  
**On Init:** Loads .env file from root dir  
**Provides**:
```js
// Gets a value or default if it does not exist
EnvManager.getEnv(key: string, default: any): any
// Sets an envinronment variable only during runtime
EnvManager.setEnv(key: string, value: any): void
```

<br/>

## Logger Manager
**Description**: Logs prettified info to console and to daily rotation log files  
**In** `src/managers/logger/loggerManager.ts`  
**On Init:** Creates log resources  
**Provides**:
```js
// Wether it should also print to console output
LoggerManager.debug_mode = false
// Logs a value and stores it in log file
LoggerManager.info(message: string, category?: string): void
// Logs message, alias for console.log
LoggerManager.raw(message: any): void
```

<br/>

## Database Manager
**Description**: Provides database connection for any database.  
**In** `src/managers/database/databaseManager.ts`  
**On Init:** None  
**Variables:**  
| variable | default | property | description |
| - | - | - | - |
| driver | DB_DRIVER | DatabaseManager.driver | Which driver to use (mysql, mongodb, json...)
| host | DB_HOST | DatabaseManager.host | IP or URL where the DB is online |
| username | DB_USER | DatabaseManager.user | User to connect with |
| password | DB_PASSWORD | DatabaseManager.password | Password for user, recommended .env use
| database | DB_DATABASE | DatabaseManager.database | Database where to connect to
**Provides**:
```js
// Starts the connection to the db
DatabaseManager.start(): void
// Inserts `element` in `table`
DatabaseManager.insertOne(table: string, element: Object): Promise<void>
// Fins an item that matched `element` inside of `table`
DatabaseManager.findOne(table: string, element: Object): Promise<Object | void>
```

## HTTP Manager
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

## WebSocket Manager
**Description**: Provides a web socket server with channels/events.  
**In** `src/managers/socket/socketManager.ts`  
**On Init:** None  
**Provides**:
```js
// Must be attached to a HTTPServer (HTTPManager.handle)
SocketManager.Handler: HTTPHandler
// (internal use) Initializes the server and registering 
SocketManager.start(): Promise<void>
// Registers a middleware
SocketManager.use(middleware: SocketMiddleware): void
// (internal use) Starts listening for channel. channel must be of type SocketChannel 
SocketManager.addChannel(channel: SocketChannel): Promise<void>
// Sends a message on `channel` to everyone
SocketManager.emit(channel: string, ...args: any): Promise<void>
// Function that triggers when a user connects, must replace value
SocketManager.onClientConnection = function(socket: Socket) => void
```
**Exports:** `SocketManager`, `SocketMiddleware`, `SocketChannel`  
**For creating a channel:** Simply create a new `SocketManager`, it will add itself unless `connectOnJoin` is specified on constructor.
```js
SocketChannel.new("hello", (socket) => socket.send("World!"))
```
**For starting it:**
```js
HTTPManager.handle(SocketChannel.Handler)
HTTPManager.listen()
```

<br/>

## API Manager
**Description**: Provides a web socket server with channels/events.  
**In** `src/managers/api/apiManager.ts`  
**On Init:** None  
**Provides**:
```js
// Must be attached to a HTTPServer (HTTPManager.handle)
APIManager.Handler: HTTPHandler
// (internal use) Initializes the server and registering 
APIManager.start(): void
// (internal use) Starts listening for route
APIManager.addRoute(route: APIRoute): void
// Handles a middleware
APIManager.use(middleware: APIMiddleware)
// Sends a message on `channel` to everyone
```
**Exports:** `SocketManager`, `APIMiddleware`, `APIRoute`  
**For creating a route:** Simply create a new `APIRoute`, it will add itself:
```js
APIRoute.new("get", "/", (req, res) => res.send("Hello"))
```
**For starting it:**
```js
HTTPManager.handle(APIManager.Handler)
HTTPManager.listen()
```
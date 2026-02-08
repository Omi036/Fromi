# WebSocket Manager

## Overview
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

<br/>

### Fields
#### Properties
`Handler`  
`onClientConnection`

#### Methods
`start()`  
`use()`  
`addChannel()`  
`emit()`  

#### Exports
`SocketManager`
`SocketMiddleware`
`SocketChannel`

<br/>

### Docs

#### Properties
#### `SocketManager.Handler: HTTPHandler`  
 &nbsp;&nbsp;&nbsp;&nbsp; Must be attached to an HTTPServer.

#### `SocketManager.onClientConnection: function`  
 &nbsp;&nbsp;&nbsp;&nbsp; Function executed when a client connects.

<br/>

#### Methods

#### `SocketManager.start(): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Initializes the websocket server.

#### `SocketManager.use(middleware: SocketMiddleware): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Registers a middleware.

#### `SocketManager.addChannel(channel: SocketChannel): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Starts listening for a channel.

#### `SocketManager.emit(channel: string, ...args: any): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Sends a message to everyone in the channel.


### Examples
#### Creating a Simple Websocket
Let's create a simple websocket that greets us!
```{code-block} js
:caption: /src/app.ts

import { SocketManager } from "./managers/socket/apiManager"
import { HTTPManager } from "./managers/http/httpManager";
import { importFromFolder } from "./lib/utils/filing"

async function main() {
    // We tell HttpManager to also handle the Websocket
    HTTPManager.handle(SocketManager.Handler)
    HTTPManager.createServer()
    HTTPManager.listen()

    // Now we register every Channel inside ./routes/ws/
    importFromFolder(path.join(__dirname, "routes", "ws"))
}

main()
```
Now let's create the channel:
```{code-block} js
:caption: /src/routes/ws/helloChannel.ts

import { SocketChannel } from "../../managers/socket/socketManager";

SocketChannel.new("hello", async (socket) => {
    await socket.send("test")
})
```
Note that HTTPHandler could handle both websockets and api managers, the don't interfere with each other. 

#### Creating a channel
**For creating a channel** simply create a new `SocketChannel`:
```{code-block} js
:caption: /src/routes/ws/helloChannel.ts

import { SocketChannel } from "../../managers/socket/socketManager";

SocketChannel.new("hello", async (socket) => {
    await socket.send("test")
})
```
And make sure to import the file:
```{code-block} js
:caption: /src/app.ts

import { importFromFolder } from "./lib/utils/filing"

// We import every route inside routes/api/
importFromFolder(path.join(__dirname, "routes", "ws"))
```
This will work because `SocketChannel.new()` appends itself to the APIManager. That means that once the `SocketChannel.new()` is triggered by the script being registered, it will append itself automatically.
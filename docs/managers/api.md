# Api Manager

**Description**: Provides a web socket server with channels/events.  
**In** `src/managers/api/apiManager.ts`  
**On Init:** None  
**Provides**:
```js
// Wether it should append the json middleware
APIManager.useJson = true
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

<br/>

### Fields
#### Properties
`useJson`  
`Handler`

#### Methods
`start()`  
`addRoute()`  
`use()`  

<br/>

### Docs

#### Properties
#### `APIManager.useJson: boolean`  
 &nbsp;&nbsp;&nbsp;&nbsp; Specifies if JSON middleware should be appended.

#### `APIManager.Handler: HTTPHandler`  
 &nbsp;&nbsp;&nbsp;&nbsp; Must be attached to an HTTPServer.

<br/>

#### Methods

#### `APIManager.start(): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Initializes the API server.

#### `APIManager.addRoute(route: APIRoute): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Starts listening for a route.

#### `APIManager.use(middleware: APIMiddleware): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Handles a middleware.

### Examples
#### Creating a Simple API
Let's create a simple api that greets us!
```{code-block} js
:caption: /src/app.ts

import { ApiManager } from "./managers/api/apiManager"
import { HTTPManager } from "./managers/http/httpManager";
import { importFromFolder } from "./lib/utils/filing"

async function main() {
    // We tell HttpManager to also handle the API
    HTTPManager.handle(APIManager.Handler)
    HTTPManager.createServer()
    HTTPManager.listen()

    // Now we register every Route inside ./routes/api/
    importFromFolder(path.join(__dirname, "routes", "api"))
}

main()
```
Now let's create the route:
```{code-block} js
:caption: /src/routes/api/rootRoute.ts

import { APIRoute } from "../../managers/api/apiManager";

APIRoute.new("get", "/", (req, res) => res.send("Hello"))
```

<br/>

#### Creating a route
**For creating a route** simply create a new `APIRoute`:
```{code-block} js
:caption: /src/routes/api/rootRoute.ts

import { APIRoute } from "../../managers/api/apiManager";

APIRoute.new("get", "/", (req, res) => res.send("Hello"))
```
And make sure to import the file:
```{code-block} js
:caption: /src/app.ts

import { importFromFolder } from "./lib/utils/filing"

// We import every route inside routes/api/
importFromFolder(path.join(__dirname, "routes", "api"))
```
This will work because `ApiRoute.new()` appends itself to the APIManager. That means that once the ApiRoute.new() is triggered by the file being registered, it will append itself automatically.
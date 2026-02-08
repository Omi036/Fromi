# Base Managers
Take in mind that these are the **base** managers, meaning they could've changed in your project if someone updated them.

## Index
<ul>
  <li><a href="#environment-manager">Environment Manager</a></li>
  <li><a href="#logger-manager">Logger Manager</a></li>
  <li><a href="#database-manager">Database Manager</a></li>
  <li><a href="#security-manager">Security Manager</a></li>
  <li><a href="#http-manager">HTTP Manager</a></li>
  <li><a href="#websocket-manager">WebSocket Manager</a></li>
  <li><a href="#api-manager">API Manager</a></li>
  <li><a href="#discord-manager">Discord Manager</a></li>
</ul>


<br/>

## Environment Manager
**Description**: Provides a getter for environment variables, may be used for other managers.  
**In** `src/managers/env/envManager.ts`  
**On Init:** Loads .env file from root dir  
**Provides**:
```js
// Gets a value or default if it does not exist
EnvManager.getEnv(key: string, default: any): any
// Sets an environment variable only during runtime
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
| database | DB_DATABASE | DatabaseManager.database | Database where to connect to |  

**Provides**:
```js
// Starts the connection to the db
DatabaseManager.start(): void
// Inserts `element` in `table`
DatabaseManager.insertOne(table: string, element: Object): Promise<void>
// Fins an item that matched `element` inside of `table`
DatabaseManager.findOne(table: string, element: Object): Promise<Object | void>
```

<br/>

## Securty Manager
**Description**: Provides security features.
**In** `src/managers/security/securityManager.ts`  
**On Init:** None  
**Variables:**  
| variable | default | property | description |
| - | - | - | - |
| JWT Expiration | JWT_EXPIRES | - | Duration of JWT Tokens (in seconds)
| JWT Secret | JWT_SECRET | - | Secret (atleast 256bits) for JWT Tokens |  

**Provides**:
```js
// Hashes texts
SecurityManager.Bcrypt.hash(value: string | Buffer): Promise<string>
// Compares a text and a hash
SecurityManager.Bcrypt.compareHash(compare: string, hash: string): Promise<boolean>

// Encrypts a text using key via AES-256-gcm
SecurityManager.AES.encrypt(key: string, text: key): AESPayload
// Decrypts an AES payload
SecurityManager.AES.decrypt(key: string, payload: AESPayload): string

// Generates a par of GPG keys
SecurityManager.GPG.generateKeys(users: ..., passphrase?: string): {privateKey: string, publicKey: string, revocationCertificate: string}
// Crypts a message using the public key
SecurityManager.GPG.crypt(content: string, publicKey: string): Promise<string>
// Decrypts a message using the private key
SecurityManager.GPG.decrypt(content: string, privateKey: string, passphrase?: string): Promise<string>
// Signs a content with the private key
SecurityManager.GPG.sign(content: string, privateKey: string, passphrase?: string): Promise<string>
// Checks if a token is verified correctly
SecurityManager.GPG.verifySign(signed: string, publicKeyArmored: string): Promise<boolean>
// Encrypts and signs a message
SecurityManager.GPG.encryptAndSign(content: string, publicKeyArmored: string, privateKeyArmored: string, passphrase?: string): Promise<string>

// Creates a token with payload. ExpiresIn and jwt secret are specified on .env by default
SecurityManager.JWT.signToken(payload: any, expiresIn?: number, jwtSecret?: string): string
// Cheks if token is valid
SecurityManager.JWT.isTokenValid(token: string, jwtSecret?: string): boolean
// Gets payload from token
SecurityManager.JWT.getPayload(token: string, jwtSecret?: string): any
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
**For creating a route:** Simply create a new `APIRoute`, it will add itself:
```js
APIRoute.new("get", "/", (req, res) => res.send("Hello"))
```
**For starting it:**
```js
HTTPManager.handle(APIManager.Handler)
HTTPManager.listen()
```

<br/>

## Discord Manager
**Description**: Provides a wrapper for discord.js library 
**In** `src/managers/discord/discordManager.ts`  
**On Init:** Creates a discord.client  
**Variables:**  
| variable | default | property | description |
| - | - | - | - |
| token | DISCORD_TOKEN | - | Discord client token, recommended .env use |
| client id | DISCORD_CLIENT_ID | - | ID of the Discord client, recommended .env use |  

**Provides**:
```js
// Logins the bot to discord, token and clientid are automatically selected from env if getEnv is specified.
DiscordManager.login(token?: string, clientId?: string): void
// Returns every command in directory 
DiscordManager.getCommandsInDirectory(directory: string): Promise<DiscordCommand[]>
// Returns every event in directory 
DiscordManager.getEventsInDirectory(directory: string): Promise<DiscordEvent[]>
// (internal use) Registers every event in list
DiscordManager.loadEvents(events: DiscordEvents[]): Promise<void>
DiscordManager.loadEvent(events: DiscordEvents): Promise<void>
// (internal use) Registers every command in list
DiscordManager.loadCommands(commands: DiscordCommand[]): Promise<void>
DiscordManager.loadCommands(command: DiscordCommand): Promise<void>
```
**Exports:** `DiscordManager`, `DiscordCommand`, `DiscordEvents`  
**For creating a command:** Simply create a new `DiscordCommand` and load the script:
```js
DiscordCommand.new()
    .setName("ping")
    .setDescription("pong!")
    .setExecute(interaction => interaction.reply("pong!"))
```
**For creating a event:** Simply create a new `DiscordEvent` and load the script:
```js
DiscordEvent.new()
    .listenOnceFor("clientReady")
    .setExecute(() => console.log("Bot is ready!"))
```

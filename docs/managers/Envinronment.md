# Envinronment Manager
**Description**: Provides a getter for envinronment variables, may be used for other managers.  
**In** `src/managers/env/envManager.ts`  
**On Init:** Loads .env file from root dir  

**Provides**:
```js
EnvManager.getEnv(key: string, default: any): any
EnvManager.setEnv(key: string, value: any): void
```

<br/>

### Fields
#### Methods
`getEnv()`  
`setEnv()`  

<br/>

### Docs
#### Methods
#### `EnvManager.getEnv(key: string, default: any): any`  
 &nbsp;&nbsp;&nbsp;&nbsp; Gets an environment variable value or returns the default if it does not exist.

#### `EnvManager.setEnv(key: string, value: any): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Sets an environment variable only during runtime.

---

## Database Manager

### Fields
#### Properties
`driver`  
`host`  
`user`  
`password`  
`database`

#### Methods
`start()`  
`insertOne()`  
`findOne()`  

<br/>

### Docs
#### Properties
#### `DatabaseManager.driver: string`  
 &nbsp;&nbsp;&nbsp;&nbsp; Which driver to use (mysql, mongodb, json...).

#### `DatabaseManager.host: string`  
 &nbsp;&nbsp;&nbsp;&nbsp; IP or URL where the database is hosted.

#### `DatabaseManager.user: string`  
 &nbsp;&nbsp;&nbsp;&nbsp; User to connect with.

#### `DatabaseManager.password: string`  
 &nbsp;&nbsp;&nbsp;&nbsp; Password for user, recommended to use .env.

#### `DatabaseManager.database: string`  
 &nbsp;&nbsp;&nbsp;&nbsp; Database where to connect to.

<br/>

#### Methods
#### `DatabaseManager.start(): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Starts the connection to the database.

#### `DatabaseManager.insertOne(table: string, element: Object): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Inserts an element in the specified table.

#### `DatabaseManager.findOne(table: string, element: Object): Promise<Object | void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Finds an item that matches the element inside the table.
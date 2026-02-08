# Database Manager

**Description**: Provides database connection for any database.  
**In** `src/managers/database/databaseManager.ts`  
**On Init:** None  

**Variables:**

| variable | default | property | description |
| - | - | - | - |
| driver | DB_DRIVER | DatabaseManager.driver | Which driver to use |
| host | DB_HOST | DatabaseManager.host | IP or URL |
| username | DB_USER | DatabaseManager.user | User |
| password | DB_PASSWORD | DatabaseManager.password | Password |
| database | DB_DATABASE | DatabaseManager.database | Database |

**Provides**:
```js
DatabaseManager.start(): void
DatabaseManager.insertOne(table: string, element: Object): Promise<void>
DatabaseManager.findOne(table: string, element: Object): Promise<Object | void>
```

<br/>

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
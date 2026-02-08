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
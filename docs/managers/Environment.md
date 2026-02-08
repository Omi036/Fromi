# Environment Manager
**Description**: Provides a getter for environment variables, may be used for other managers.  
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

#### Exports
`EnvManager`

<br/>

### Docs
#### Methods
#### `EnvManager.getEnv(key: string, default: any): any`  
 &nbsp;&nbsp;&nbsp;&nbsp; Gets an environment variable value or returns the default if it does not exist.

#### `EnvManager.setEnv(key: string, value: any): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Sets an environment variable only during runtime.
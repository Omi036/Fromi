# Envinronment Manager
**Description**: Provides a getter for envinronment variables, may be used for other managers.  
**In** `src/managers/env/envManager.ts`  
**On Init:** Loads .env file from root dir  

**Provides**:
```js
EnvManager.getEnv(key: string, default: any): any
EnvManager.setEnv(key: string, value: any): void
```
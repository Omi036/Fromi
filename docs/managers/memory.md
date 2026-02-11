# Memory Manager

## Overview

**Description**: Provides memory storage variables on the session.
**In** `src/managers/memory/memoryManager.ts`  
**On Init:** None  
**Provides**:
```js
// Adds the value to the name variable
MemoryManager.setVar(name: string, value: any): void
// Retrieves the value from the memory, otherwise return fallback
MemoryManager.getVar(name: string, fallback?: any): any
```

<br/>

### Fields

#### Methods
[`setVar()`](https://fromi.readthedocs.io/en/latest/managers/memory.html#memorymanager-setvar-name-string-value-any-void)  
[`getVar()`](https://fromi.readthedocs.io/en/latest/managers/memory.html#memorymanager-getvar-name-string-fallback-any-any)  

#### Exports
`MemoryManager`

<br/>

### Docs

#### Methods

#### `MemoryManager.setVar(name: string, value: any): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Stores `value` into `name` variable.

#### `MemoryManager.getVar(name: string, fallback?: any): any`  
 &nbsp;&nbsp;&nbsp;&nbsp; Retrieves value of `name` variable. If undefined, returns `fallback`.
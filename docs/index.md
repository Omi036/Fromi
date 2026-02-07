<br/>
<br/>
<div align="center">
<p align="center"
<img width="100" src="https://i.imgur.com/PqxlXUD.png" style="margin-left:50px;" />
</p>
  
  <h3>Fromi</h3>
  <p align="center">
    Custom General Purpose Node.js Framework.
    <br />
    <a href="#why-should-i-use-this-framework">Why?</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#structure-and-philosophy">Structure</a>
    ·
    <a href="#license">License</a>
    ·
    <a href="MANAGERS.md">Managers</a>
  </p>
</div>

```{toctree}
:caption: Getting Started
:hidden:

quickstart
structure
managers
models
convention
license
```

```{toctree}
:caption: Managers
:hidden:


managers/Envinronment
managers/Logger
managers/Database
managers/Security
managers/HTTP
managers/WebSocket
managers/API
managers/Discord

```


## Why should I use this framework?
*This framework offers a new coding experience.*  

The main reason you would wanna switch to Fromi is the **Manager-oriented structure**, along with many databases, apis, websockets along with many other **integrations and utilities**.  

Fromi is **comfy to use**, and it eases the SSS advantages: ([Stability](#Stability), [Scalability](#Scalability), [Simplicity](#Simplicity))

<br/>  

## The triple S  
### Stability
Everything is controlled by Managers, which are not communicated with each other, and have one single responsability.  
They are also interchangeable, meaning you can replace or update a Manager while keeping the rest of the code intact.

### Scalability
The structure allows for building as many Managers as needed, which may also be shared between projects as they're not attached to any previous code.  
Furthermore, the managers can be updated to hold new features.

### Simplicity
Creating an 'User' is as simple as:
```js
import { DatabaseManager } from...

DatabaseManager.start()
DatabaseManager.insertOne("users", {
    username: "Omi",
    surname: "036"
})
```
We don't need to know what's happening with the query, or even if we have to adapt to mysql or mongodb or sqlite.  
It's the Manager responsability, although we can configure it.


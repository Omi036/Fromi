<br/>
<br/>
<div align="center">
  <img height="100" src="https://media.discordapp.net/attachments/1064596920133230642/1469032543440601371/Fromi.png?ex=69862eab&is=6984dd2b&hm=bc085fa582b2120875215ff34bc943408bf91f7271c4e75d4fcdf5a48edf46bf&=&format=webp&quality=lossless&width=638&height=968" />
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
  </p>
</div>

## Index
<ol>
  <li><a href="#why-should-i-use-this-framework">Why using this?</a>
    <ol>
      <li><a href="#stability">Stability</a></li>
      <li><a href="#scalability">Scalability</a></li>
      <li><a href="#simplicity">Simplicity</a></li>
    </ol>
  </li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#structure-and-philosophy">Structure</a></li>
  <li><a href="#convention-followed">Convention</a></li>
  <li><a href="#license">License</a></li>
</ol>


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

<br/>  

## Getting started
Clone the repo and setup the dependencies:
```bash
git clone https://github.com/Omi036/Fromi
cd Fromi
npm run setup
```
For starting the project:
```bash
npm run start
```
Now you can start tinkering with `src/app.ts`, happy hacking!

<br/>  

## Structure and philosophy
This framework contains Managers, Models and the main library.  

Everything is done by **Managers**, they are singleton classes and are in charge of just one area. Managers are not communicated with each other, unless the user provides them utils from another managers.  

**Models** are objects that links information objects to an interface, such as Users or Database Entries.

**The main library** contains essential providers and some utils and extras that may be appreciated.  

By following this philosophy, we can create a `LoggerManager.info()`, which opposite to `console.log()`, this method prettifies the message to the console (if chosen) and also logs it into files.

### Managers rules
Managers must contain an `init()` and be called at the end of the file that contains it.  
Managers should never contact other managers by themselves.  
Managers with the same responsability should not change field names between updates or versions.  

<br/>  

## Convention followed
| Type | Convention | 
|---|---|
|Files | lowerCamelCase  
|Classes | UpperCamelCase  
|Methods | lowerCamelCase  
|Properties | snake_case  
|Private Fields | _singleLeading
|Types | UpperCamelCase



<br/>  

## License
Distributed under the MIT License. See `LICENSE` for more information.

<p align="right"><a href="#index">back to top</a></p>

# Fromi
Custom General Purpose Node.js Framework.

## Why should I use this framework?
Using this framework comes with many advantages, such as **SSS**: stability, simplicity, and huge scalability.  
And obviously, it comes with database, api and websocket integrations.  
All of these are possible thanks to its Manager-oriented structure.

### Stability
Everything is controlled by Managers, which are not communicated with each other, and have one single responsability. They are also interchangeable, meaning you can replace or update a Manager while keeping the rest of the code intact.

### Simplicity
Simplicity comes with a high level of abstraction. For updating a user to db you would usually do: 
```
let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "INSERT INTO users (name, surname) VALUES ('Omi', '036')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Inserted");
  });
});
```
But with managers and models:
```
import { UserModel } from ...
import { DatabaseManager } from ...

DatabaseManager.start()
UserModel.createOne({
    username: "Omi",
    surname: "036"
})
```
Or in a lower level:
```
import { DatabaseManager } from...

DatabaseManager.start()
DatabaseManager.insertOne("users", {
    username: "Omi",
    surname: "036"
})
```
We don't need to know what's happening with the query, or even if we have to adapt to mysql or mongodb or sqlite. It's the Manager responsability.

### Scalability
The structure allows for building as many Managers as needed, which can also be shared between projects as they're not attached to any previous code. Furthermore, the managers can be updated to hold new features.

## Structure and philosophy
This framework contains Managers, Models and the main library.  

Everything is done by **Managers**, they are singleton classes and are in charge of just one area. Managers are not communicated with each other, unless the user provides them utils from another managers.  

**Models** are objects that links information objects to an interface, such as Users or Database Entries.

**The main library** contains essential providers and some utils and extras that may be appreciated.  

By following this philosophy, we can create a `LoggerManager.info()`, which opposite to `console.log()`, this method prettifies the message to the console (if chosen) and also logs it into files.

## Convention followed
| Type | Convention | 
|---|---|
|Files | lowerCamelCase  
|Classes | UpperCamelCase  
|Methods | lowerCamelCase  
|Properties | snake_case  
|Private Fields | _singleLeading

Classes must contain an `init()` and be called at the end of the file that contains it, they should never contact with other managers by themselves.
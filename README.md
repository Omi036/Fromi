# Fromi
Custom General Purpose Node.js Framework.

**Structure and philosophy**  
This framework contains Managers, Models and the main library.  

Everything is done by **Managers**, they are singleton classes and are in charge of just one area. Managers are not communicated with each other, unless the user provides them utils from another managers.  

**Models** are objects that links information objects to an interface, such as Users or Database Entries.

**The main library** contains essential providers and some utils and extras that may be appreciated.  

By following this philosophy, we can create a `LoggerManager.info()`, which opposite to `console.log()`, this method prettifies the message to the console (if chosen) and also logs it into files.

**Convention that im following:**  
| Type | Convention | 
|---|---|
|Files | lowerCamelCase  
|Classes | UpperCamelCase  
|Methods | lowerCamelCase  
|Properties | snake_case  
|Private Fields | _singleLeading

Classes must contain an `init()` and be called at the end of the file that contains it, they should never contact with other managers by themselves.
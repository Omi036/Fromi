# Utils
Fromi provides some general functions that may be used globally.  

## Index
- [Events](https://fromi.readthedocs.io/en/latest/builtins/utils.html#events)
- [Delay function](https://fromi.readthedocs.io/en/latest/builtins/utils.html#delay-function)
- [Object has fields](https://fromi.readthedocs.io/en/latest/builtins/utils.html#object-has-fields)
- [Import/Load all scripts in folder](https://fromi.readthedocs.io/en/latest/builtins/utils.html#import-load-all-scripts-in-folder)
 
<br/>  

### Events
Events can be triggered and handled anywhere in the framework. They may be useful when connecting several services, but can get messy if not organised.  

```{code-block} js
:caption: Events examples
import { LoggerManager } from "managers/logger/loggerManager"
import { listenEvent, triggerEvent } from "lib/utils/events"

// We listen for the event
listenEvent("helloMessage", (msg) => {
    LoggerManager.info(`Someone told me to say ${msg}!`)
})

// And now we trigger it from anywhere
triggerEvent("helloMessage", "hello!")
```
 
<br/>  

### Delay Function
As the name says, it will await x milliseconds, useful for loops or sequences.  
Must be awaited.  

```{code-block} js
:caption: Delay example
import { LoggerManager } from "managers/logger/loggerManager"
import { delay } from "lib/utils/delay"

async main(){
    LoggerManager.info("3")
    await delay(1000)

    LoggerManager.info("2")
    await delay(1000)

    LoggerManager.info("1")
    await delay(1000)

    LoggerManager.info("LAUNCHING ROCKET!!!")
}

main()
```
 
<br/>  

### Object has fields
Function that returns true if the object param has every field specified.  

```{code-block} js
:caption: Fields examples
import { LoggerManager } from "managers/logger/loggerManager"
import { listenEvent } from "lib/utils/events"
import { hasFields } from "lib/utils/fields"

listenEvent("login", user => {
    // Check if user.username and user.password exists
    if(!hasFields(user, ["username", "password"])) {
        LoggerManager.error("You need to send me an username and password!")
        return
    } 

    LoggerManager.info("Everything in order")
})
```
 
<br/>  

### Import/load all scripts in folder
Loads every script in a specified folder (in absolute path). Really useful in this framework, as lots of modules just need to be loaded in order to be registered.

```{code-block} js
:caption: Example with routes
import { importFromFolder } from "lib/utils/filing"
import path from path

// Lets load every route in ./routes/api
importFromFolder(path.join(__dirname, "routes", "api"))
```
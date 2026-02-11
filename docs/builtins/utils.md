# Utils
Fromi provides some general functions that may be used globally.  

## Index
- Events
- Delay function
- Object has fields
- Import/Load all scripts in folder

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

### Object has fields
Function that returns true if the object param has every field specified.  

```{code-block} js
:caption: Fields examples
import { APIRoute } from "managers/logger/loggerManager"
import { hasFields } from "lib/utils/fields"

APIRoute.new("post", "/login", (req, res) => {
    if(!hasFields(req.body, ["username", "password"])) {
        res.send("You need to send me an username and password!")
    }

    res.send("Yup, everything is in order")
})
```

### Import/load all scripts in folder
Loads every script in a specified folder (in absolute path). Really useful in this framework, as lots of modules just need to be loaded in order to be registered.

```{code-block} js
:caption: Example with routes
import { importFromFolder } from "lib/utils/filing"
import path from path

// Lets load every route in ./routes/api
importFromFolder(path.join(__dirname, "routes", "api"))
```
# Ollama Manager

## Overview

**Description**: Allows chatting with ollama models.  
**In** `src/managers/ollama/ollamaManager.ts`  
**On Init:** Initializes the ollama client.  
**Provides**:
```js
// Initializes the client with the given url and token (defaults to local)
OllamaManager.init(url?: string, token?: string): void
// Sends a message to the given model
OllamaManager.chat(model: string, ...messages: OllamaMessage[]): Promise<ChatResponse>

// Creates a message with the user role
OllamaMessage.fromUser(message: string)
// Creates a message with the system role
OllamaMessage.fromSystem(message: string)
```

<br/>

### Fields

#### Methods
[`init()`](https://fromi.readthedocs.io/en/latest/managers/memory.html#memorymanager-setvar-name-string-value-any-void)  
[`chat()`](https://fromi.readthedocs.io/en/latest/managers/memory.html#memorymanager-getvar-name-string-fallback-any-any)  

#### Exports
`OllamaManager` `OllamaMessage`

<br/>

### Docs

#### Methods

#### `OllamaManager.init(url?: string, token?: string): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Initializes the ollama client at the given url with the given token.

#### `OllamaManager.chat(model: string, ...messages: OllamaMessage[]): Promise<ChatResponse>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Sends `messages` to the given `model` and returns the response.

#### `OllamaMessage.fromUser(message: string): OllamaMessage`
 &nbsp;&nbsp;&nbsp;&nbsp; Creates a message with the user role.

#### `OllamaMessage.fromSystem(message: string): OllamaMessage`
 &nbsp;&nbsp;&nbsp;&nbsp; Creates a message with the system role.


<br/>

### Example
### Sending a message to a local model
Let's send a "Do you copy?" message to our ollama `gemma4:e4b` model:

```{code-block} js
:caption: /src/app.ts

import { LoggerManager } from "./managers/logger/loggerManager";
import { OllamaManager, OllamaMessage } from "./managers/ollama/ollamaManager";

async function main() {

    // We initialize the model (its local, no need for params)
    OllamaManager.init()
    const response = await OllamaManager.chat("gemma4:e4b", OllamaMessage.fromUser("Do you copy?"))

    LoggerManager.info(response.message.content)
}

main()
```

### Sending a message to a local model with system role
Let's send a "Do you copy?" message to our ollama `gemma4:e4b` model but with a previous system role, concatenating messages:

```{code-block} js
:caption: /src/app.ts

import { LoggerManager } from "./managers/logger/loggerManager";
import { OllamaManager, OllamaMessage } from "./managers/ollama/ollamaManager";

async function main() {

    // We initialize the model (its local, no need for params)
    OllamaManager.init()

    // This time we will separate messages for clarity and for demostration purposes
    const systemMessage = OllamaMessage.fromSystem("You must start every sentence with `QUAK`")
    const userMessage = OllamaMessage.fromUser("Do you copy?")

    const response = await OllamaManager.chat("gemma4:e4b", systemMessage, userMessage)

    LoggerManager.info(response.message.content)
    // QUAK Yes, I do copy the instructions and the format required for my response.
}

main()

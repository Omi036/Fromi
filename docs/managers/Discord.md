# Discord Manager

**Description**: Provides a wrapper for discord.js library 
**In** `src/managers/discord/discordManager.ts`  
**On Init:** Creates a discord.client  
**Variables:**  
| variable | default | property | description |
| - | - | - | - |
| token | DISCORD_TOKEN | - | Discord client token, recommended .env use |
| client id | DISCORD_CLIENT_ID | - | ID of the Discord client, recommended .env use |  

<br/>

### Fields
#### Methods
`login()`  
`getCommandsInDirectory()`  
`getEventsInDirectory()`  
`loadEvents()`  
`loadEvent()`  
`loadCommands()`  

<br/>

### Docs

#### Methods

#### `DiscordManager.login(token?: string, clientId?: string): void`  
 &nbsp;&nbsp;&nbsp;&nbsp; Logins the bot to discord.

#### `DiscordManager.getCommandsInDirectory(directory: string): Promise<DiscordCommand[]>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Returns every command in directory.

#### `DiscordManager.getEventsInDirectory(directory: string): Promise<DiscordEvent[]>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Returns every event in directory.

#### `DiscordManager.loadEvents(events: DiscordEvents[]): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Registers every event in list.

#### `DiscordManager.loadEvent(event: DiscordEvents): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Registers a single event.

#### `DiscordManager.loadCommands(commands: DiscordCommand[]): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Registers every command in list.

#### `DiscordManager.loadCommands(command: DiscordCommand): Promise<void>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Registers a single command.

<br/>

### Examples
#### Creating a bot
Let's create a bot that replies to our ping and notifies us when it's ready!:
Fist, we must specify the secrets in our `.env` file:
```{code-block} env
DISCORD_TOKEN="QE1438jBB$..."
DISCORD_CLIENT_ID=1903294...
```
Now we can start the manager:
```{code-block} js
:caption: /src/app.ts

import { LoggerManager } from "./managers/logger/loggerManager";
import { EnvManager } from "./managers/env/envManager";
import { DiscordManager } from "./managers/discord/discordManager";

async function main() {
    // So we can see debug messages
    LoggerManager.debug_mode = true;

    // We setup the manager with the utilities we want
    DiscordManager.logInfo = LoggerManager.info;
    DiscordManager.getEnv = EnvManager.getEnv

    // Creates the client
    await DiscordManager.start()

    // Loads every command and event in /src/commands/and in /src/events/
    await DiscordManager.getCommandsInDirectory(path.join(__dirname, "commands"))
    await DiscordManager.getEventsInDirectory(path.join(__dirname, "events"))

    // Finally, logins the client
    await DiscordManager.login()
}

main()
```
Now, let's register a `/echo` command:
```{code-block} js
:caption: /src/commands/pingCommand.ts

import { DiscordCommand } from "../managers/discordManager";

const PingCommand = DiscordCommand.new()
    .setName("ping")
    .setDescription("Pings the bot")
    .setExecute(async interaction => {
        interaction.reply("pong!");
    })
```
And finally, let's register a `ready` event:
```{code-block} js
:caption: /src/events/readyEvent.ts

import { DiscordEvent } from "../managers/discordManager";
import { LoggerManager } from "../managers/logger/loggerManager";

const readyEvent = DiscordEvent.new()
    .listenOnceFor(DiscordEvent.Events.ClientReady)
    .setExecute(async () => {
        LoggerManager.info("Bot is ready!");
    });
```
As usual in our framework, the commands and events are appended automatically when `.new()` is fired (in our case, by the script being imported). However, this behaviour can be changed with the `should_append` param: `DiscordCommand.new(false)` and `DiscordEvent.new(false)`, this way you can't manage them on your own.
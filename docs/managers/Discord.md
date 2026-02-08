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
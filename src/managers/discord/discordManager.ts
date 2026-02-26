import { Client as DiscordClient, GatewayIntentBits, REST, Routes } from "discord.js";
import { Manager } from "../../lib/classes/manager";
import { importFromFolder } from "../../lib/utils/filing";
import { DiscordCommand } from "./command";
import { DiscordEvent } from "./events";

/**
 * ### DiscordManager
 * Wrapper for discord.js
 */
class DiscordManager extends Manager {
    private static _hasStarted = false
    static client: DiscordClient | null = null;
    static commands: DiscordCommand[] = []
    static events: DiscordEvent[] = []
    static getEnv(varName: string, fallback?: any): string {return ""};
    static logInfo(message: string, section?: string) {
        console.log(`[${section}] ${message}`);
    }
    
    static init(intents: GatewayIntentBits[] = [GatewayIntentBits.Guilds]) {
        DiscordManager.client = new DiscordClient({ intents: intents });
    }

    /**
     * Sets the client [Gateway Intents](https://discordjs.guide/legacy/popular-topics/intents).  
     * It will only update if set before client logged in
     * @param {GatewayIntentBits[]} intents List of intents that the bot should use
     */
    static setIntents(intents: GatewayIntentBits[] = [GatewayIntentBits.Guilds]){
        if(DiscordManager._hasStarted) return
        DiscordManager.init(intents)
    }


    /**
     * Starts the Client life.  
     * It also registers the commands and the events. 
     * @param {sting?} token Discord client token. If none specified, it will search for the DISCORD_TOKEN env
     * @param {string?} clientId Discord client id. If none specified, it will search for the DISCORD_CLIENT_ID env
     */
    static login(token?: string, clientId?: string): void {
        token = token || DiscordManager.getEnv("DISCORD_TOKEN")
        DiscordManager.logInfo("Logging in to Discord...", "DiscordManager");        
        DiscordManager.client.login(token);
        DiscordManager.logInfo("Logged in", "DiscordManager");
        DiscordManager._hasStarted = true

        DiscordManager.loadCommands(DiscordManager.commands, token, clientId)
        DiscordManager.loadEvents(DiscordManager.events)
    }


    /**
     * Loads and retrieves scripts in `directory` folder, and also returns DiscordCommand for every script that has one.
     * @param {string} directory Directory where the scripts are located
     * @returns List of DiscordCommand's of every script.
     */
    static async getCommandsInDirectory(directory: string): Promise<DiscordCommand[]> {
        const commandModules = await importFromFolder(directory)
        const commands: DiscordCommand[] = commandModules
            .map(mod => mod.default)
            .filter(mod => mod instanceof DiscordCommand);

        return commands;
    }


    /**
     * Loads and retrieves scripts in `directory` folder, and also returns DiscordEvent for every script that has one.
     * @param {string} directory Directory where the scripts are located
     * @returns List of DiscordEvent's of every script.
     */
    static async getEventsInDirectory(directory: string): Promise<DiscordEvent[]> {
        const eventModules = await importFromFolder(directory);
        const events: DiscordEvent[] = eventModules
            .map(mod => mod.default)
            .filter(mod => mod instanceof DiscordEvent);
            
        return events;
    }

    static async loadEvent(event: DiscordEvent): Promise<void> { DiscordManager.loadEvents([event]) }
    static async loadEvents(events: DiscordEvent[]): Promise<void> {
        DiscordManager.logInfo(`Registering ${events.length} events...`, "DiscordManager");

        for (let event of events) {
            event.register();
        }
        DiscordManager.logInfo(`Registered ${events.length} events`, "DiscordManager");
    }


    static async loadCommand(command: DiscordCommand): Promise<void> { DiscordManager.loadCommands([command]) }
    static async loadCommands(commandList: DiscordCommand[], token?: string, clientId?: string): Promise<void> {

        token = token || DiscordManager.getEnv("DISCORD_TOKEN")
        clientId = clientId || DiscordManager.getEnv("DISCORD_CLIENT_ID")

        DiscordManager.logInfo("Loading commands...", "DiscordManager");    

        const rest = new REST({ version: '10' }).setToken(token);
        const commands = commandList.map(cmd => cmd.toJSON());
        const response = await rest.put(Routes.applicationCommands(clientId), { body: commands })

        DiscordManager.logInfo(`Loaded ${commands.length} commands`, "DiscordManager");    

        // Handle command interactions
        DiscordManager.client.on(DiscordEvent.Events.InteractionCreate, async interaction => {
            if (!interaction.isCommand()) return;

            const command = commandList.find(cmd => cmd.command_name === interaction.commandName);

            if (command) {
                await command.execute(interaction);
            } else {
                DiscordManager.logInfo(`No command found for ${interaction.commandName}`, "DiscordManager");
            }
        });
    }
}

DiscordManager.init();
export { DiscordManager, DiscordCommand, DiscordEvent };
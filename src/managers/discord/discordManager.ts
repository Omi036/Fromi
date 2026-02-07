import { Client as DiscordClient, GatewayIntentBits, REST, Routes } from "discord.js";
import { Manager } from "../../lib/classes/manager";
import { importFromFolder } from "../../lib/utils/filing";
import { DiscordCommand } from "./command";
import { DiscordEvent } from "./events";

class DiscordManager extends Manager {
    static client: DiscordClient | null = null;
    static getEnv(varName: string): string {return ""};
    static logInfo(message: string, section?: string) {
        console.log(`[${section}] ${message}`);
    }

    static init() {
        this.client = new DiscordClient({ intents: [GatewayIntentBits.Guilds] });
    }


    static login(): void {
        const token = this.getEnv("DISCORD_TOKEN")
        this.logInfo("Logging in to Discord...", "DiscordManager");        
        this.client.login(token);
        this.logInfo("Logged in", "DiscordManager");
    }


    static async getCommandsInDirectory(directory: string): Promise<DiscordCommand[]> {
        const commandModules = await importFromFolder(directory);
        const commands: DiscordCommand[] = commandModules.map(mod => mod.default);

        return commands;
    }


    static async getEventsInDirectory(directory: string): Promise<DiscordEvent[]> {
        const eventModules = await importFromFolder(directory);
        const events: DiscordEvent[] = eventModules.map(mod => mod.default);
        return events;
    }


    static async loadEvents(events: DiscordEvent[]): Promise<void> {
        this.logInfo(`Registering ${events.length} events...`, "DiscordManager");

        for (let event of events) {
            event.register();
        }
        this.logInfo(`Registered ${events.length} events`, "DiscordManager");
    }


    static async loadCommands(commandList: DiscordCommand[]): Promise<void> {

        const token = this.getEnv("DISCORD_TOKEN")
        const clientId = this.getEnv("DISCORD_CLIENT_ID")

        this.logInfo("Loading commands...", "DiscordManager");    

        const rest = new REST({ version: '10' }).setToken(token);
        const commands = commandList.map(cmd => cmd.toJSON());
        const response = await rest.put(Routes.applicationCommands(clientId), { body: commands })

        this.logInfo(`Loaded ${commands.length} commands`, "DiscordManager");    

        // Handle command interactions
        this.client.on(DiscordEvent.Events.InteractionCreate, async interaction => {
            if (!interaction.isCommand()) return;

            const command = commandList.find(cmd => cmd.command_name === interaction.commandName);

            if (command) {
                await command.execute(interaction);
            } else {
                this.logInfo(`No command found for ${interaction.commandName}`, "DiscordManager");
            }
        });
    }
}

DiscordManager.init();
export { DiscordManager, DiscordCommand };
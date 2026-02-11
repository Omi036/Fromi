import { 
    ApplicationCommandOptionBase,
    ChatInputCommandInteraction,
    PermissionFlags, 
    SlashCommandAttachmentOption, 
    SlashCommandBuilder, 
    SlashCommandChannelOption, 
    SlashCommandIntegerOption, 
    SlashCommandMentionableOption, 
    SlashCommandNumberOption, 
    SlashCommandRoleOption, 
    SlashCommandStringOption, 
    SlashCommandUserOption 
} from "discord.js";
import { DiscordManager } from "./discordManager";

/**
 * Represents a Discord slash command with helpers for building
 * options, permissions, and execution logic.
 */
class DiscordCommand {
    /**
     * Creates a new DiscordCommand instance.
     * @param should_register Whether the command should automatically be registered in the DiscordManager.
     */
    constructor(should_register: boolean = true) { 
        this._shouldRegister = should_register
        if(should_register) DiscordManager.commands.push(this) 
    }

    /**
     * Creates a new DiscordCommand instance.
     * @param should_register - Whether the command should automatically
     *                          be registered in the DiscordManager.
     */
    static new(should_register: boolean = true): DiscordCommand {return new this()}

    /**
     * Returns a registered command by its name.
     * @param name - Name of the command.
     */
    static getCommand(name: string): DiscordCommand | undefined {
        return DiscordManager.commands.find(cmd => cmd.command_name === name);
    } 

    /**
     * Executes a command by its name.
     * @param command_name Name of the command to execute.
     * @param args Arguments forwarded to the command execute method.
     */
    static execute(command_name: string, ...args: any[]): any {
        const command = DiscordCommand.getCommand(command_name);
        if (!command) {
            throw new Error(`Command ${command_name} not found`);
        }
        return command.execute(...args);
    }


    command_name: string = "basecommand";
    command_description: string = "Base command description";
    permissions_required: PermissionFlags[] = [];
    readonly _shouldRegister: boolean = true
    private _params: Map<string, ApplicationCommandOptionBase> = new Map();
    
    
    async execute(...args: any[]): Promise<any> {}

    /** Sets the command name. */
    setName(name: string): this {
        this.command_name = name;
        return this;
    }

    /** Sets the command description. */
    setDescription(description: string): this {
        this.command_description = description;
        return this;
    }

    /** Sets required permissions for the command. */
    setPermissions(permissions: PermissionFlags[]): this {
        this.permissions_required = permissions;
        return this;
    }

    /**
     * Defines the function executed when the command is triggered.
     * @param fn - Execution callback receiving the interaction.
     */
    setExecute(fn: (interaction: ChatInputCommandInteraction, ...args: any[]) => any): this {
        this.execute = fn;
        return this;
    }

    /** Converts this command to Discord API JSON format. */
    toJSON(): object {
        const command = new SlashCommandBuilder()
            .setName(this.command_name)
            .setDescription(this.command_description);

        this._params.forEach((param) => {
            command.options.push(param);
        });

        return command.toJSON();
    }
    
    /** Adds an attachment option to the command. */
    addAttachParam(
        fn: (param: SlashCommandAttachmentOption) => SlashCommandAttachmentOption
    ): this {
        const param = fn(new SlashCommandAttachmentOption());
        this._params.set(param.name, param);
        return this;
    }

    /** Adds a channel option to the command. */
    addChannelParam(
        fn: (param: SlashCommandChannelOption) => SlashCommandChannelOption
    ): this {
        const param = fn(new SlashCommandChannelOption());
        this._params.set(param.name, param);
        return this;
    }

    /** Adds an integer option to the command. */
    addIntParam(
        fn: (param: SlashCommandIntegerOption) => SlashCommandIntegerOption
    ): this {
        const param = fn(new SlashCommandIntegerOption());
        this._params.set(param.name, param);
        return this;
    }

    /** Adds a mentionable (user/role) option to the command. */
    addMentionableParam(
        fn: (param: SlashCommandMentionableOption) => SlashCommandMentionableOption
    ): this {
        const param = fn(new SlashCommandMentionableOption());
        this._params.set(param.name, param);
        return this;
    }

    /** Adds a number option to the command. */
    addNumberParam(
        fn: (param: SlashCommandNumberOption) => SlashCommandNumberOption
    ): this {
        const param = fn(new SlashCommandNumberOption());
        this._params.set(param.name, param);
        return this;
    }

    /** Adds a role option to the command. */
    addRoleParam(
        fn: (param: SlashCommandRoleOption) => SlashCommandRoleOption
    ): this {
        const param = fn(new SlashCommandRoleOption());
        this._params.set(param.name, param);
        return this;
    }

    /** Adds a string option to the command. */
    addStringParam(
        fn: (param: SlashCommandStringOption) => SlashCommandStringOption
    ): this {
        const param = fn(new SlashCommandStringOption());
        this._params.set(param.name, param);
        return this;
    }

    /** Adds a user option to the command. */
    addUserParam(
        fn: (param: SlashCommandUserOption) => SlashCommandUserOption
    ): this {
        const param = fn(new SlashCommandUserOption());
        this._params.set(param.name, param);
        return this;
    }
}

export { DiscordCommand };
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

class DiscordCommand {
    static list: DiscordCommand[] = [];
    static execute(command_name: string, ...args: any[]): any {
        const command = DiscordCommand.getCommand(command_name);
        if (!command) {
            throw new Error(`Command ${command_name} not found`);
        }
        return command.execute(...args);
    }

    static getCommand(name: string): DiscordCommand | undefined {
        return this.list.find(cmd => cmd.command_name === name);
    } 

    private _params: Map<string, ApplicationCommandOptionBase> = new Map();
    command_name: string = "basecommand";
    command_description: string = "Base command description";
    permissions_required: PermissionFlags[] = [];
    async execute(...args: any[]): Promise<any> {}

    setName(name: string): this {
        this.command_name = name;
        return this;
    }

    setDescription(description: string): this {
        this.command_description = description;
        return this;
    }

    setPermissions(permissions: PermissionFlags[]): this {
        this.permissions_required = permissions;
        return this;
    }

    setExecute(fn: (interaction: ChatInputCommandInteraction, ...args: any[]) => any): this {
        this.execute = fn;
        return this;
    }

    toJSON(): object {
        const command = new SlashCommandBuilder()
            .setName(this.command_name)
            .setDescription(this.command_description);

        this._params.forEach((param) => {
            command.options.push(param);
        });

        return command.toJSON();
    }
    
    addAttachParam(fn: (param: SlashCommandAttachmentOption) => SlashCommandAttachmentOption): this {
        const param = fn(new SlashCommandAttachmentOption());
        this._params.set(param.name, param);
        return this;
    }

    addChannelParam(fn: (param: SlashCommandChannelOption) => SlashCommandChannelOption): this {
        const param = fn(new SlashCommandChannelOption());
        this._params.set(param.name, param);
        return this;
    }

    addIntParam(fn: (param: SlashCommandIntegerOption) => SlashCommandIntegerOption): this {
        const param = fn(new SlashCommandIntegerOption());
        this._params.set(param.name, param);
        return this;
    }

    addMentionableParam(fn: (param: SlashCommandMentionableOption) => SlashCommandMentionableOption): this {
        const param = fn(new SlashCommandMentionableOption());
        this._params.set(param.name, param);
        return this;
    }

    addNumberParam(fn: (param: SlashCommandNumberOption) => SlashCommandNumberOption): this {
        const param = fn(new SlashCommandNumberOption());
        this._params.set(param.name, param);
        return this;
    }

    addRoleParam(fn: (param: SlashCommandRoleOption) => SlashCommandRoleOption): this {
        const param = fn(new SlashCommandRoleOption());
        this._params.set(param.name, param);
        return this;
    }

    addStringParam(fn: (param: SlashCommandStringOption) => SlashCommandStringOption): this {
        const param = fn(new SlashCommandStringOption());
        this._params.set(param.name, param);
        return this;
    }

    addUserParam(fn: (param: SlashCommandUserOption) => SlashCommandUserOption): this {
        const param = fn(new SlashCommandUserOption());
        this._params.set(param.name, param);
        return this;
    }

    constructor() {DiscordCommand.list.push(this)}
    static new(): DiscordCommand {return new this()}
}

export { DiscordCommand };
import { ClientEvents, Events as BaseEvents } from "discord.js";
import { DiscordManager } from "./discordManager";

class DiscordEvent {
    constructor(should_register: boolean = true) {
        this._shouldRegister = should_register
        if(should_register) DiscordManager.events.push(this)
    }
    static new(should_register: boolean = true): DiscordEvent {return new this()}

    static Events = BaseEvents;
    readonly _shouldRegister: boolean = true;
    private _triggersOnce: boolean = false;
    private event: keyof ClientEvents;

    executor(...args: any[]): any {}

    listenFor(event: keyof ClientEvents) {
        this.event = event;
        this._triggersOnce = false;
        return this;
    }

    listenOnceFor(event: keyof ClientEvents) {
        this.event = event;
        this._triggersOnce = true;
        return this;
    }

    setExecute(fn: (...args: any[]) => any) {
        this.executor = fn;
        return this;
    }

    register() {
        if (this._triggersOnce) {
            DiscordManager.client.once(this.event, (...args) => this.executor(...args));
        } else {
            DiscordManager.client.on(this.event, (...args) => this.executor(...args));
        }
    }
}

export { DiscordEvent };
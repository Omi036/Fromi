import { ClientEvents, Events as BaseEvents } from "discord.js";
import { DiscordManager } from "./discordManager";

class DiscordEvent {
    static Events = BaseEvents;
    static list: DiscordEvent[] = [];
    private onlyOnce: boolean = false;
    private event: keyof ClientEvents;

    constructor() {DiscordEvent.list.push(this)}
    static new(): DiscordEvent {return new this()}

    executor(...args: any[]): any {}

    listenFor(event: keyof ClientEvents) {
        this.event = event;
        this.onlyOnce = false;
        return this;
    }

    listenOnceFor(event: keyof ClientEvents) {
        this.event = event;
        this.onlyOnce = true;
        return this;
    }

    setExecute(fn: (...args: any[]) => Promise<any>) {
        this.executor = fn;
        return this;
    }

    register() {
        if (this.onlyOnce) {
            DiscordManager.client.once(this.event, (...args) => this.executor(...args));
        } else {
            DiscordManager.client.on(this.event, (...args) => this.executor(...args));
        }
    }
}

export { DiscordEvent };
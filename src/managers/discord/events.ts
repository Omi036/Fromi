import { ClientEvents, Events as BaseEvents } from "discord.js";
import { DiscordManager } from "./discordManager";

/**
 * Represents a Discord gateway event listener with a fluent API
 * for configuration and registration.
 */
class DiscordEvent {
    /**
     * Creates a new DiscordEvent instance.
     * @param should_register Whether this event should automatically be added to the DiscordManager registry.
     */
    constructor(should_register: boolean = true) {
        this._shouldRegister = should_register
        if(should_register) DiscordManager.events.push(this)
    }

    /**
     * Creates a new DiscordEvent instance.
     * @param should_register Whether this event should automatically be added to the DiscordManager registry.
     */
    static new(should_register: boolean = true): DiscordEvent {return new this()}

    static Events = BaseEvents;
    readonly _shouldRegister: boolean = true;
    private _triggersOnce: boolean = false;
    private event: keyof ClientEvents;

    executor(...args: any[]): any {}

     /**
     * Configure this instance to listen continuously for an event.
     * @param event Discord.js client event name.
     */
    listenFor(event: keyof ClientEvents) {
        this.event = event;
        this._triggersOnce = false;
        return this;
    }

    /**
     * Configure this instance to listen only once for an event.
     * @param event Discord.js client event name.
     */
    listenOnceFor(event: keyof ClientEvents) {
        this.event = event;
        this._triggersOnce = true;
        return this;
    }

    /**
     * Sets the function executed when the event is triggered.
     * @param fn Callback receiving the same arguments as the corresponding discord.js event.
     */
    setExecute(fn: (...args: any[]) => any) {
        this.executor = fn;
        return this;
    }

    /**
     * Registers this event on the Discord client using either
     * `on` or `once` depending on configuration.
     */
    register() {
        if (this._triggersOnce) {
            DiscordManager.client.once(this.event, (...args) => this.executor(...args));
        } else {
            DiscordManager.client.on(this.event, (...args) => this.executor(...args));
        }
    }
}

export { DiscordEvent };
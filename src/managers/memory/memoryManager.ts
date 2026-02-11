import { Manager } from "../../lib/classes/manager";

/**
 * ### MemoryManager
 * Handles storage for runtime global variables. These variables can be accessed from any script.
 */
class MemoryManager extends Manager {
    private static _map = {}
    static init() {}

    /**
     * Stores `value` in the `name` variable.
     * @param {string} name Variable name to store value in
     * @param {any} value Value to store
     */
    static setVar(name: string, value: any) {
        this._map[name] = value
    }

    /**
     * Retrieves a `name` variable value. If it does not exist, it will return `fallback`
     * @param {string} name Variable name to extract value from
     * @param {any?} fallback Value that will be returned if the variable is empty
     * @returns The variable value of the fallback if the value doesnt exist
     */
    static getVar(name: string, fallback?: any){
        return this._map[name] || fallback
    }
}

MemoryManager.init()
export { MemoryManager }
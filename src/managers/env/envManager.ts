import { config } from "dotenv";
import { Manager } from "../../lib/classes/manager";
import process from "process";

/**
 * ### Env Manager
 * Allows the reading/temp-writing of environment variables.  
 * On init it will lookup for the `.env` file on the project root.
 */
class EnvManager extends Manager {
    static init() {
        config({ quiet: true });
    }

    /**
     * Returns the value of the `key` env variable. If it is undefined, it will return the `fallback`
     * @param {string} key Env variable name to return 
     * @param {any} fallback Value that will be returned if the env variable is empty
     * @returns {any} The env variable value or the fallback if the var is empty
     */
    static getEnv(key: string, fallback?: any): any {
        return process.env[key] || fallback;
    }


    /**
     * Sets the value of the `key` env variable to `value`. This value will only be stored during runtime.
     * @param {string} key Env variable name to store 
     * @param {any} value Value that will be stored
     */
    static setEnv(key: string, value: string): void {
        process.env[key] = value;
    }
}

EnvManager.init();
export { EnvManager };
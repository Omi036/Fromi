import { config } from "dotenv";
import { Manager } from "../../lib/classes/manager";
import process from "process";

class EnvManager extends Manager {
    static init() {
        config({ quiet: true });
    }

    static getEnv(key: string, fallback: any): string | undefined {
        return process.env[key] || fallback;
    }

    static setEnv(key: string, value: string): void {
        process.env[key] = value;
    }
}

EnvManager.init();
export { EnvManager };
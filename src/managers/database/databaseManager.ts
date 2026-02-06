import { Manager } from "../../lib/classes/manager";
import { MysqlDriver } from "./drivers/mysqlDriver";

class DatabaseManager extends Manager{
    static init() {}
    static getEnv(varName: string, fallback = undefined): string {return "none"};

    static driver: string
    static host: string
    static user: string
    static password: string
    static database: string

    private static _hasStarted
    static _drivers = {
        [MysqlDriver.DRIVER_NAME]: MysqlDriver,
    }

    static async start() {
        this.driver = this.driver || this.getEnv("DB_DRIVER")

        await this._drivers[this.driver].connect(
            this.host || this.getEnv("DB_HOST"), 
            this.user || this.getEnv("DB_USER"), 
            this.password || this.getEnv("DB_PASSWORD"),
            this.database || this.getEnv("DB_DATABASE")
        );
    }

    static async insertOne(table: string, element: Object): Promise<void> {
        await this._drivers[this.driver].insertOne(table, element)
    }

    static async findOne(table: string, values: Record<string, any>): Promise<any | void> {
        const item = await this._drivers[this.driver].findOne(table, values)
        return item;
    }
}

DatabaseManager.init();
export { DatabaseManager }
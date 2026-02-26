import { Manager } from "../../lib/classes/manager";
import { MysqlDriver } from "./drivers/mysqlDriver";

class DatabaseManager extends Manager{
    static init() {}
    static getEnv(varName: string, fallback = undefined): any {return undefined};

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
        DatabaseManager.driver = DatabaseManager.driver || DatabaseManager.getEnv("DB_DRIVER")

        await this._drivers[this.driver].connect(
            DatabaseManager.host || DatabaseManager.getEnv("DB_HOST"), 
            DatabaseManager.user || DatabaseManager.getEnv("DB_USER"), 
            DatabaseManager.password || DatabaseManager.getEnv("DB_PASSWORD"),
            DatabaseManager.database || DatabaseManager.getEnv("DB_DATABASE")
        );
    }

    static async insertOne(table: string, element: Object): Promise<void> {
        await DatabaseManager._drivers[DatabaseManager.driver].insertOne(table, element)
    }

    static async findOne(table: string, values: Record<string, any>): Promise<any | void> {
        const item = await DatabaseManager._drivers[DatabaseManager.driver].findOne(table, values)
        return item;
    }
}

DatabaseManager.init();
export { DatabaseManager }
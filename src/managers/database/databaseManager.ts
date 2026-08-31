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

    static _drivers = {
        [MysqlDriver.DRIVER_NAME]: MysqlDriver,
    }

    static async start() {
        this.driver = this.driver || this.getEnv("DB_DRIVER")

        if(!this.driver) throw new Error("Tried to start the database without specifying a database driver, specify one by setting DB_DRIVER env variable or set it yourself after initializing the manager.")
        if(!this._drivers[this.driver]) throw new Error(`Tried to start the database with an unknown driver, supported drivers are: ${Object.keys(this._drivers).join(", ")}. If you need a driver that isnt here, you must implement it yourself.`)

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
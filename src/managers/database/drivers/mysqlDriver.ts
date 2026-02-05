import mysql from 'mysql';

class MysqlDriver {
    static readonly DRIVER_NAME: string = "mysql";
    static connection: mysql.Connection;

    static async connect(host: string, user: string, password: string, database: string) {
        this.connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        })
    }

    static async insertOne(table: string, entries: Record<string, any>) {
        const keys = Object.keys(entries)
        const values = Object.values(entries)
        const query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${[...values].fill("?").join(", ")})`

        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (err, res) => {
                if(err) reject(err)
                resolve(res)
            })
        })
    }

    static async findOne(table: string, entry: Record<string, any>){
        const keys = Object.keys(entry);
        const conditions = keys.map(key => `${key} = ?`).join(" AND ");
        const values = keys.map(key => entry[key]);

        const query = `SELECT * FROM ${table} WHERE ${conditions} LIMIT 1`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (err, res) => {
                if(err) reject(err)
                resolve(res)
            })
        })
    }
}

export { MysqlDriver };
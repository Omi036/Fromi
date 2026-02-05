import { DatabaseManager } from "../managers/database/databaseManager"

class User {
    static table: "user"
    static fields: [
        "id",
        "username",
        "password_hash",
        "public_key",
        "created_at"
    ]

    static async createOne(values: Record<string, any>): Promise<void> {
        await DatabaseManager.insertOne(this.table, values)
    }

    static async findOne(values: Record<string, any>): Promise<Object> {
        const item = await DatabaseManager.findOne(this.table, values)
        return item
    }
}
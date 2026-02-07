# Models
## Overview

Models are the objects that link data storage or domain entities to a programmatic interface. They represent structured information, such as users, database entries, or other resources, and provide methods to interact with that data in a clean, consistent way.

## Structure and Philosophy

Models allow developers to interact with data like `User.createOne({...})` or `User.findOne({...})` without worrying about the details of database queries or storage management.

## Example: User Model
```js
import { DatabaseManager } from "../managers/database/databaseManager"

class UserModel  {
    // Table and fields definition
    static table = "user"
    static fields = [
        "id",
        "username",
        "password_hash",
        "public_key",
        "created_at"
    ]

    // Create a new user
    static async createOne(values: Record<string, any>): Promise<void> {
        await DatabaseManager.insertOne(this.table, values)
    }

    // Find a single user
    static async findOne(values: Record<string, any>): Promise<Object | null> {
        const item = await DatabaseManager.findOne(this.table, values)
        return item
    }
}

export { UserModel }

// Usage
await User.createOne({ username: "omi", password_hash: "hash123" })
const user = await User.findOne({ username: "omi" })
```
import { Manager } from "../../lib/classes/manager";
import bcrypt from "bcrypt"

class SecurityManager extends Manager {
    static init() {}
    static salt_rounds = 10

    static async hash(value: string | Buffer): Promise<string>{
        const salt = await bcrypt.genSalt(this.salt_rounds)
        const hashed_value = await bcrypt.hash(value, salt)
        return hashed_value
    }

    static async compareHash(compare: string, hash: string){
        const res = await bcrypt.compare(compare, hash)
        return res
    }
}

SecurityManager.init()

export { SecurityManager };
import bcrypt from "bcrypt"

class BcryptModule {
    static salt_rounds = 10

    static setSaltRounds(rounds: number){
        this.salt_rounds = rounds
    }

    static async hash(value: string | Buffer): Promise<string>{
        const salt = await bcrypt.genSalt(this.salt_rounds)
        const hashed_value = await bcrypt.hash(value, salt)
        return hashed_value
    }

    static async compareHash(compare: string, hash: string): Promise<boolean>{
        const res = await bcrypt.compare(compare, hash)
        return res
    }
}

export { BcryptModule } 
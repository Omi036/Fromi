import { Manager } from "../../lib/classes/manager";
import { AESModule } from "./aes";
import { BcryptModule } from "./bcrypt";
import { GPGModule } from "./gpg";
import { JWTModule } from "./jwt";

class SecurityManager extends Manager {
    static init() {}
    static getEnv(varName: string, fallback = undefined): any {return fallback};
    
    static Bcrypt = BcryptModule
    static AES = AESModule
    static GPG = GPGModule
    static JWT = JWTModule
}

SecurityManager.init()

export { SecurityManager };
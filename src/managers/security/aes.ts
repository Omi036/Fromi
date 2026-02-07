import crypto from 'crypto';
import { hasFields } from '../../lib/utils/fields';

class AESPayload {
    constructor(iv: string, content: string, tag: string){
        this.iv = iv
        this.content = content
        this.tag = tag
    }

    iv: string
    content: string
    tag: string

    toJSON(): { iv: string, content: string, tag: string} {
        return {
          iv: this.iv,
          content: this.content,
          tag: this.tag
        };
    }

    static fromJSON(obj: any): AESPayload {
        if(!hasFields(obj, ["iv", "content", "tag"])){
            throw new Error("Invalid AESPayload structure");
        }

        return new AESPayload(obj.iv, obj.content, obj.tag);
    }

    toString(): string {
        return JSON.stringify(this.toJSON());
    }

    static fromString(str): AESPayload {
        const parts = str.split(':');
        if (parts.length !== 3) {
            throw new Error("Invalid AESPayload string format");
        }

        const [iv, content, tag] = parts;
        return new AESPayload(iv, content, tag);
    }
}

class AESModule {
    static readonly _algorithm = "aes-256-gcm"
    static readonly _ivBytes = 12

    static encrypt(key: crypto.CipherKey, text: string): AESPayload {
        const iv = crypto.randomBytes(this._ivBytes)
        const cipher = crypto.createCipheriv(this._algorithm, key, iv)

        const encrypted = Buffer.concat([
            cipher.update(text, "utf-8"),
            cipher.final()
        ])

        const authTag = cipher.getAuthTag()

        return new AESPayload(
            iv.toString("hex"), 
            encrypted.toString("hex"),
            authTag.toString("hex")
        )
    }


    static decrypt(key: crypto.CipherKey, payload: AESPayload): string {
        const decipher = crypto.createDecipheriv(
            this._algorithm,
            key,
            Buffer.from(payload.iv, "hex")
        )

        decipher.setAuthTag(Buffer.from(payload.tag, "hex"))

        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(payload.content, 'hex')),
            decipher.final()
        ])

        return decrypted.toString("utf-8")
    }
}

export { AESModule, AESPayload }
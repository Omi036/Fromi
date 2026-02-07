import openpgp from "openpgp"

class GPGModule {

    static async generateKeys( users: { name: string; email?: string; comment?: string }[], passphrase?: string) {
        return openpgp.generateKey({
            type: "rsa",
            rsaBits: 4096,
            userIDs: users,
            passphrase: passphrase
        })
    }

    static async crypt(content: string, publicKeyArmored: string) {
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored })

        const message = await openpgp.createMessage({ text: content })

        return openpgp.encrypt({
            message,
            encryptionKeys: publicKey
        })
    }

    static async decrypt(crypted: string, privateKeyArmored: string, passphrase?: string): Promise<string> {
        const pk = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored })

        const privateKey = passphrase
            ? await openpgp.decryptKey({ privateKey: pk, passphrase })
            : pk

        const message = await openpgp.readMessage({ armoredMessage: crypted })
        const { data } = await openpgp.decrypt({ message, decryptionKeys: privateKey})

        return data as string
    }

    static async sign(content: string, privateKeyArmored: string, passphrase?: string) {
        const pk = await openpgp.readPrivateKey({armoredKey: privateKeyArmored })

        const privateKey = passphrase
            ? await openpgp.decryptKey({ privateKey: pk, passphrase })
            : pk

        const message = await openpgp.createMessage({ text: content })

        return openpgp.sign({message, signingKeys: privateKey})
    }

    static async verifySign(signed: string, publicKeyArmored: string): Promise<boolean> {
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored })
        const message = await openpgp.readMessage({ armoredMessage: signed})
        const verification = await openpgp.verify({message, verificationKeys: publicKey})

        return await verification.signatures[0].verified
    }

    static async encryptAndSign(content: string, publicKeyArmored: string, privateKeyArmored: string, passphrase?: string): Promise<string> {
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored })
        const pk = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored })

        const privateKey = passphrase
          ? await openpgp.decryptKey({ privateKey: pk, passphrase: passphrase })
          : pk

        const message = await openpgp.createMessage({ text: content })

        return openpgp.encrypt({
          message,
          encryptionKeys: publicKey,
          signingKeys: privateKey
        })
    }

    static async validatePublicKey(publicKeyArmored: string): Promise<boolean> {
        try {
            const key = await openpgp.readKey({ armoredKey: publicKeyArmored })

            if (await key.isRevoked()) return false

            const expiration = await key.getExpirationTime()
            if (expiration && expiration < new Date()) return false

            return true
        } catch (err) { return false }
    }
}

export { GPGModule }
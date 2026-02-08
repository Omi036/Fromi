# Security Manager
## Overview

**Description**: Provides security features.
**In** `src/managers/security/securityManager.ts`  
**On Init:** None  
**Variables:**  
| variable | default | property | description |
| - | - | - | - |
| JWT Expiration | JWT_EXPIRES | - | Duration of JWT Tokens (in seconds)
| JWT Secret | JWT_SECRET | - | Secret (atleast 256bits) for JWT Tokens |  

**Provides**:
```js
// Hashes texts
SecurityManager.Bcrypt.hash(value: string | Buffer): Promise<string>
// Compares a text and a hash
SecurityManager.Bcrypt.compareHash(compare: string, hash: string): Promise<boolean>

// Encrypts a text using key via AES-256-gcm
SecurityManager.AES.encrypt(key: string, text: key): AESPayload
// Decrypts an AES payload
SecurityManager.AES.decrypt(key: string, payload: AESPayload): string

// Generates a par of GPG keys
SecurityManager.GPG.generateKeys(users: ..., passphrase?: string): {privateKey: string, publicKey: string, revocationCertificate: string}
// Crypts a message using the public key
SecurityManager.GPG.crypt(content: string, publicKey: string): Promise<string>
// Decrypts a message using the private key
SecurityManager.GPG.decrypt(content: string, privateKey: string, passphrase?: string): Promise<string>
// Signs a content with the private key
SecurityManager.GPG.sign(content: string, privateKey: string, passphrase?: string): Promise<string>
// Checks if a token is verified correctly
SecurityManager.GPG.verifySign(signed: string, publicKeyArmored: string): Promise<boolean>
// Encrypts and signs a message
SecurityManager.GPG.encryptAndSign(content: string, publicKeyArmored: string, privateKeyArmored: string, passphrase?: string): Promise<string>

// Creates a token with payload. ExpiresIn and jwt secret are specified on .env by default
SecurityManager.JWT.signToken(payload: any, expiresIn?: number, jwtSecret?: string): string
// Cheks if token is valid
SecurityManager.JWT.isTokenValid(token: string, jwtSecret?: string): boolean
// Gets payload from token
SecurityManager.JWT.getPayload(token: string, jwtSecret?: string): any
```

<br/>

### Fields
#### Methods
[`Bcrypt.hash()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-bcrypt-hash-value-string-buffer-promise-string)  
[`Bcrypt.compareHash()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-bcrypt-comparehash-compare-string-hash-string-promise-boolean)  
[`AES.encrypt()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-aes-encrypt-key-string-text-string-aespayload)  
[`AES.decrypt()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-aes-decrypt-key-string-payload-aespayload-string)  
[`GPG.generateKeys()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-gpg-generatekeys-privatekey-string-publickey-string-revocationcertificate-string)  
[`GPG.crypt()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-gpg-crypt-content-string-publickey-string-promise-string)  
[`GPG.decrypt()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-gpg-decrypt-content-string-privatekey-string-passphrase-string-promise-string)  
[`GPG.sign()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-gpg-sign-content-string-privatekey-string-passphrase-string-promise-string)  
[`GPG.verifySign()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-gpg-verifysign-signed-string-publickeyarmored-string-promise-boolean)  
[`GPG.encryptAndSign()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-gpg-encryptandsign-promise-string)  
[`JWT.signToken()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-jwt-signtoken-payload-any-expiresin-number-jwtsecret-string-string)  
[`JWT.isTokenValid()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-jwt-istokenvalid-token-string-jwtsecret-string-boolean)  
[`JWT.getPayload()`](https://fromi.readthedocs.io/en/latest/managers/Security.html#securitymanager-jwt-getpayload-token-string-jwtsecret-string-any)  

#### Exports
`SecurityManager`

<br/>

### Docs
#### Methods

#### `SecurityManager.Bcrypt.hash(value: string | Buffer): Promise<string>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Hashes a text using bcrypt.

#### `SecurityManager.Bcrypt.compareHash(compare: string, hash: string): Promise<boolean>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Compares a text with a bcrypt hash.

#### `SecurityManager.AES.encrypt(key: string, text: string): AESPayload`  
 &nbsp;&nbsp;&nbsp;&nbsp; Encrypts a text using AES-256-gcm.

#### `SecurityManager.AES.decrypt(key: string, payload: AESPayload): string`  
 &nbsp;&nbsp;&nbsp;&nbsp; Decrypts an AES payload.

#### `SecurityManager.GPG.generateKeys(...): {privateKey: string, publicKey: string, revocationCertificate: string}`  
 &nbsp;&nbsp;&nbsp;&nbsp; Generates a pair of GPG keys.

#### `SecurityManager.GPG.crypt(content: string, publicKey: string): Promise<string>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Encrypts a message using the public key.

#### `SecurityManager.GPG.decrypt(content: string, privateKey: string, passphrase?: string): Promise<string>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Decrypts a message using the private key.

#### `SecurityManager.GPG.sign(content: string, privateKey: string, passphrase?: string): Promise<string>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Signs a content with the private key.

#### `SecurityManager.GPG.verifySign(signed: string, publicKeyArmored: string): Promise<boolean>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Verifies if a signed message is valid.

#### `SecurityManager.GPG.encryptAndSign(...): Promise<string>`  
 &nbsp;&nbsp;&nbsp;&nbsp; Encrypts and signs a message.

#### `SecurityManager.JWT.signToken(payload: any, expiresIn?: number, jwtSecret?: string): string`  
 &nbsp;&nbsp;&nbsp;&nbsp; Creates a JWT token with payload.

#### `SecurityManager.JWT.isTokenValid(token: string, jwtSecret?: string): boolean`  
 &nbsp;&nbsp;&nbsp;&nbsp; Checks if token is valid.

#### `SecurityManager.JWT.getPayload(token: string, jwtSecret?: string): any`  
 &nbsp;&nbsp;&nbsp;&nbsp; Gets payload from token.
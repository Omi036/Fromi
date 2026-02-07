import { SecurityManager } from "./securityManager";
import jwt from "jsonwebtoken"

class JWTModule {
    static signToken(payload: any, expiresIn?: number, jwtSecret?: string): string {
        expiresIn = expiresIn || SecurityManager.getEnv("JWT_EXPIRES", "4h")
        jwtSecret = jwtSecret || SecurityManager.getEnv("JWT_SECRET")

        if (!payload || typeof payload !== 'object') {
            throw new Error('Payload must be a non-empty object');
        }

        const token = jwt.sign(payload, jwtSecret, { expiresIn: expiresIn });
        return token;
    }

    static isTokenValid(token: string, jwtSecret?: string): boolean {
        try {
            jwt.verify(token, jwtSecret);
            return true;
        } catch (err) {
            return false
        }
    }


    // Alias
    static getPayload(token: string, jwtSecret?: string): string | jwt.JwtPayload | -1 { 
        return this.verifyToken(token, jwtSecret) 
    }

    static verifyToken(token: string, jwtSecret?: string): string | jwt.JwtPayload | -1 {
        jwtSecret = jwtSecret || SecurityManager.getEnv("JWT_SECRET")

        if (!token || !this.isTokenValid(token, jwtSecret)) return -1

        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    }


    static decodeToken(token: string) {
        if (!token) return null;

        try {
            const decoded = jwt.decode(token);
            return decoded;
        } catch (err) {
            return null;
        }
    }
}

export { JWTModule }
import { SecurityManager } from "./securityManager";
import jwt from "jsonwebtoken"

class JWTModule {
    static signToken(payload: any, expiresIn?: number | string, jwtSecret?: string): string {
        const resolvedExpiresIn = expiresIn ?? SecurityManager.getEnv("JWT_EXPIRES", "4h");
        const resolvedSecret = jwtSecret ?? SecurityManager.getEnv("JWT_SECRET");

        if (!resolvedSecret) {
            throw new Error('JWT secret is not configured');
        }

        if (!payload || typeof payload !== 'object') {
            throw new Error('Payload must be a non-empty object');
        }

        const token = jwt.sign(payload, resolvedSecret, { expiresIn: resolvedExpiresIn });
        return token;
    }

    static isTokenValid(token: string, jwtSecret?: string): boolean {
        const resolvedSecret = jwtSecret ?? SecurityManager.getEnv("JWT_SECRET");

        if (!resolvedSecret) {
            return false;
        }

        try {
            jwt.verify(token, resolvedSecret);
            return true;
        } catch (err) {
            return false;
        }
    }


    // Alias
    static getPayload(token: string, jwtSecret?: string): string | jwt.JwtPayload | -1 { 
        return this.verifyToken(token, jwtSecret) 
    }

    static verifyToken(token: string, jwtSecret?: string): string | jwt.JwtPayload | -1 {
        const resolvedSecret = jwtSecret ?? SecurityManager.getEnv("JWT_SECRET");

        if (!resolvedSecret || !token || !this.isTokenValid(token, resolvedSecret)) return -1;

        const decoded = jwt.verify(token, resolvedSecret);
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
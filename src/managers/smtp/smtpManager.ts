import { Manager } from "../../lib/classes/manager";
import nodemailer from "nodemailer";

class SMTPManager extends Manager {
    static getEnv(varName: string, fallback = undefined): any {return undefined};

    static transport: any
    static from: string = ""

    static init(host?: string, port?: number, user?: string, password?: string) {
        this.from = user || this.getEnv("SMTP_USER") || ""
        this.transport = nodemailer.createTransport({
            host: host || this.getEnv("SMTP_HOST"),
            port: port || this.getEnv("SMTP_PORT"),
            secure: (port || this.getEnv("SMTP_PORT")) === 465, // true for 465, false for other ports
            auth: {
                user: user || this.getEnv("SMTP_USER"),
                pass: password || this.getEnv("SMTP_PASSWORD"),
            },
        });
    }

    static async sendMail(to: string, subject: string, text: string, html?: string) {
        if(!this.transport) throw new Error("SMTPManager not initialized, call SMTPManager.init() before sending emails.")

        const mailOptions = {from: this.from, to, subject, text, html };
        const info = await this.transport.sendMail(mailOptions);
        return info;
    }
}

export { SMTPManager }
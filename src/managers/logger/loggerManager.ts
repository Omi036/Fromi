import { Manager } from "../../lib/classes/manager";
import winston from 'winston';
import {format} from "winston"
import Transport from 'winston-transport';
import 'winston-daily-rotate-file';

const Colors = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    verbose: "\x1b[43m",
    reset: "\x1b[0m",
    grey: "\x1b[90m",
    debug: "\x1b[35m"
};

const dailyRotateFile = new winston.transports.DailyRotateFile({
    filename: 'logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

function getFormattedDate(): string {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}


const log4jFormat = format.printf(({ level, message, timestamp }) => {
    let text = typeof message === "string" ? message : JSON.stringify(message, null, 2);
    text = text.replace(/\x1b\[[0-9;]*m/g, "");
    return `${timestamp} [${level.toUpperCase()}] ${text}`;
});

class ConsoleTransport extends Transport {
    constructor(){super()}

    public log(info: any, callback: () => void) {
        const { level, message, stack } = info;
        console.log(
                `${Colors[level]}[${level.toUpperCase()}] [${getFormattedDate()}] ${Colors.reset}${message}`,
                stack ? "\n" + stack : ""
            )
        if (callback) {
            callback();
        }
    }

    public info(info: any, callback: () => void) {
        this.log(info, callback);
    }
}

class LoggerManager extends Manager {
    static logger_info: winston.Logger;
    static console_info: winston.Logger;
    static debug_mode: boolean = false;

    static init() {
        LoggerManager.logger_info = winston.createLogger({
            level: "debug",
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                log4jFormat
            ),
            transports: [dailyRotateFile],
        });

        LoggerManager.console_info = winston.createLogger({
            level: 'debug',
            format: winston.format.simple(),
            transports: [new ConsoleTransport()],
        });
    }

    private static _sendMessage(message: string, level: string, section = ""){
        message = `${Colors.grey}${section? `[${section}] ` : ""}${Colors.reset}${message}`;

        this.logger_info[level](message)
        this.console_info[level](message)
    }

    static info(message: string, section?: string) {
        this._sendMessage(message, "info", section)
    }

    static debug(message: string, section?: string){
        if(!this.debug_mode) return
        this._sendMessage(message, "debug", section)
    }

    static error(message: string, section?: string){
        this._sendMessage(message, "error", section)
    }

    static warn(message: string, section?: string){
        this._sendMessage(message, "warn", section)
    }

    static raw(message: any) {
        console.log(message);
    }
}

LoggerManager.init();
export { LoggerManager };
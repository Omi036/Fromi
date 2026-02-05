import { LoggerManager } from "./managers/logger/loggerManager";
import { EnvManager } from "./managers/env/envManager";
import { DatabaseManager } from "./managers/database/databaseManager";
import { SocketManager } from "./managers/socket/socketManager";
import { HTTPManager } from "./managers/http/httpManager";
import { APIManager } from "./managers/api/apiManager";
import { importFromFolder } from "./lib/utils/filing";
import * as path from 'path';

async function main(){
    // Pre configs
    LoggerManager.debug_mode = true;
    DatabaseManager.getEnv = EnvManager.getEnv

    // Start services
    DatabaseManager.start()

    // Configs api and websockets
    HTTPManager.handle(APIManager.Handler)
    HTTPManager.handle(SocketManager.Handler)
    HTTPManager.createServer()
    HTTPManager.listen()

    // Registers every Route inside ./routes/api/ and /routes/ws
    importFromFolder(path.join(__dirname, "routes", "api"))
    importFromFolder(path.join(__dirname, "routes", "ws"))

    LoggerManager.info("Application started");
}

main()
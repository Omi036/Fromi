import { createServer } from "http";
import { Server as HTTPServer } from "http";
import { Server as IOServer, Socket } from "socket.io";


class SocketManager {
    static init(){}

    private static _hasStarted: boolean
    private static _httpServer: HTTPServer
    private static _ioServer: IOServer

    static Handler = {
        type: "postembedded",
        handler: (server: HTTPServer) => {
            this._httpServer = server
            this.start()
        }
    }

    static async start(){
        if(this._hasStarted) return
        this._hasStarted = true
        this._ioServer = new IOServer(this._httpServer, {});
    }

    static async emit(channel: string, message: any){

    }

    static onClientConnection: (socket: Socket) => void = function(socket){}
}

SocketManager.init
export { SocketManager }
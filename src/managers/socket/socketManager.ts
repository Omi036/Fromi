import { Server as HTTPServer } from "http";
import { DefaultEventsMap, ExtendedError, Server as IOServer, Socket } from "socket.io";

type MiddlewareFunction = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError) => void
) => void;


class SocketChannel {
    constructor(channel, fallback: (socket: Socket, ...args) => void, connectOnJoin = true){
        this.channel = channel
        this.fallback = fallback
        this.connectOnJoin = true

        SocketManager.addChannel(this)
    }

    // Alias
    static new(channel, fallback: (socket: Socket, ...args) => void, connectOnJoin = true){
        return new SocketChannel(channel, fallback, connectOnJoin)
    }

    appendToSocket(socket: Socket){
        socket.on(this.channel, (...args) => this.fallback(socket, ...args))
    }

    channel: string
    connectOnJoin: boolean
    fallback: (socket: Socket, ...args) => void
}

class SocketMiddleware {
    constructor(handleFunction: MiddlewareFunction){
        this.handle = handleFunction
        SocketManager.use(this)
    }

    handle: MiddlewareFunction
}


class SocketManager {
    static init(){}

    private static _hasStarted: boolean
    private static _httpServer: HTTPServer
    private static _ioServer: IOServer

    private static _middlewares: Array<SocketMiddleware> = []
    private static _channels: Array<SocketChannel> = []

    static Handler = {
        type: "postembedded",
        handler: (server: HTTPServer) => {
            SocketManagerhis._httpServer = server
            SocketManager.start()
        }
    }

    static async start(){
        if(SocketManager._hasStarted) return
        SocketManager._hasStarted = true
        SocketManager._ioServer = new IOServer(SocketManager._httpServer, {});

        SocketManager._ioServer.on("connection", (socket: Socket) => {
            for(const channel of SocketManager._channels){
                if(!channel.connectOnJoin) return
                socket.on(channel.channel, (...args) => channel.fallback(socket, ...args))
            }
            SocketManager.onClientConnection(socket);
        })

        for(const middleware of SocketManager._middlewares){
            SocketManager._ioServer.use(middleware.handle)
        }
    }

    static use(middleware: SocketMiddleware){
        SocketManager._middlewares.push(middleware)

        if(SocketManager._hasStarted) {
            SocketManager._ioServer.use(middleware.handle)
        }
    }

    static async addChannel(channel: SocketChannel){
        SocketManager._channels.push(channel)
    }

    static async emit(channel: string, ...args){
        if(!SocketManager._hasStarted) return

        SocketManager._ioServer.emit(channel, ...args)
    }

    static onClientConnection: (socket: Socket) => void = function(socket){}
}

SocketManager.init
export { SocketManager, SocketMiddleware, SocketChannel }
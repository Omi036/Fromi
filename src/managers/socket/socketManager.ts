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
            this._httpServer = server
            this.start()
        }
    }

    static async start(){
        if(this._hasStarted) return
        this._hasStarted = true
        this._ioServer = new IOServer(this._httpServer, {});

        this._ioServer.on("connection", (socket: Socket) => {
            for(const channel of this._channels){
                if(!channel.connectOnJoin) return
                socket.on(channel.channel, (...args) => channel.fallback(socket, ...args))
            }
            this.onClientConnection(socket);
        })

        for(const middleware of this._middlewares){
            this._ioServer.use(middleware.handle)
        }
    }

    static use(middleware: SocketMiddleware){
        this._middlewares.push(middleware)

        if(this._hasStarted) {
            this._ioServer.use(middleware.handle)
        }
    }

    static async addChannel(channel: SocketChannel){
        this._channels.push(channel)
    }

    static async emit(channel: string, ...args){
        if(!this._hasStarted) return

        this._ioServer.emit(channel, ...args)
    }

    static onClientConnection: (socket: Socket) => void = function(socket){}
}

SocketManager.init
export { SocketManager, SocketMiddleware, SocketChannel }
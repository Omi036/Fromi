import { Manager } from "../../lib/classes/manager";
import { createServer, Server as HTTPServer, IncomingMessage, RequestListener, ServerResponse } from "http";

interface IHandler {
    type: "preembedded" | "postembedded"
    handler: any
}

class HTTPManager extends Manager {
    static async init(){}

    private static _hasStarted: boolean;
    static Server: HTTPServer;

    private static _pre_handlers: Array<RequestListener<typeof IncomingMessage, typeof ServerResponse>> = []
    private static _post_handlers: Array<(server: HTTPServer) => any> = []

    static createServer(): HTTPServer {
        if(this._hasStarted) return this.Server
        this._hasStarted = true

        this.Server = createServer((req, res) => {
            for(const handler of this._pre_handlers){
                handler(req, res);
            }
        })

        for(const handler of this._post_handlers) {
            handler(this.Server)
        }

        return this.Server
    }

    static handle(handler: IHandler | any){
        const type = handler.type
        const handle = handler.handler

        if(type == "preembedded"){
            this._pre_handlers.push(handle)
        } else if(type == "postembedded") {
            this._post_handlers.push(handle)
        }
    }

    static listen(port: number = 3000, hostname: string = "0.0.0.0"){
        this.Server.listen(port , hostname)
    }
}

HTTPManager.init()
export { HTTPManager }
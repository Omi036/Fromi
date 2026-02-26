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
        if(HTTPManager._hasStarted) return HTTPManager.Server
        HTTPManager._hasStarted = true

        HTTPManager.Server = createServer((req, res) => {
            for(const handler of HTTPManager._pre_handlers){
                handler(req, res);
            }
        })

        for(const handler of HTTPManager._post_handlers) {
            handler(HTTPManager.Server)
        }

        return HTTPManager.Server
    }

    static handle(handler: IHandler | any){
        const type = handler.type
        const handle = handler.handler

        if(type == "preembedded"){
            HTTPManager._pre_handlers.push(handle)
        } else if(type == "postembedded") {
            HTTPManager._post_handlers.push(handle)
        }
    }

    static listen(port: number = 3000, hostname: string = "0.0.0.0"){
        HTTPManager.Server.listen(port , hostname)
    }
}

HTTPManager.init()
export { HTTPManager }
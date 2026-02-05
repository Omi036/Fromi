import { Manager } from "../../lib/classes/manager";
import { Express as APIServer, NextFunction, Request, Response} from "express";
import { ParsedQs } from "qs";
import express from "express"

enum Protocol {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
    HEAD = "head"
}

type ProtocolValues = `${Protocol}`;
type ApiRequest = Request<{}, any, any, ParsedQs, Record<string, any>>;
type ApiResponse = Response<any, Record<string, any>>
type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

class APIMiddleware {
    constructor(handle: ExpressMiddleware){
        this.handle = handle
    }

    handle: ExpressMiddleware
}

class APIRoute {
    method: ProtocolValues
    route: string
    callback: (req: ApiRequest, res: ApiResponse) => void

    constructor(method: ProtocolValues, route: string, callback: (req: ApiRequest, res: ApiResponse) => void){
        this.method = method
        this.route = route
        this.callback = callback
        APIManager.addRoute(this)
    }

    // alias
    static new(method: ProtocolValues, route: string, callback: (req: ApiRequest, res: ApiResponse) => void) {
        return new APIRoute(method, route, callback)
    }


    append(server: APIServer){
        server[this.method](this.route, this.callback)
    }
}


class APIManager extends Manager {
    static init(){}
    
    private static _hasStarted: boolean
    private static _apiServer: APIServer
    private static _routes: Array<APIRoute> = []
    private static _middlewares: Array<APIMiddleware> = []

    static Handler = {
        type: "preembedded",
        handler: (req, res) => {
            this.start()
            this._apiServer(req, res)
        }
    }

    static start(){
        if(this._hasStarted) return
        this._hasStarted = true
        this._apiServer = express()
        this._apiServer.use()

        for(const route of this._routes){
            route.append(this._apiServer)
        }

        for(const middleware of this._middlewares){
            this._apiServer.use(middleware.handle)
        }
    }

    static addRoute(route: APIRoute){
        this._routes.push(route)

        if(this._hasStarted){ route.append(this._apiServer) }
    }

    static use(middleware: APIMiddleware){
        this._middlewares.push(middleware)

        if(this._hasStarted) {
            this._apiServer.use(middleware.handle)
        }
    }
}


APIManager.init()
export { APIManager, APIRoute, ApiRequest, ApiResponse }
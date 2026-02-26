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

    static useJson = true

    static Handler = {
        type: "preembedded",
        handler: (req, res) => {
            APIManager.start()
            APIManager._apiServer(req, res)
        }
    }

    static start(){
        if(APIManager._hasStarted) return
        APIManager._hasStarted = true
        APIManager._apiServer = express()

        APIManager.useJson && APIManager._apiServer.use(express.json())

        for(const middleware of APIManager._middlewares){
            APIManager._apiServer.use(middleware.handle)
        }

        for(const route of APIManager._routes){
            route.append(APIManager._apiServer)
        }
    }

    static addRoute(route: APIRoute){
        APIManager._routes.push(route)

        if(APIManager._hasStarted){ route.append(APIManager._apiServer) }
    }

    static use(middleware: APIMiddleware){
        APIManager._middlewares.push(middleware)

        if(APIManager._hasStarted) {
            APIManager._apiServer.use(middleware.handle)
        }
    }
}


APIManager.init()
export { APIManager, APIRoute, ApiRequest, ApiResponse }
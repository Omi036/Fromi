import { Manager } from "../../lib/classes/manager";
import { Express as APIServer, Request, Response} from "express";
import { ParsedQs } from "qs";
import app from "express"

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


class Route {
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
        return new Route(method, route, callback)
    }


    append(server: APIServer){
        server[this.method](this.route, this.callback)
    }
}


class APIManager extends Manager {
    static init(){}
    
    private static _hasStarted: boolean
    private static _apiServer: APIServer
    private static _routes: Array<Route> = []

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
        this._apiServer = app()

        for(const route of this._routes){
            route.append(this._apiServer)
        }
    }

    static addRoute(route: Route){
        this._routes.push(route)

        if(this._hasStarted){ route.append(this._apiServer) }
    }
}


APIManager.init()
export { APIManager, Route, ApiRequest, ApiResponse }
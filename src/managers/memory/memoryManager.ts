import { Manager } from "../../lib/classes/manager";

class MemoryManager extends Manager {
    private static _map = {}
    static init() {}

    static setVar(name: string, value: any) {
        this._map[name] = value
    }

    static getVar(name: string, fallback?: any){
        return this._map[name] || fallback
    }
}

MemoryManager.init()
export { MemoryManager }
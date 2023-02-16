import {EventEmitter} from 'events'
import GleeAdapter from './adapter';
import {AsyncAPIDocument, Server} from '@asyncapi/parser'



type AdapterRecord = {
    Adapter: typeof GleeAdapter,
    instance?: GleeAdapter,
    serverName: string,
    server: Server,
    parsedAsyncAPI: AsyncAPIDocument,
  }

export default class Glee extends EventEmitter {
    private _adapters: Array<AdapterRecord> = []

    addAdapter(Adapter: typeof GleeAdapter, {serverName, server, parsedAsyncAPI}: {serverName: string, server: Server, parsedAsyncAPI: AsyncAPIDocument}) {
        this._adapters.push({Adapter, serverName, server, parsedAsyncAPI})
    }

    async connect(): Promise<any[]> {
        const promises = []
        this._adapters.forEach(a => {
            a.instance = new a.Adapter(this, a.serverName, a.server, a.parsedAsyncAPI)
            promises.push(a.instance.connect())
        })
        return Promise.all(promises)
    }

    get adapter() {
        return this._adapters
    }
}
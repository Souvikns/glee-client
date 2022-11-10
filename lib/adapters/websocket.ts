import Adapter from "../adater";
import Ws from 'ws';

export default class WebsocketAdapter extends Adapter{

    connect(): void {
        this._connect()
    }
    private _connect() {
        const server = this.parsedAsyncAPI.server(this.serverName)
        
    }

}
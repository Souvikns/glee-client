import Glee from "./glee";

interface FunctionStore {
    channel: string,
    fn: Function
}
export default class AsyncAPIClient {
    private _glee: Glee
    private _functionStore: Array<FunctionStore>
    constructor(glee: Glee) {
        this._glee = glee

        this._glee.on('message', (message) => {
            const conn = this._functionStore.find(message.channel)
            conn.fn(message.payload)
        })
    }

    on(channel: string, fn: Function) {
        this._functionStore.push({channel, fn})
    }
    
}
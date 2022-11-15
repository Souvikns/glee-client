import Adapter from "../adapter"


export default class WebsocketAdapter extends Adapter {
    name(): string {
        return 'websocket'
    }
}
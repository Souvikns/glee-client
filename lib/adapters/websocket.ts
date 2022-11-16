import Adapter from "../core/adapter";

export default class WebsocketAdapter extends Adapter {
  name(): string {
    return "WebSocket Adapter";
  }

  async connect(): Promise<void> {
    await this._connect();
  }

  private async _connect() {}
}

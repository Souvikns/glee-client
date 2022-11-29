import GleeBrowser from "./core/glee";
import { parseAsyncAPISpec } from "./utils";
import WebsocketAdapter from "./adapters/websocket";

export default class App {
  private _glee: GleeBrowser;
  private _onMessageFunc: Function;
  constructor(glee: GleeBrowser) {
    this._glee = glee;
    this._glee.listen();
    this._glee.on("message", (message) => {
      this._onMessageFunc(message);
    });
  }

  static async create(asyncapiSpec: string, config: any) {
    const { parsedSpec } = await parseAsyncAPISpec(asyncapiSpec);
    const glee = new GleeBrowser();
    const serverNames = parsedSpec.serverNames();
    for (const serverName of serverNames) {
      const server = parsedSpec.server(serverName);
      const protocol = server.protocol();
      if (["ws", "wss"].includes(protocol)) {
        glee.addAdapter(WebsocketAdapter, {
          serverName: serverName,
          server,
          parsedAsyncAPI: parsedSpec,
        });
      }
    }
    glee.listen()
    const app = new App(glee);
    return app;
  }

  onMessage(fn: Function) {
    this._onMessageFunc = fn;
  }

  send(message) {
    this._glee.emit("send", message);
  }
}

import GleeBrowser from "./core/glee";
import { parseAsyncAPISpec } from "./utils";
import WebsocketAdapter from "./adapters/websocket";
import GleeAdapter from "./core/adapter";

export default class App {
  private _glee: GleeBrowser;
  private _onMessageFunc: Function;
  private _AdapterInstance: Array<GleeAdapter>
  constructor(glee: GleeBrowser, adapterInstance: Array<GleeAdapter>) {
    this._glee = glee;
    this._AdapterInstance = adapterInstance;
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
    const conns = await glee.listen()
    const app = new App(glee, conns);
    return app;
  }

  onMessage(fn: Function) {
    this._onMessageFunc = fn;
  }

  send(message) {
    const channel = message.channel;
    if (this._AdapterInstance[0].channelNames.includes(channel)) {
      this._AdapterInstance[0].send(message)
    }
  }
}

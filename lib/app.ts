import GleeBrowser from "./core/glee";
import { parseAsyncAPISpec } from "./utils";
import WebsocketAdapter from "./adapters/websocket";
import GleeAdapter from "./core/adapter";

export async function createAsyncapiClient(asyncapiSpec: string, config: any) {
  const { parsedSpec, error } = await parseAsyncAPISpec(asyncapiSpec);
  if (error) throw error;
  const serverNames = parsedSpec.serverNames();
  const glee = new GleeBrowser();
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
  const app = new App(glee);
  return app;
}

export default class App {
  private _glee: GleeBrowser;
  private _onMessageFunc: Function;
  private _AdapterInstance: Array<GleeAdapter>;
  constructor(glee: GleeBrowser) {
    this._glee = glee;
    this._glee.on("message", (message) => {
      this._onMessageFunc(message);
    });
  }

  async connect(){
    this._AdapterInstance = await this._glee.listen()
  }

  onMessage(fn: Function) {
    this._onMessageFunc = fn;
  }

  async send(message) {
    console.log(this._AdapterInstance)
    // const channel = message.channel;
    // if (this._AdapterInstance[0].channelNames.includes(channel)) {
    //   this._AdapterInstance[0].send(message);
    // }
  }
}

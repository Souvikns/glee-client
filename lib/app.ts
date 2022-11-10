import { AsyncAPIDocument } from "@asyncapi/parser";
import WebsocketAdapter from "./adapters/websocket";
import GleeClient from "./glee";
import { IGleeMessageObject, IGleeOnMessageFunction } from "./types";

export default class App {
  private gleeClient: GleeClient;
  private onMessageFunction: IGleeOnMessageFunction;
  private resolvedAsyncAPI: AsyncAPIDocument;
  constructor(resolvedAsncAPI: AsyncAPIDocument) {
    this.resolvedAsyncAPI = resolvedAsncAPI;
    this.gleeClient = new GleeClient(resolvedAsncAPI);
    this.gleeClient.on("message", (message) => this.onMessageFunction(message));
  }

  async registerAdapters() {
    let servers;
    if (this.resolvedAsyncAPI.hasServers()) {
      servers = this.resolvedAsyncAPI.serverNames;
    }
    servers.forEach((server) => {
      const protocol = this.resolvedAsyncAPI.server(server).protocol();
      if (["ws", "wss"].includes(protocol)) {
        this.gleeClient.addAdapter(
          new WebsocketAdapter(server, this.resolvedAsyncAPI)
        );
      }
    });
  }

  send(message: IGleeMessageObject) {
    this.gleeClient.emit(message);
  }

  onMessage(fnc: IGleeOnMessageFunction) {
    this.onMessageFunction = fnc;
  }

  onError() {}
}

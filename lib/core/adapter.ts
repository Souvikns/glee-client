import { AsyncAPIDocument, Server } from "@asyncapi/parser";
import { EventEmitter } from "events";
import GleeBrowser from "./glee";

export default class GleeAdapter extends EventEmitter {
  private _glee: GleeBrowser;
  private _serverName: string;
  private _server: Server;
  private _parsedAsyncAPI: AsyncAPIDocument;
  private _channelNames: string[] = [];
  constructor(
    glee: GleeBrowser,
    serverName: string,
    server: Server,
    parsedAsyncAPI: AsyncAPIDocument
  ) {
    super();
    this._glee = glee;
    this._serverName = serverName;
    this._server = server;
    this._parsedAsyncAPI = parsedAsyncAPI;
    this._channelNames = this._parsedAsyncAPI.channelNames();
    const uriTemplateValues = new Map();
    this.on('message', (message) => {
      this.glee.emit('message', message)
    })
  }

  get serverName(): string {
    return this._serverName;
  }

  get AsyncAPIServer(): Server {
    return this._server;
  }

  get parsedAsyncAPI(): AsyncAPIDocument {
    return this._parsedAsyncAPI;
  }

  get channelNames(): string[] {
    return this._channelNames;
  }

  get glee(): GleeBrowser {
    return this._glee;
  }

  getSubscribedChannels(): string[] {
    return this._channelNames.filter((channelName) => {
      const channel = this._parsedAsyncAPI.channel(channelName);
      if (!channel.hasPublish()) return false;

      const channelServers = channel.hasServers()
        ? channel.servers()
        : channel.ext("x-servers") || this._parsedAsyncAPI.serverNames();
      return channelServers.includes(this._serverName);
    });
  }

  async connect() {}
  async send(message) {}
}

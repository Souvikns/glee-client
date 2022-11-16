import { AsyncAPIDocument, Server } from "@asyncapi/parser";
import { EventEmitter } from "events";
import GleeAdapter from "./adapter";

export interface IAdapterRecord {
  Adapter: typeof GleeAdapter;
  serverName: string;
  server: Server;
  parsedAsyncAPI: AsyncAPIDocument;
}

export default class GleeBrowser extends EventEmitter {
  private _adapterRecords: Array<IAdapterRecord> = [];
  constructor() {
    super();
  }

  addAdapter(
    Adapter: typeof GleeAdapter,
    {
      serverName,
      server,
      parsedAsyncAPI,
    }: { serverName: string; server: Server; parsedAsyncAPI: AsyncAPIDocument }
  ) {
    this._adapterRecords.push({ Adapter, serverName, server, parsedAsyncAPI });
  }

  private async connect() {
    const promises = [];
    this._adapterRecords.forEach((a) => {
      const adapter = new a.Adapter(
        this,
        a.serverName,
        a.server,
        a.parsedAsyncAPI
      );

      promises.push(adapter.connect());
    });

    return Promise.all(promises);
  }

  async listen() {
    return this.connect();
  }
}

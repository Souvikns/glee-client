import { AsyncAPIDocument } from "@asyncapi/parser";
import { EventEmitter } from "events";

export default class Adapter extends EventEmitter {
  private _serverName: string;
  private _parsedAsyncAPI: AsyncAPIDocument;
  constructor(serverName: string, parsedAsyncAPIDocument: AsyncAPIDocument) {
    super();
    this._serverName = serverName;
    this._parsedAsyncAPI = parsedAsyncAPIDocument;
  }

  get serverName() {
    return this._serverName;
  }

  get parsedAsyncAPI() {
    return this._parsedAsyncAPI;
  }

  connect() {}

  send() {}
}

import { EventEmitter } from "events";
import { AsyncAPIDocument } from "@asyncapi/parser";
import { IGleeMessageObject } from "./types";
import Adapter from "./adater";

export default class GleeClient extends EventEmitter {
  private _parsedAsyncAPI: AsyncAPIDocument;
  private _adapters: Array<Adapter> = []
  constructor(parsedAsyncAPI: AsyncAPIDocument) {
    super();
    this._parsedAsyncAPI = parsedAsyncAPI;
  }

  get parsedAsyncAPI(): AsyncAPIDocument {
    return this._parsedAsyncAPI;
  }

  addAdapter(adapter: Adapter) {
    this._adapters.push(adapter)
  }

  emit(
    eventName: string | symbol | IGleeMessageObject,
    ...args: any[]
  ): boolean {
    return true;
  }
}

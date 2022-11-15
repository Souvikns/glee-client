import { AsyncAPIDocument } from "@asyncapi/parser";
import Glee from "./glee";


export default class GleeClient {
  private _asyncapi: AsyncAPIDocument
  private _glee: Glee
  constructor(asyncapi: AsyncAPIDocument, glee:  Glee) {
    this._asyncapi = asyncapi
    this._glee = glee
  }

  async connect() {

  }

  private registerAdapters() {
    const servers = this._asyncapi.serverNames()
    for (const server of servers) {
      this._asyncapi.server(server).protocol().includes('')
    }
  }
}
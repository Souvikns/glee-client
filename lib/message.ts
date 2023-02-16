import { Server } from '@asyncapi/parser'

export default class GleeMessage {
  private _serverName: string
  private _server: Server
  private _channel: string
  private _message: any
  private _conn: any

  constructor({ serverName, server, channel, message, conn }) {
    this._channel = channel
    this._message = message
    this._server = server
    this._serverName = serverName,
    this._conn = conn
  }

  get serverName() {
    return this._serverName
  }

  get server() {
    return this._server
  }

  get channel() {
    return this._channel
  }

  get message() {
    return this._message
  }

  reply(message: string) {
    this._conn.client.send(message)
  }
}

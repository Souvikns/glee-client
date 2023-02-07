import { EventEmitter } from 'events'
import { AsyncAPIDocument, Server } from '@asyncapi/parser'
import Glee from './glee'

export default class GleeAdapter extends EventEmitter {
  private _glee: Glee
  private _serverName: string
  private _server: Server
  private _parsedAsyncAPI: AsyncAPIDocument
  constructor(
    glee: Glee,
    serverName: string,
    server: Server,
    parsedAsyncAPI: AsyncAPIDocument
  ) {
    super()
    this._glee = glee
    this._serverName = serverName
    this._server = server
    this._parsedAsyncAPI = parsedAsyncAPI
    this.on('message', (message) => {
      this._glee.emit('message', message)
    })
    this.on('connect', (conn) => {
      this._glee.emit('connect', conn)
    })
  }

  get glee() {
    return this._glee
  }

  get serverName() {
    return this._serverName
  }

  get server() {
    return this._server
  }

  get parsedAsyncAPI() {
    return this._parsedAsyncAPI
  }

  getChannels(): string[] {
    return this._parsedAsyncAPI.channelNames().filter((channelName) => {
      const channel = this._parsedAsyncAPI.channel(channelName)

      const channelServers = channel.hasServers()
        ? channel.servers()
        : channel.ext('x-servers') || this._parsedAsyncAPI.serverNames()
      return channelServers.includes(this._serverName)
    })
  }

  async connect(): Promise<any> {
    throw new Error('Method `connect` is not implemented.')
  }

  async send(): Promise<any> {
    throw new Error('Method `send` is not implemented.')
  }
}

import GleeAdapter from "../core/adapter";
import ws from 'ws';

interface Client {
  channel: string
  client: ws
  binddings?: any
}
export default class WebsocketAdapter extends GleeAdapter {
  private _clients: Array<Client> = []
  name(): string {
    return 'WebSocket Adapter'
  }

  async connect(): Promise<void> {
    await this._connect()
  }

  async send(message): Promise<void> {
    this._send(message) 
  }

  private async _connect() {
    const channelsOnThisServer = this.getWsChannels()

    for (const channel of channelsOnThisServer) {
      const wsBindings = this.parsedAsyncAPI.channel(channel).binding('ws')
      const url = new URL(
        this.AsyncAPIServer.url() + channel
      )
      this._clients.push({
        channel: channel,
        client: new ws(url),
        binddings: this.parsedAsyncAPI.channel(channel).binding('ws')
      })

    }

    for (const {client, channel} of this._clients) {
      client.on("open", () => {
      })

      client.on('error', (err) => {
        console.log(err)
      })
    }
  }

  private _send(message){
    const client = this._clients.find(client => client.channel === message.channel)
    client.client.send(message.payload)
  }



  private getWsChannels() {
    const channels = []
    for (const channel of this.channelNames) {
      if (this.parsedAsyncAPI.channel(channel).hasBinding('ws')) {
        if (this.parsedAsyncAPI.channel(channel).hasServers()) {
          if (
            this.parsedAsyncAPI
              .channel(channel)
              .servers()
              .includes(this.serverName)
          ) {
            channels.push(channel)
          }
        } else {
          channels.push(channel)
        }
      }
    }

    return channels
  }
}

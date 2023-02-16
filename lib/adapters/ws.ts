import ws from 'ws'
import GleeAdapter from '../adapter'

interface Client {
  channel: string
  client: ws
  binding?: any
}

export default class WsAdapter extends GleeAdapter {
  private clients: Array<Client> = []

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message) {
    return this._send(message)
  }

  private async _connect(): Promise<this> {
    const channels = this.getChannels()

    for (const channel of channels) {
      const url = new URL(this.server.url() + channel)
      this.clients.push({
        channel,
        client: new ws(url),
        binding: this.parsedAsyncAPI.channel(channel).binding,
      })
    }

    for (const { client, channel } of this.clients) {
      client.on('open', () => {
        this.emit('connect', {
          name: 'websocket',
          adapter: this,
          connection: client,
          channel: channel,
        })
        console.log('Connection established')
      })

      client.on('message', (data) => {
        const msg = this._createMessage(channel, data)
        this.emit('message', msg, client)
      })

      client.on('error', (err) => {
        console.log('GETING ERROR')
        this.emit('error', err)
      })
    }

    return this
  }

  private _createMessage(channel: string, message: any) {
    return {channel, message}
  }

  private _send({ channel, message }) {
    const conn = this.clients.find((cl) => cl.channel === channel)
    conn.client.send(message)
  }
}

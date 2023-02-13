import Glee from './glee'
import GleeMessage from './message'

interface FunctionStore {
  channel: string
  fn: Function
}
export default class AsyncAPIClient {
  private _glee: Glee
  private _functionStore: Array<FunctionStore> = []
  constructor(glee: Glee) {
    this._glee = glee

    this._glee.on('message', (message: GleeMessage) => {
      const conn = this._functionStore.find(
        (ch) => ch.channel === message.channel
      )
      if (conn) {
        conn.fn(message)
      }
    })
  }

  on(channel: string, fn: Function) {
    this._functionStore.push({ channel, fn })
  }

  send(channel: string, message) {
    const adapters = this._glee.adapter
    adapters[0].instance.send({ channel, message })
  }
}

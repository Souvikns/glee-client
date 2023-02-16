import GleeAdapter from './adapter'
import Glee from './glee'

interface FunctionStore {
  channel: string
  fn: Function
}

interface ISuccessfullConnection {
  channelName: string
  adapter: GleeAdapter
}

interface IMessageChain {
  channelName: string,
  message: any
}

export default class AsyncAPIClient {
  private _glee: Glee
  private _functionStore: Array<FunctionStore> = []
  private _channelRegistry: Array<ISuccessfullConnection> = []
  private _messageChain: Array<IMessageChain> = []
  constructor(glee: Glee) {
    this._glee = glee

    this._glee.on('message', (message) => {
      const conn = this._functionStore.find(
        (ch) => ch.channel === message.channel
      )
      if (conn) {
        conn.fn(message)
      }
    })

    this._glee.on('connect', ({adapter, channel}) => {
      const existingMessage = this._messageChain.filter(m => m.channelName === channel)
      if (existingMessage.length !==0 ) {
        existingMessage.forEach(m => {
          adapter.send({channel: m.channelName, message: m.message})
        })
      } 
      this._channelRegistry.push({adapter, channelName: channel})
      
    })

  }

  on(channel: string, fn: Function) {
    this._functionStore.push({ channel, fn })
  }

  send(channel: string, message) {
    const conns = this._channelRegistry.filter(cr => cr.channelName === channel)
    if(conns.length === 0) {
      this._messageChain.push({channelName: channel, message})
    } else {
      conns.forEach(cn => {
        cn.adapter.send({channel, message})
      })
    }
  }
}

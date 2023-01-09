const ws = require('ws')
const { EventEmitter } = require('events')

/**
 * 1. We will create a adapter that is resposible for individual protocol connections
 * 2. WE need a interface that would access those connections and relay messages from the user to the program.
 */

class WebSocketAdapter extends EventEmitter {
  client
  constructor(glee, url) {
    super()
    this.url = url
    this.glee = glee
    this.on('message', (message) => {
      glee.emit('message', { channel: 'ws', payload: message })
    })

    this.on('connect', ({ connection }) => {
      this.glee.emit('connect', { connection })
    })
  }

  async connect() {
    this.client = new ws(this.url)
    this.client.on('open', () => {
      this.emit('connect', {
        adapter: this,
        connection: this.client,
      })

      this.client.on('message', (message) => {
        this.emit('message', message)
      })
    })
  }

  send(data) {
    this.client.send(data)
  }
}

class Glee extends EventEmitter {}

class AsyncAPI {
  onMessageFunction
  connection
  constructor(url) {
    this.url = url
    this.glee = new Glee()
    this.glee.on('message', (message) => {
      this.onMessageFunction(message)
    })
    this.glee.on('connect', ({ connection }) => {
      this.connection = connection
    })
  }

  async connect() {
    // I parse the spec file to create needed adapters
    const wss = new WebSocketAdapter(this.glee, this.url)
    await wss.connect()
  }

  onMessage(fn) {
    this.onMessageFunction = fn
  }

  send(data) {
    this.connection.send(data)
  }
}

async function main() {
  const client = new AsyncAPI('ws://localhost:3000')
  await client.connect().then(() => {
    client.onMessage((m) => {
      console.log('%s',m.payload)
      client.send('Hello')
    })
  })
}

main().catch((e) => console.log(e))

const asyncapi = require('glee-browser').default
const fs = require('fs')

async function main() {
  const client = await asyncapi(fs.readFileSync('./asyncapi.yml', 'utf-8'))
  client.on('/', (message) => {
    console.log('client', message)
    client.send('/', 'After connection is established')
    //client.send('/', 'Hi')
  })
  client.send('/', 'Before connection is established')
}

main().catch((e) => console.log(e))


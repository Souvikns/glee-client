# AsyncAPI-Client

AsyncAPI-Client is a library that consumes AsyncAPI spec files and automatically creates and manages connections defined in the specification. It will also validate incoming and outgoing messages. This takes away the overhead of the user to create and manage connections to different protocols and validate schemas, which creates a very pleasant experience for developing client applications.

>💡 This library is currently just a draft and still in development, not meant to used in production.

### General Idea

This library will consume AsyncAPI spec to spin up a client that would let users receive and send messages, and abstract away the connection details.

```ts
import {createAsyncAPIClient} from 'glee-browser'

const client = await createAsyncAPIClient(fs.readFileSync('./asyncapi.yaml', 'utf-8'))

client.onMessage('channel', (message) => { // will be abstracted further. 
  console.log(message.payload)
})

client.send('channel', message); // will be abstracted further

```

# glee-client
A glee client for website.

>💡 This library is currently just a draft. 


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
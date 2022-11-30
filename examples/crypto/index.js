const GleeBrowser = require('glee-browser').default
const fs = require('fs');
const path = require('path')

async function main(){
    const client = await GleeBrowser.create(
        fs.readFileSync(path.resolve('./asyncapi.yaml'), 'utf-8')
    )

    client.onMessage((message) => {
        console.log(message)
    })

    client.send({channel: 'hello', payload: 'Hi, Just telling hello'})

}

main()
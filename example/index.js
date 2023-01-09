const {WebSocketServer} = require('ws')

const wss = new WebSocketServer({
    port: 3000
})



wss.on('connection', (conn) => {
    conn.on('message', (data) => {
        console.log(data)
    })

    conn.send('Connection Established')
})
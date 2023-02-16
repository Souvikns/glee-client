const {WebSocketServer} = require('ws')

const wss = new WebSocketServer({
    port: 3000
})



wss.on('connection', (conn) => {
    // setInterval(() => {
    //     conn.send('Hello')
    // }, 2000)

    conn.send('Hello')

    conn.on('message', (data) => {
        console.log(data.toString())
    })

})
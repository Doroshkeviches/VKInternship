const ws = require('ws')
const wss = new ws.Server({
    port: 2000,
}, () => console.log('server start on port 2000'))

wss.on('connection', function connection(ws) {
    
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})
const message = {
    event: 'message/connection',
    id: 123,
    date: "1 2  3",
    username: "evgDor",
    message: "mes sa ge"
}
function broadcastMessage(message, id) {
wss.clients.forEach(client => {
  
        client.send(JSON.stringify(message))
    
})
}
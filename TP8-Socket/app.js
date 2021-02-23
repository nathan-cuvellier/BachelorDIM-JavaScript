let express = require("express")
let socketio = require("socket.io")
let http = require("http")

let app = express()
let server = http.Server(app)
let io = socketio(server)


app.use("/assets", express.static(__dirname + "/assets/") )

app.get('/', ((req, res) => {
    res.sendFile(__dirname + "/index.html")
}))

io.on('connect', (socket) => {
    console.log("Connecté : " + socket.handshake.address)
    socket.emit('message', 'Bienvenue')
    socket.on('alive', (data) => {
        console.log(data.pseudo + ' is alive')
    })
})

server.listen(8080)

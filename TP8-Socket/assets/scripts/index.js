document.addEventListener('DOMContentLoaded', () => {
    const socket = io()

    console.log(socket)

    socket.on('message', (data) => {
        console.log(data)
    })

    setInterval(() => {
        socket.emit('alive', {pseudo: 'Natcuv'})
    },1000)
})

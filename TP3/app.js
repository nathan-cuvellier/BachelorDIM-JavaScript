document.addEventListener('DOMContentLoaded', () =>
{
    const socket = io('51.83.36.122:8080')

    const pseudo = document.querySelector('#pseudo')
    const text = document.querySelector('#text')
    const button = document.querySelector('#chat button')
    const messages = document.querySelector('#chat #messages')

    socket.on('message', (data) =>
    {
        e('div', messages, `${data.pseudo} : ${data.text}`)

        messages.scrollTop = messages.scrollHeight
    })

    text.focus()
    text.addEventListener('keyup', (e) =>
    {
        if (e.key === 'Enter') {
            send()
        }
    })

    button.addEventListener('click', send)

    function send()
    {
        socket.emit('message', {pseudo: pseudo.value, text: text.value})
        text.value = ''
    }

    ///////////////////////////////
    const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const c = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    canvas.addEventListener('mousemove', e =>
    {
        if(e.buttons !== 0) {
            socket.emit('point', {
                x: e.pageX,
                y: e.pageY,
                color: 'dark'
            })
        }

        socket.on('draw', (data) => {
            c.beginPath()
            c.moveTo(600,0)

            c.lineTo(0, 0)
            c.lineTo(window.innerWidth, window.innerHeight)

            c.fillStyle = data.color
            c.fill()

        })

        socket.on('point', (data) => {
            c.beginPath()
            c.arc(data.x, data.y, 5, 0, Math.PI * 2)
            c.fillStyle = data.color
            c.fill()
        })



    })

})

function e(tag, parent, text = null, id = null, className = null)
{
    let element = document.createElement(tag)

    if (text)
        element.appendChild(document.createTextNode(text))

    if (id)
        element.setAttribute('id', id)

    if (className)
        element.className = className

    return parent.appendChild(element)
}


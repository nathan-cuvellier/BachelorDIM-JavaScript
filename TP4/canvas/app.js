document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    const c = canvas.getContext('2d')

    const w = canvas.width
    const h = canvas.height

    let angle = 0
    let delta = Math.PI/90

    let last = null
    let delay = 0

    let img = new Image()
    img.src = 'img/moon.png'

    function animate(timestamp) {
        if(!last)
            last = timestamp

        if(timestamp - last > delay) {
            last = timestamp
            c.clearRect(0, 0, canvas.width, canvas.height)

            c.save()
            c.translate(w/2, h/2)
            c.rotate(angle)
            c.beginPath()

            /*
            c.fillStyle = 'orange'
            c.rect(-100, -100, 200, 200)
            c.fill()
            */
            c.drawImage(img, -img.width/4, -img.height/4, img.width/2, img.height/2)
            c.restore()

            c.beginPath()
            c.font = '48px sans-serif'
            c.fillStyle = 'black'
            c.fillText('Hop', 600, 120)

            angle += delta
        }

        window.requestAnimationFrame(animate)
    }
    window.requestAnimationFrame(animate)
})

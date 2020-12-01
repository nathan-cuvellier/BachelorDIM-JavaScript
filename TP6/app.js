document.addEventListener('DOMContentLoaded', () =>
{
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    let w, h

    window.addEventListener('resize', resize)

    function resize()
    {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        w = canvas.width
        h = canvas.height
    }

    resize()

    let points = []
    let nbPoints = 4 + Math.floor(Math.random() * 2)
    for (let i = 0; i < nbPoints + 1; i++)
        points.push({x: i * w / nbPoints, y: .4 * h + Math.random() * (h * .4)})

    /*
     * Mouse capture
     */
    const m = {x: 0, y: 0}
    canvas.addEventListener('mousemove', (e) =>
    {
        m.x = e.pageX
        m.y = e.pageY
    })

    let worldDrawed = false
    let tank = {x: .25 * w, y: 0, w: 40, h: 20}
    let cannonball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        r: 5,
    }
    let d
    let holes = []

    let fire = false
    canvas.addEventListener('click', () =>
    {
        if (!fire) {
            fire = true


            cannonball.x = tank.x + 30 * (m.x - tank.x) / d
            cannonball.y = tank.y - tank.h + 30 * (m.y - tank.y + tank.h) / d
            cannonball.vx = 0
            cannonball.vy = 0
            cannonball.ax = 0.01 * (m.x - tank.x)
            cannonball.ay = 0.01 * (m.y - tank.y)
        }

    })

    document.body.addEventListener('keydown', (e) =>
    {
        if (e.key === 'ArrowLeft' && tank.x > 10)
            tank.x -= 2
        else if (e.key === 'ArrowRight' && tank.x < w - 10)
            tank.x += 2
    })

    function game()
    {
        c.clearRect(0, 0, w, h)
        c.beginPath()
        let pp = null
        points.forEach((p, i) =>
        {
            if (i === 0)
                c.moveTo(p.x, p.y)
            else
                c.bezierCurveTo(pp.x + 100, pp.y, p.x - 100, p.y, p.x, p.y)
            pp = p
        })

        c.lineTo(w + 20, h + 20)
        c.lineTo(0 - 20, h + 20)
        c.fillStyle = "#996600"
        c.strokeStyle = "#00AA00"
        c.lineWidth = 10

        c.fill()
        c.stroke()

        /*
         * TANK
         */
        //if (!worldDrawed) {
        let y = 0
        while (y < h && !c.isPointInPath(tank.x, y)) {
            y++
        }
        tank.y = y - 5
        //}

        if (fire) {
            fire = !c.isPointInPath(cannonball.x, cannonball.y) &&
                cannonball.x < w && cannonball.x > 0


            if (fire)
                holes.push({

                    x: cannonball.x,
                    y: cannonball.y,
                    r: 10 * Math.sqrt(Math.pow(cannonball.vx, 2) + Math.pow(cannonball.vy, 2))
                })
        }

        /*
         * Draw holes
         */
        holes.forEach((hole, index) =>
        {
            c.clearRect(hole.x - hole.r / 2, hole.y - hole.r / 2, hole.r, hole.r)
        })

        /*
         * Draw tank
         */
        c.beginPath() // BODY
        c.rect(tank.x - tank.w / 2, tank.y - tank.h, tank.w, tank.h)
        c.fillStyle = "black"
        c.fill()
        c.beginPath() // CANON
        c.strokeStyle = "black"
        c.lineWidth = 5
        c.moveTo(tank.x, tank.y - tank.h)
        d = Math.sqrt(
            Math.pow(tank.x - m.x, 2) +
            Math.pow(tank.y - m.y - tank.h, 2))
        c.lineTo(
            tank.x + 30 * (m.x - tank.x) / d,
            tank.y - tank.h + 30 * (m.y - tank.y + tank.h) / d)
        c.stroke()

        if (fire) {
            c.beginPath()
            c.fillStyle = "#000000"
            c.arc(cannonball.x, cannonball.y, cannonball.r, 0, Math.PI * 2)
            c.fill()

            cannonball.vx += cannonball.ax
            cannonball.vy += cannonball.ay + 0.05

            cannonball.ax *= 0.01
            cannonball.ay *= 0.01

            cannonball.x += cannonball.vx
            cannonball.y += cannonball.vy
        }

        /*
         * Draw mouse crosshair
         */
        c.beginPath()
        c.strokeStyle = "#FF0000"
        c.lineWidth = 3
        c.moveTo(m.x - 30, m.y)
        c.lineTo(m.x + 30, m.y)
        c.stroke()
        c.beginPath()
        c.moveTo(m.x, m.y - 30)
        c.lineTo(m.x, m.y + 30)
        c.stroke()
        c.beginPath()
        c.arc(m.x, m.y, 25, 0, 6.3)
        c.stroke()

        worldDrawed = true
        window.requestAnimationFrame(game)
    }

    window.requestAnimationFrame(game)

})

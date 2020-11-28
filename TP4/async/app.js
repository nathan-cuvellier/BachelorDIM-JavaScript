document.addEventListener('DOMContentLoaded', () => {

    let click = []

    document.querySelectorAll('button').forEach((element, i) => {
        click.push(false)
        element.addEventListener('click', (e) => {
            e.preventDefault()
            e.target.setAttribute('disabled', 'disabled')
            click[i] = true

            if(click.every(v => v === true))
                console.log("%cHOP 👀", "color: orange; font-size: xxx-large");

        })
    })
})

document.addEventListener('DOMContentLoaded', () =>
{
    const form = document.querySelector('form')

    form.querySelectorAll('div').forEach(div =>
    {
        let radios = div.querySelectorAll("input[type=radio]")
        if (radios.length === 2) {
            let labels = div.querySelectorAll('label')
            let values = {}

            radios.forEach((element, i) =>
            {
                if (radios[i].classList) {
                    radios[i].classList.add('hide')
                    labels[i].classList.add('hide')
                    values[radios[i].value] = labels[i].innerText
                }
            })

            console.log(values)

            e('span', div, labels[0].innerText, null, 'souitchLabel')
            const souitch = e('span', div, null, null, 'souitch')
            const ball =  e('span', souitch, null, null, 'ball')
            e('span', div, labels[1].innerText, null, 'souitchLabel')

            souitch.addEventListener('click', () => {
                ball.classList.toggle('clicked')

                if(!ball.classList.contains('clicked')) {
                    radios[1].checked = !radios[1].checked
                    radios[0].checked = !radios[0].checked
                } else {
                    radios[0].checked = !radios[0].checked
                    radios[1].checked = !radios[1].checked
                }


                console.log(radios[0].checked, radios[1].checked)
            })
        }

        let select = div.querySelector('select')
        if(select) {
            let values = Array.from(select.querySelectorAll('option')).map(option => option.value)

            console.log(values)
        }
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

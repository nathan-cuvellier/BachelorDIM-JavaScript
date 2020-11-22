document.addEventListener('DOMContentLoaded', () => {
    let h1 = e('h1', document.body, 'Les bières du lundi matin', '', 'mt-5 pd-5')

    fetch('services.php?action=list')
        .then(function(data) {
            return data.json()
        })
        .then(function(bieres) {
            displayBeers(bieres)

            /**
             * UPDATE
             */
            document.querySelectorAll('[contenteditable=true]').forEach(element => {
                element.addEventListener('blur', (e) => {
                    let tr_parent = e.target.parentNode
                    // services.php?action=update&id=42&x=73&message=plop&newstuff=beer
                    let id = parseInt(tr_parent.querySelector('td:nth-child(1)').innerText)
                    let name = tr_parent.querySelector('td:nth-child(2)').innerText
                    let color = tr_parent.querySelector('td:nth-child(3)').innerText
                    let degree = parseInt(tr_parent.querySelector('td:nth-child(4)').innerText)

                    fetch('services.php?action=update&id=' + id + '&name=' + name + '&color=' + color + '&degree='+degree)
                        .then(function(response) {
                            return response.json()
                        })
                        .then(function(data) {

                        })
                })
            })

            document.querySelectorAll('.delete-beer').forEach(element => {
                element.addEventListener('click', (e) => {
                    e.preventDefault()
                    fetch(e.target.getAttribute('data-action'))
                        .then(function(response){
                            return response.json()
                        })
                        .then(function (data) {
                            if(data.success === 'delete')
                            {
                                let tr_del = e.target.closest('tr')
                                tr_del.parentNode.removeChild(tr_del)
                            }

                        })
                })
            })
        })


    function displayBeers(bieres)
    {
        let table = e('table', document.body)
        let thead = e('thead', table)

        Object.keys(bieres[0]).forEach(key => {
            let th = e('th', thead)
            e('td', th, key)
        })
        let th = e('th', thead)
        e('td', th, 'Action')

        let tbody = e('tbody', table)
        bieres.forEach(biere => {
            console.log(biere)
            let tr = e('tr', tbody)
            for(const [k,v] of Object.entries(biere)) {
                let td = e('td', tr, v)
                if(k !== 'id')
                    td.setAttribute('contenteditable', true)
            }

            let tr_trash = e('td', tr)
            let a_del = e('a', tr_trash, '🗑️', null, 'delete-beer')
            a_del.setAttribute('data-action', 'services.php?action=delete&id=' + biere.id)
        })
    }
})

function e(tag, parent, text=null, id=null, className=null)
{
    let element = document.createElement(tag)

    if(text)
        element.appendChild(document.createTextNode(text))

    if(id)
        element.setAttribute('id', id)

    if(className)
        element.className = className

    return parent.appendChild(element)
}

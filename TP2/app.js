document.addEventListener('DOMContentLoaded', () => {
    e('h1', document.body, 'Les bières du lundi matin', '', 'mt-5 pd-5')

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
                updateData(element)
            })

            document.querySelectorAll('.delete-beer').forEach(element => {
                deleteData(element)
            })

            let div_btn_add = e('div', document.body, null, null, 'btn-add')
            e('button',  div_btn_add, '+')

            div_btn_add.addEventListener('click', () => {
                let new_tr = e('tr', document.querySelector('tbody'))

                let new_id = e('td', new_tr)

                let new_name = e('td', new_tr)
                new_name.setAttribute('contenteditable', true)

                let new_color = e('td', new_tr)
                new_color.setAttribute('contenteditable', true)

                let new_degree = e('td', new_tr)
                new_degree.setAttribute('contenteditable', true)

                fetch('services.php', {
                    method: 'POST',
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        'action': 'add',
                        'name': '',
                        'color': '',
                        'degree': '0'
                    })
                })
                .then(r => r.json())
                .then(data => {
                    console.log('test')
                  if(data.success !== 'add') return

                    let id = data.object.id
                    new_id.innerText = id

                    let new_action = e('td', new_tr)
                    let new_a_del = e('a', new_action, '🗑️', null, 'delete-beer')
                    new_a_del.setAttribute('data-action', 'services.php?action=delete&id=' + id)

                    new_tr.querySelectorAll('[contenteditable=true]').forEach(element => {
                        updateData(element)
                    })

                    deleteData(new_a_del)
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

function updateData(element)
{
    element.addEventListener('blur', (e) => {
        let tr_parent = e.target.parentNode
        let id = parseInt(tr_parent.querySelector('td:nth-child(1)').innerText)
        let name = tr_parent.querySelector('td:nth-child(2)').innerText
        let color = tr_parent.querySelector('td:nth-child(3)').innerText
        let degree = parseInt(tr_parent.querySelector('td:nth-child(4)').innerText)

        fetch('services.php?action=update&id=' + id + '&name=' + name  +'&color='+ color +  '&degree='+degree)
            .then(r => r.json())
            .then(function(data) {
                console.log(data)
            })
    })
}

function deleteData(element)
{
    element.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(e.target.getAttribute('data-action'))
            .then(function(response){
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                if(data.success === 'delete')
                {
                    let tr_del = e.target.closest('tr')
                    tr_del.parentNode.removeChild(tr_del)
                }

            })
    })
}

function randomInt(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

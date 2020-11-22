document.addEventListener('DOMContentLoaded', () =>
{

    let div_code = document.querySelector('.code')

    let code_enter = ""

    document.querySelector('#admin-link').addEventListener('click', (e) => {
        e.preventDefault()
        fetch('auth')
            .then(function(res){ return res.json(); })
            .then(function(data){
                if(data.connected === true)
                    window.location = "admin"
                else
                    document.querySelector('.bg').classList.remove('d-none')
            })
    })

    document.querySelectorAll('.code > div').forEach((element, i) =>
    {
        element.addEventListener('click', (e) =>
        {
            e.preventDefault()

            let data_id = parseInt(element.getAttribute('data-id'))

            if (code_enter.length < 4) {
                code_enter += data_id
            }

            if (code_enter.length === 4) {

                fetch('auth',
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({code: code_enter})
                    })
                    .then(function(res){ return res.json(); })
                    .then(function(data){
                        let code = data.code

                        if(code === true) {
                            div_code.style.backgroundColor = "#0F0"
                            setTimeout(() => {
                                window.location = "admin"
                            }, 500)
                        }
                        else
                            div_code.style.backgroundColor = "#a55f09"

                    })

                setTimeout(() =>
                {
                    div_code.style.backgroundColor = "#cccccc"
                }, 500)
                code_enter = ""
            }
        })
    })

})

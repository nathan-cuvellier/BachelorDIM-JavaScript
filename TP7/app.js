const express = require('express')
const app = express()
const bodyparser = require('body-parser')

let groceryList = [
    {name: 'Bière', quantity: 42},
    {name: 'PQ', quantity: 120},
    {name: 'Pâtes', quantity: 73},
]

app.set('view engine', 'ejs')
app.use("/assets", express.static(__dirname + "/assets/") )
app.use(bodyparser.urlencoded({extended: false}))

app.get('/', ((req, res) => {
    return res.render('index', {list: groceryList})
}))

app.get('/list', ((req, res) => {
    res.json(groceryList)
}))

app.post('/add', ((req, res) =>  {
    let post = req.body

    groceryList.push({
        name:post.name,
        quantity: post.quantity
    })

    console.log(groceryList)
}))

app.listen(3000)

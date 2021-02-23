const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")

let app = express()
let server = http.Server(app)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://localhost:27017",
    { useNewUrlParser: true, useUnifiedTopology: true });

let db = null;
client.connect(err => {
    db = client.db("grocery")
})


app.use("/assets", express.static(__dirname + "/assets/") )

app.get('/', ((req, res) => {
    res.sendFile(__dirname + "/index.html")
}))

app.get('/list', (req, res) => {

   db.collection('stufftobuy').find({}).toArray((err, docs) => {
       res.json(docs)
   })
})

app.post('/add', ((req, res) => {

    let stuff = req.body
    stuff.id = Date.now() + '' + Math.floor(Math.random()*100000)
    db.collection('stufftobuy').insertOne(stuff, (err, docs) => {
        res.json(stuff)
    })
}))

app.get('/quantity/:min/:max', (req, res) => {
  let list = []
  for(let stuff of groceryList)
      if(stuff.quantity > req.params.min && stuff.quantity < req.params.max)
          list.push(stuff)

    res.json(list)

})

server.listen(8080)

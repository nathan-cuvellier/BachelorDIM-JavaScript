const express = require("express")
const app = express()


//-----------------------------------------CONNEXION BD
let MongoClient = require("mongodb").MongoClient;
const client = new MongoClient("mongodb://localhost:27017",
    { useNewUrlParser: true, useUnifiedTopology: true });

let db = null;
client.connect(err => {
    db = client.db("beers")
})

let beers = [
    {
        name: "Chimay blue",
        color: "brune",
        hex: "#2d1506",
        country: "Belgique",
        note: 4.5,
        degree: 9,
        descr: "Maltée et ronde"
    }, {
        name: "Duvel Triple Hop",
        color: "blonde",
        hex: "#e9ed87",
        country: 'Belgique',
        note: 1.2,
        degree: 9,
        descr: "Rafraichissant, désaltérante, ultra-houblonnée"
    }
]

//-----------------------------------------------------------ROUTES STATIQUES

app.use("/assets", express.static(__dirname + "/assets"))


//-------------------------------------------------------ROUTE UNIQUE DE FRONT

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
})

//--------------------------------------------------------ROUTE SERVICE (REST)


app.get("/beer/list", (req, res) => {

    //res.json(beers)

    db.collection("beers").find({ }).toArray((err, docs) => {
        res.json(docs)
    })
})



app.get("/beer/add", (req, res) => {
    let beer = req.query
    db.collection("beers").insertOne(beer, (err, docs) => {
        res.json(docs.ops)
    })
})

app.listen(8080)

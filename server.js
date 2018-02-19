const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb://localhost:27017/crud', (err, client) => {
    if (err) {
        console.log(err);
    }
    else {
        db = client.db('star-wars-quotes')
        app.listen(3000, function () {
            console.log('listening on 3000')
        })
    }
})
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database');
        res.redirect('/');
    })
})

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray(function(err, results) {
        console.log(results)
        // send HTML file populated with quotes here
      })
    
})



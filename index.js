const express = require('express');
const app = express();

const port = process.env.PORT || 5146;

const { connectToDb, getDb } = require('./config/db')

const bodyParser = require('body-parser');

app.use(bodyParser.json()); 

let db;

connectToDb((err) => {
    if (!err){
        app.listen(port, ()=>{
            console.log("all good");
        });
        db= getDb();
    }else{
        console.log(`loshara: ${err}`);
    }
});

app.get('/', (req, res) => {
    /*const movies = [];

    db
    .collection('dbtesto')
    .find()
    .forEach(movie => {
        movies.push(movie);
    })
    .then(()=>{
        res
        .status(200)
        .json(movies)
    })*/
    res.sendFile(__dirname + '/index.html');
});


app.post('/m', (req, res) => {
    console.log(req.body);
    db.collection('dbtesto').insertOne(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Ошибка при добавлении в базу данных");
        } else {
            res.status(200).send("Данные успешно добавлены в базу данных");
        }
    });
});
app.get('/m', (req, res) => {console.log(req.body);})

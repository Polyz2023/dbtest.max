const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5140;
const URL = 'mongodb+srv://nodeprogramer:F4by5!f5RU7YJ25@cluster0.odjfrd7.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0';


let dbConnection;

// Подключение к базе данных
MongoClient.connect(URL,  {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then((client) => {
        console.log('Connected to MongoDB');
        dbConnection = client.db();
        
        // Запуск сервера
        app.listen(port, () => {
            console.log("Server is running on port", port);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Парсинг JSON-тела запросов
app.use(bodyParser.json()); 

// Обработчик маршрута для получения списка фильмов
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Обработчик маршрута для добавления фильма
app.post('/m', (req, res) => {
    console.log(req.body);
    dbConnection.collection('dbtesto').insertOne(req.body, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Ошибка при добавлении в базу данных");
        } else {
            res.status(200).send("Данные успешно добавлены в базу данных");
        }
    });
});

// Обработчик маршрута для получения фильмов (пример)
app.get('/m', (req, res) => {
    console.log("GET /m route hit");
    dbConnection.collection('dbtesto').find().toArray((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Ошибка при получении данных из базы данных");
        } else {
            res.status(200).json(result);
        }
    });
});


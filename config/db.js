const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017/dbtesto'

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient
        .connect(URL)
        .then((client) => {
            console.log('Good db');
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            return cb(err);
        })
    },
    getDb: () => dbConnection,
}


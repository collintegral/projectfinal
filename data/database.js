const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = async (callback) => {
    if(database) {
        console.log('DB is already initialized!');
        return callback(null, database);
    }
    await MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDatabase = () => {
    if(!database) {
        throw Error('DB not initialized.');
    }
    return database;
}

module.exports = { initDb, getDatabase };
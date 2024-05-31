const { MongoClient } = require('mongodb');
const dotenv = require('dotenv'); 
dotenv.config();

const uri = process.env.MONGODB_URI;
let db;

function connectDB(callback) {
    try {
        MongoClient.connect(uri)
            .then((client) => {
                db = client;
                callback(null, db);
            })
            .catch((err) => {
                callback(err);
            });
        console.log('Connected to the MongoDB database');
    } catch (error) {
        console.error('Error connecting to the MongoDB database:', error);
    }
}

const getDB = () => {
    if (!db) {
      throw Error('Database not initialized');
    }
    return db;
  };

module.exports = { connectDB, getDB };
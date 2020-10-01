const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://deepyes02:j3kbzaEhes0jjbQ3@deepyes02.qegbb.mongodb.net/nosql_node_udemy?retryWrites=true&w=majority";

let _db;
const mongoConnect = callback => {

MongoClient.connect(uri, {useUnifiedTopology:true})
    .then(client=>{
        console.log('Connected');
        _db = client.db();
    })
    .catch(err=>{
        console.log(err)
        throw err;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database Found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


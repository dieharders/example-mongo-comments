const MongoClient = require('mongodb').MongoClient;
var db;
const url = process.env.MONGOATLAS_URI;
const options = {useNewUrlParser: true};

module.exports = {
    connectToDB: function( callback ) {
        MongoClient.connect(url, options, function(err, database) {
            if (err) {
                console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            }
            console.log('Connected...');
            db = database;
            return callback(err);
        });
    },
    getConn: function() {
        return db;
    }
}
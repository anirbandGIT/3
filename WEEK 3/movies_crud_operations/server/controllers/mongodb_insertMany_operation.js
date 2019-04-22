//INSERT MANY/?
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function insertMany(databaseName, collectionName) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var myobj = [
            { name: 'John', address: 'Highway 71' },
            { name: 'Peter', address: 'Lowstreet 4' },
            { name: 'Amy', address: 'Apple st 652' },
            { name: 'Hannah', address: 'Mountain 21' },
            { name: 'Michael', address: 'Valley 345' }
        ];
        dbo.collection(collectionName).insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("NUMBER OF DOCUMENTS INSERTED: " + res.insertedCount);
            db.close();
        });
    });
}
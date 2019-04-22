var MongoClient = require('mongodb').MongoClient;
var dbName = "myDatabase";
var url = "mongodb://localhost:27017/";

var createDatabase = function () {
    url = `mongodb://localhost:27017/${databaseName}`;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log(`${databaseName} DATABASE HAS BEEN CREATED!!`);
        db.close();
    });
}
var createCollection = function (collName) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.createCollection(collName, function (err, res) {
            if (err) throw err;
            console.log(`${collName} COLLECTION CREATED IN ${dbName}`);
            db.close();
        });
    });
}


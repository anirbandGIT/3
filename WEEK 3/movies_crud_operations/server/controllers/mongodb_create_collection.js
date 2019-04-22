function createCollection(collName){
var MongoClient = require('mongodb').MongoClient;
var dbName = "myDatabase";
var url = "mongodb://localhost:27017/";

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
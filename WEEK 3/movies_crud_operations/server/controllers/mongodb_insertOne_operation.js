//INSERT ONE//
function insertOne(collName,value) {
    // const argv = require('yargs').argv;
    var MongoClient = require('mongodb').MongoClient;
    var dbName = "myDatabase";
    var url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = value;
        dbo.collection(collName).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 DOCUMENT INSERTED");
            db.close();
        });
    });
}
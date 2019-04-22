function createDocument(collName,value) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var dbName = "myDatabase";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = value;
        dbo.collection(collName).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("DOCUMENT CREATED");
            db.close();
        })
    });
}
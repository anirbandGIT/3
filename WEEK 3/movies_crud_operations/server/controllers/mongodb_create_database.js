function createDatabase() {
    var MongoClient = require('mongodb').MongoClient;
    var databaseName = "myDatabase";
    var url = `mongodb://localhost:27017/${databaseName}`;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        console.log(`${databaseName} DATABASE HAS BEEN CREATED!!`);
        db.close();
    });
}
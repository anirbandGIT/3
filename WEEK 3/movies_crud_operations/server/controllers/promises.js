// const input = require("yargs").argv;

const Movie = require("../../Movie");
const textFile = require(".././db/movie.json");

var stringifiedResponse = JSON.stringify(textFile);
var response = JSON.parse(stringifiedResponse);
// console.log(response[0]);

var movie = [];

movie[0] = new Movie(response[0].movieName, response[0].movieDuration, response[0].movieRating, response[0].movieGenre, response[0].isMovieGood);
movie[1] = new Movie(response[1].movieName, response[1].movieDuration, response[1].movieRating, response[1].movieGenre, response[1].isMovieGood);
movie[2] = new Movie(response[2].movieName, response[2].movieDuration, response[2].movieRating, response[2].movieGenre, response[2].isMovieGood);
movie[3] = new Movie(response[3].movieName, response[3].movieDuration, response[3].movieRating, response[3].movieGenre, response[3].isMovieGood);
movie[4] = new Movie(response[4].movieName, response[4].movieDuration, response[4].movieRating, response[4].movieGenre, response[4].isMovieGood);

console.table(movie);
// console.log(movie[0]);

const MongoClient = require('mongodb').MongoClient;

var dbName = "myDatabase";
const url = `mongodb://localhost:27017/${dbName}`; //USE TO MAKE DATABASE
var collName = "Movies"

MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    console.log(`CONNECTION ESTABLISHED WITH SERVER`);

    //CREATE DATABASE
    console.log(`${dbName} DATABASE HAS BEEN CREATED!!`);

    //CREATE THE COLLECTION
    // var dbase = client.db(dbName);
    // dbase.createCollection(collName, function (err, res) {
    //     if (err) throw err;
    console.log(`${collName} COLLECTION CREATED IN ${dbName}`);

    //CREATE A DOCUMENT WITH 1 OBJECT
    // var dbase = client.db(dbName);
    // var myobj = movie[0];
    // dbase.collection(collName).insertOne(myobj, function (err, res) {
    //     if (err) throw err;
    //     console.log("DOCUMENT CREATED WITH 1 OBJECT");

    //INSERT ONE MORE OBJECT
    // var dbase = client.db(dbName);
    // var myobj = movie[1];
    // dbase.collection(collName).insertOne(myobj, function (err, res) {
    // if (err) throw err;
    // console.log("1 DOCUMENT INSERTED");

    //INSERT MULTIPLE VALUES
    // var dbase = client.db(dbName);
    // var myobj = [movie[0], movie[1], movie[2], movie[3], movie[4]];
    // dbase.collection(collName).insertMany(myobj, function (err, res) {
    //     if (err) throw err;
    //     console.log("NUMBER OF DOCUMENTS INSERTED: " + res.insertedCount);

        //FIND MOVIE WITH RATING > 4
        var dbase = client.db(dbName);
        var query = { movieRating: { $gt: 4 } };
        dbase.collection(collName).find(query).toArray(function (err, result) {
            if (err) throw err;

            result.forEach(element => console.table(element));

        //IF THE MOVIE IS NOT GOOD REDUCE RATIONG BY 1
        // var dbase = client.db(dbName);
        // var query = { isMovieGood: { $eq: false } };
        // dbase.collection(collName).find(query).toArray(function (err, result) {
        //     if (err) throw err;

        //     result.forEach(element => {
        //         var myQuery = { movieName: element.movieName };
        //         var newValues = { $set: { movieRating: element.movieRating - 1 } };
        //         dbase.collection(collName).updateOne(myQuery, newValues).then(function (err, res) {
        //             // if (err) throw err;
        //             console.log("1 DOC UPDATED");
        //         }).catch(function (err) {
        //             console.error(err);
        //         })
        //     });

        //MOVIES WITH DURATION < 1 OR > 4
        // var dbase = client.db(dbName);
        // var query = { $or: [{ movieDuration: { $lt: 1 } }, { movieDuration: { $gt: 4 } }] };

        // dbase.collection(collName).find(query).toArray().then(function (result) {
        //     // if (err) throw err;

        //     result.forEach(element => {
        //         var myQuery = { movieName: element.movieName };
        //         dbase.collection(collName).deleteOne(myQuery).then( function (err, obj) {
        //             if (err) throw err;
        //             console.log("1 DOC DELETED");
        //         }).catch(function(err){
        //             console.error(err);
        //         })
        //     });
        client.close();
    });
});

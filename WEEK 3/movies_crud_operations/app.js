const Movie = require("./Movie");
const textFile = require("./server/db/movie.json");

var stringifiedResponse = JSON.stringify(textFile);
var response = JSON.parse(stringifiedResponse);
console.log(response[0]);

var movie = [];

movie[0] = new Movie(response[0].movieName,response[0].movieDuration,response[0].movieRating,response[0].movieGenre,response[0].isMovieGood);
movie[1] = new Movie(response[1].movieName,response[1].movieDuration,response[1].movieRating,response[1].movieGenre,response[1].isMovieGood);
movie[2] = new Movie(response[2].movieName,response[2].movieDuration,response[2].movieRating,response[2].movieGenre,response[2].isMovieGood);
movie[3] = new Movie(response[3].movieName,response[3].movieDuration,response[3].movieRating,response[3].movieGenre,response[3].isMovieGood);
movie[4] = new Movie(response[4].movieName,response[4].movieDuration,response[4].movieRating,response[4].movieGenre,response[4].isMovieGood);

console.table(movie);
console.log(movie[0]);
console.log(movie.movieRating);
var Movie = function (movieName, movieDuration, movieRating, movieGenre, isMovieGood) {
    this.movieName = movieName;
    this.movieDuration = movieDuration;
    this.movieRating = movieRating;
    this.movieGenre = movieGenre;
    this.isMovieGood = isMovieGood;
};
module.exports = Movie;
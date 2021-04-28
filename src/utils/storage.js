const loadMovies = () =>{
    let moviesString = localStorage.getItem('movies');
    let movies = JSON.parse(moviesString)
    if(movies){
        return movies;
    }else{
        return null
    }
}

const addMovieToStorage = (movie) => {
    let movies = loadMovies();
    if(movies){
        movies.unshift(movie)
    }else{
        movies = []
    }
    let moviesString = JSON.stringify(movies);
    localStorage.setItem('movies', moviesString);
}
const existsInStorage = (movie) => {
    const movieList = loadMovies();
    return !!movieList.find(movieInList => movieInList.imdbID === movie.imdbID)
}


module.exports = {loadMovies, addMovieToStorage, existsInStorage}
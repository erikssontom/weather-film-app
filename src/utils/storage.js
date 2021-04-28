const loadMovies = () => {
    let moviesString = localStorage.getItem('movies');
    return JSON.parse(moviesString) ?? []
}

const addMovieToStorage = (movie) => {
    let movies = loadMovies();
    movies.unshift(movie)
    let moviesString = JSON.stringify(movies);
    localStorage.setItem('movies', moviesString);
}

const existsInStorage = (movie) => {
    const movieList = loadMovies();
    if (!movieList) return false;
    return !!movieList.find(movieInList => movieInList.imdbID === movie.imdbID)
}
const removeMovieFromStorage = (movie) => {
    const movieList = loadMovies();
    const filteredList = movieList.filter(movieInList => movieInList.imdbID !== movie.imdbID)
    let moviesString = JSON.stringify(filteredList);
    localStorage.setItem('movies', moviesString);
    return filteredList;
}

module.exports = { loadMovies, addMovieToStorage, existsInStorage, removeMovieFromStorage }
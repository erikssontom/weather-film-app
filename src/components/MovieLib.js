import React, { useState } from 'react'
import { loadMovies, existsInStorage, removeMovieFromStorage } from '../utils/storage'
import MovieResult from './MovieResult';
export default function MovieLib() {
    const [movieList, setMovieList] = useState(loadMovies())

    const handleRemove = (movie) => {
        if (!movie) return
        if (existsInStorage(movie)) {
            const filteredList = removeMovieFromStorage(movie)
            setMovieList(filteredList);
        }
    }
    return (
        <div>
            {movieList && movieList.map((movie, i) => <MovieResult movie={movie} handleRemove={handleRemove} removeFromLibEnabled={true} key={i} />)}
        </div>
    )
}

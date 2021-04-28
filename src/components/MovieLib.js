import React from 'react'
import { loadMovies } from '../utils/storage'
import MovieResult from './MovieResult';
export default function MovieLib() {
    const movieList = loadMovies();
    return (
        <div>
           {movieList && movieList.map((movie, i) => <MovieResult movie={movie} addToLibEnabled={false} key={i}/>)}
        </div>
    )
}

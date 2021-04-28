import { useState } from 'react'
import { addMovieToStorage, existsInStorage } from '../utils/storage'

export default function MovieResult({ movie, addToLibEnabled, handleRemove }) {
    const [movieAdded, setMovieAdded] = useState(false)
    //const [movieRemoved, setMovieRemoved] = useState(false)
    //console.log(movie)
    const handleAdd = (movie) => {
        if (!movie) return
        if (!existsInStorage(movie)) {
            addMovieToStorage(movie)
            setMovieAdded(true)
        }
    }

    return (
        <div>
            <h2>{movie.Title}, {movie.Year}</h2>
            <img src={movie.Poster} alt="movie poster"/>
            {addToLibEnabled && <button disabled={existsInStorage(movie) || movieAdded} onClick={() => handleAdd(movie)}>Lägg till</button>}
            {!addToLibEnabled && <button disabled={!existsInStorage(movie)} onClick={() => handleRemove(movie)}>Ta bort</button>}
            {movieAdded && <h3>Movie added to library</h3>}
        </div>
    )
}

import {useState} from 'react'
import { addMovieToStorage, existsInStorage } from '../utils/storage'

export default function MovieResult({movie, addToLibEnabled}) {
    const [movieAdded, setMovieAdded] = useState(false)
    const handleClick = (movie) => {
        if(!movie) return
        if(!existsInStorage(movie)){
            addMovieToStorage(movie)
            setMovieAdded(true)
        }
    }
    return (
        <div>
             <h2>{movie.Title}, {movie.Year}</h2>
             {addToLibEnabled && <button disabled={existsInStorage(movie)} onClick={() => handleClick(movie)}>Lägg till</button>}
            {movieAdded && <h3>Movie added to library</h3>}
        </div>
    )
}

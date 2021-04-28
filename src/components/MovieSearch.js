import { useState } from 'react'
import MovieResultList from './MovieResultList';
export default function MovieSearch() {

    const [searchTerm, setSearchTerm] = useState("");
    const [year, setYear] = useState("");
    const [searchUrl, setSearchUrl] = useState("");

    const handleFindMovie = (e) => {
        e.preventDefault();
        if (year.length === 0) {
            setSearchUrl(`http://www.omdbapi.com/?apikey=f4094dbc&s=${encodeURI(searchTerm)}`)
        } else {
            setSearchUrl(`http://www.omdbapi.com/?apikey=f4094dbc&s=${encodeURI(searchTerm)}&y=${year}`)
        }
    }

    return (
        <div>
            <h2>Hitta en film</h2>
            <form onSubmit={handleFindMovie}>
            <label>Titel: </label>
                <input
                    type="text"
                    required
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <label>År: </label>
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button>Search for movie</button>
            </form>
            <form onSubmit={handleFindMovie}>
            </form>

            {searchUrl.length !== 0 && <MovieResultList url={searchUrl} />}

        </div>
    )
}

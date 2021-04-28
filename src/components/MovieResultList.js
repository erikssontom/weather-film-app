import useFetch from '../utils/useFetch'
import MovieResult from './MovieResult';

export default function MovieResultList({url}) {
    const { data, isPending, error } = useFetch(url);
    return (
        <div>
            {error && <h1>{error}</h1>}
            {isPending && <h1>Loading...</h1>}
           {data && data.Search.map((movie, i) => <MovieResult movie={movie} addToLibEnabled={true} key={i}/>)}
        </div>
    )
}

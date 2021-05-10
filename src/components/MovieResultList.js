import useFetch from "../utils/useFetch";
import MovieResult from "./MovieResult";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const MovieResultList = ({ url }) => {
  const { data, isPending, error } = useFetch(url);
  return (
    <div>
      {error && <h1>{error}</h1>}
      {isPending && <Typography variant="h4">Loading...</Typography>}
      <Grid container spacing={3}>
        {data &&
          data.Search.map((movie, i) => (
            <Grid item xs={12} md={4} lg={3}>
              <MovieResult movie={movie} addToLibEnabled={true} key={i} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default MovieResultList;

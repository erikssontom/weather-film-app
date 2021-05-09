import { useState } from "react";
import { addMovieToStorage, existsInStorage } from "../utils/storage";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";

const useStyles = makeStyles((theme) => ({
  moviePaper: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  img: {
    margin: "0 auto",
    width: "45%",
    height: "55%",
  },
  addButton: {
    margin: "1em auto",
    width: "50%",
  },
}));

const MovieResult = ({ movie, addToLibEnabled, handleRemove }) => {
  const classes = useStyles();
  const [movieAdded, setMovieAdded] = useState(false);
  //const [movieRemoved, setMovieRemoved] = useState(false)
  //console.log(movie)
  const handleAdd = (movie) => {
    if (!movie) return;
    if (!existsInStorage(movie)) {
      addMovieToStorage(movie);
      setMovieAdded(true);
    }
  };

  return (
    <div>
      <Paper className={classes.moviePaper} elevation={3}>
        <Typography variant="h5">{movie.Title}</Typography>
        <Typography variant="subtitle">{movie.Year}</Typography>
        <img className={classes.img} src={movie.Poster} alt="movie poster" />
        {addToLibEnabled && (
          <Button
            className={classes.addButton}
            variant="contained"
            color="primary"
            disabled={existsInStorage(movie) || movieAdded}
            onClick={() => handleAdd(movie)}
          >
            Add
          </Button>
        )}
        {!addToLibEnabled && (
          <button
            disabled={!existsInStorage(movie)}
            onClick={() => handleRemove(movie)}
          >
            Ta bort
          </button>
        )}
        {movieAdded && (
          <Typography variant="h6">Movie added to library</Typography>
        )}
      </Paper>
    </div>
  );
};

export default MovieResult;

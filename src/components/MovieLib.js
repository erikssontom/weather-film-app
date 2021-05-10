import React, { useState } from "react";
import {
  loadMovies,
  existsInStorage,
  removeMovieFromStorage,
} from "../utils/storage";
import MovieResult from "./MovieResult";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      marginBottom: "2em",
    },
  },
  title: {
    margin: theme.spacing(2),
  },
}));

const MovieLib = () => {
  const classes = useStyles();
  const [movieList, setMovieList] = useState(loadMovies());

  const handleRemove = (movie) => {
    if (!movie) return;
    if (existsInStorage(movie)) {
      const filteredList = removeMovieFromStorage(movie);
      setMovieList(filteredList);
    }
  };
  return (
    <div>
      <Typography className={classes.title} variant="h4">
        My movies
      </Typography>
      <Grid container spacing={3}>
        {movieList &&
          movieList.map((movie, i) => (
            <Grid item xs={12} md={4} lg={3}>
              <MovieResult
                movie={movie}
                handleRemove={handleRemove}
                removeFromLibEnabled={true}
                key={i}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default MovieLib;

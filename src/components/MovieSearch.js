import { useState } from "react";
import MovieResultList from "./MovieResultList";
// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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

const MovieSearch = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const handleFindMovie = (e) => {
    e.preventDefault();
    if (year.length === 0) {
      setSearchUrl(
        `http://www.omdbapi.com/?apikey=f4094dbc&s=${encodeURI(searchTerm)}`
      );
    } else {
      setSearchUrl(
        `http://www.omdbapi.com/?apikey=f4094dbc&s=${encodeURI(
          searchTerm
        )}&y=${year}`
      );
    }
  };

  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Search movie
      </Typography>
      <form className={classes.root} onSubmit={handleFindMovie}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Year"
          variant="outlined"
          size="small"
          onChange={(e) => setYear(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>

      {searchUrl.length !== 0 && <MovieResultList url={searchUrl} />}
    </div>
  );
};

export default MovieSearch;

import { useState, useEffect } from "react";
import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: "none",
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  card: {
    paddingTop: "2em",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  weatherIcon: {
    width: "20%",
  },
}));

const Home = () => {
  const [weatherDescription, setWeatherDescription] = useState("");
  const [celsius, setCelsius] = useState("");
  const [weatherIconUrl, setWeatherIconUrl] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const API_KEY = "c22c9e03b4e839562bb63b8f1e2f51ae";

  const classes = useStyles();

  useEffect(() => {
    const run = async () => {
      setIsPending(true);
      const coordinates = await getCoordinates();
      const dataString = await getWeather(coordinates);
      const data = JSON.parse(dataString);
      setCelsius(data.main.temp + " C°");
      const temp = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const weatherIcon = data.weather[0].icon;
      setWeatherDescription(weatherDescription);
      setWeatherIconUrl(`http://openweathermap.org/img/wn/${weatherIcon}.png`);
      setIsPending(false);
    };

    run();
  }, []);

  const getCoordinates = async () => {
    const coordinates = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
      lat: coordinates.coords.latitude,
      lon: coordinates.coords.longitude,
    };
  };

  const getWeather = async (coordinates) => {
    let res;
    let data;
    try {
      res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`
      );
      if (res.ok) {
        data = await res.text();
      } else {
        console.log("An error has occured");
      }
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  return (
    <div>
      {/* Hero */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Weather and movies
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Search through thousands of movies and save them in your personal
          collection.
        </Typography>
        <Link to="/search-movies" className={classes.link}>
          <Button variant="contained" color="primary">
            Search movie
          </Button>
        </Link>

        {isPending ? (
          <div>
            <Typography variant="h4" color="textPrimary">
              Pending...
            </Typography>
          </div>
        ) : (
          <Card className={classes.card}>
            <CardHeader
              title="Weather near you"
              subheader="Right now"
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{ align: "center" }}
              className={classes.cardHeader}
            />
            <CardContent>
              <div>
                <Typography variant="h3" color="textPrimary">
                  {celsius}
                </Typography>
              </div>
              <div>
                <Typography variant="h5" color="textPrimary">
                  {weatherDescription}
                </Typography>
              </div>
              <div>
                <img
                  className={classes.weatherIcon}
                  src={weatherIconUrl}
                  alt={weatherDescription}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default Home;

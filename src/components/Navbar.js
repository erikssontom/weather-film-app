import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
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
    textAlign: "left",
    textDecoration: "none",
    color: "black",
  },
  navItem: {
    textDecoration: "none",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.toolbarTitle}>
            <Typography variant="h6">The weather and movie app</Typography>
          </Link>
          <Link to="/search-movies" className={classes.navItem}>
            <Typography variant="subtitle1">SEARCH MOVIES</Typography>
          </Link>
          <Link to="/my-movies" className={classes.navItem}>
            <Button
              href="#"
              color="primary"
              variant="contained"
              className={classes.link}
            >
              My movies
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;

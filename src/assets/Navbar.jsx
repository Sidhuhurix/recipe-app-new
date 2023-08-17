import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
    color: "#333",
    boxShadow: "none",
  },
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  navLink: {
    marginLeft: theme.spacing(4),
    textDecoration: "none",
    color: "#002bff",
    "&:hover": {
      color: "##ab00",
    },
  },
}));

export default function Navbar() {
  const className = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={className.Toolbar}>
        <Typography variant="h4">Recipe App</Typography>
        <Typography variant="h5" component="nav">
          <Link to="/" className={className.navLink}>
            Home
          </Link>
          <Link to="/recipe" className={className.navLink}>
            Recipes
          </Link>
          {/* <Link to="/recipe/Add-Recipe" className={className.navLink}>
            Add Recipe
          </Link> */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

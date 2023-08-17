import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { recipes } from "../data";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  Card: {
    padding: theme.spacing(4),
  },
  CardMedia: {
    // padding: "1em 2em",
    height: "350px",
    borderRadius: "100px",
  },
}));
export default function Recipe() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const className = useStyles();
  const { id } = useParams();
  console.log(id);
  const Recipes = recipes.find((item) => item.Id == id);
  console.log(Recipes);

  useEffect(() => {
    fetch("https://64c3961867cfdca3b65fef6d.mockapi.io/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false); // Data is fetched, set loading to false
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even in case of error
      });
  }, []);
  return (
    <Container maxWidth="md" className={className.root}>
      <Card className={className.Card}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : Recipes ? (
          <>
            <CardMedia
              component="img"
              image={Recipes.Image}
              title={Recipes.Title}
              className={className.CardMedia}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h4"
                style={{ textAlign: "center" }}
              >
                <p> {Recipes.Title} </p>
              </Typography>
              <Typography variant="h6" component="h6">
                Ingredients:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="ol">
                {Recipes.Ingredients.map((Ingredients, index) => (
                  <li key={index}>{Ingredients}</li>
                ))}
              </Typography>
              <Typography variant="h6" component="h6">
                Instructions:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="ol">
                {Recipes.Instructions.map((Instructions, index) => (
                  <li key={index}>{Instructions}</li>
                ))}
              </Typography>
            </CardContent>
          </>
        ) : (
          <Typography>No recipe found.</Typography>
        )}
      </Card>
    </Container>
  );
}

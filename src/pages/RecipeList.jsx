import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
// import { recipes } from "../data";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  cardList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "10px",
    margin: "2em",
    justifyContent: "center",
  },
  Card: {
    margin: "1em",
    cursor: "pointer",
  },
  cardMedia: {
    borderRadius: "20px",
    margin: "1em 2em",
    height: "350px",
    width: "300px",
    cursor: "pointer",
  },
  cardTitle: {
    textAlign: "center",
  },
});
export default function RecipeList() {
  const className = useStyles();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://64c3961867cfdca3b65fef6d.mockapi.io/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleterecipe = (Id) => {
    console.log("deleting...", Id);
    fetch("https://64c3961867cfdca3b65fef6d.mockapi.io/recipes/" + Id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => navigate("/recipe"))

      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };

  return (
    <div>
      <Typography varient="h5" align="center" gutterBottom>
        Recipes
      </Typography>
      <div className={className.cardList}>
        {recipes.map((recipes) => (
          <Card
            key={recipes.Id}
            onClick={() => navigate(`/recipe/${recipes.Id}`)}
            className={className.Card}
          >
            <CardMedia
              image={recipes.Image}
              title={recipes.Title}
              className={className.cardMedia}
            />
            <CardContent>
              <Typography
                variant="h5"
                component="h5"
                className={className.cardTitle}
              >
                {recipes.Title}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleterecipe(recipes.Id)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

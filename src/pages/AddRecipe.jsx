import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddRecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    Title: "",
    Image: "",
    Ingredients: [],
    Instructions: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "Ingredients" || name === "Instructions") {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value.split("\n").filter((item) => item !== ""), // Split into array by new lines and filter out empty items
      }));
    } else {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };

  const addNewRecipe = (event) => {
    event.preventDefault();

    fetch("https://64c3961867cfdca3b65fef6d.mockapi.io/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/recipe");
      })
      .catch((error) => {
        console.error("Adding recipe:", error);
      });
  };

  return (
    <form onSubmit={addNewRecipe}>
      <TextField
        name="Title"
        type="text"
        placeholder="title name"
        defaultValue={recipe.title}
        onChange={handleInputChange}
        required
      />
      <TextField
        name="Image"
        type="text"
        placeholder="image URL"
        defaultValue={recipe.image}
        onChange={handleInputChange}
        required
      />
      <TextField
        name="Ingredients"
        multiline
        rows={4}
        placeholder="Add Ingredients (one per line)"
        defaultValue={recipe.Ingredients.join("\n")}
        onChange={handleInputChange}
        required
      />
      <TextField
        name="Instructions"
        multiline
        rows={4}
        placeholder="Add Instructions (one per line)"
        defaultValue={recipe.Instructions.join("\n")}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipe;

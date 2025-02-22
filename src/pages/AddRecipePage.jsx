import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("all"); // 🔹 Category Field
  const [difficulty, setDifficulty] = useState("all"); // 🔹 Difficulty Level Field
 const [MealType, setMealType] = useState("all");
  const [TimeRequired, setTimeRequired] = useState("all");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to log in to add a recipe!");
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients,
      instructions,
      image,
      category,
      difficulty, // 🔹 Save difficulty level
      addedBy: user.username,
    };

    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = [...storedRecipes, newRecipe];

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    navigate("/recipes");
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/4108723/pexels-photo-4108723.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
    <div className="container mt-4">
      <h2 style={{textAlign:"center",color: "black", fontStyle: "italic" }}>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Title" style={{ color: "black", fontStyle: "italic" }} value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="form-control mb-2" placeholder="Ingredients" style={{ color: "black", fontStyle: "italic" }} value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        <textarea className="form-control mb-2" placeholder="Instructions" style={{ color: "black", fontStyle: "italic" }} value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        <input type="text" className="form-control mb-2" placeholder="Image URL"style={{ color: "black", fontStyle: "italic" }} value={image} onChange={(e) => setImage(e.target.value)} />

        {/* 🔹 Category Dropdown */}
        <select className="form-control mb-2" style={{ color: "black", fontStyle: "italic" }}value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="main course" style={{ color: "black", fontStyle: "italic" }}>Main Course</option>
          <option value="dessert" style={{ color: "black", fontStyle: "italic" }}>Dessert</option>
          <option value="appetizer" style={{ color: "black", fontStyle: "italic" }}>Appetizer</option>
        </select>

        {/* 🔹 Difficulty Level Dropdown */}
        <select className="form-control mb-2" style={{ color: "black", fontStyle: "italic" }}value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy" style={{ color: "black", fontStyle: "italic" }}>Easy</option>
          <option value="medium" style={{ color: "black", fontStyle: "italic" }}>Medium</option>
          <option value="hard" style={{ color: "black", fontStyle: "italic" }}>Hard</option>
        </select>
        <select className="form-control mb-2" style={{ color: "black", fontStyle: "italic" }}value={MealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="main course" style={{ color: "black", fontStyle: "italic" }}>Vegan </option>
          <option value="dessert" style={{ color: "black", fontStyle: "italic" }}>Vegetarian</option>
          <option value="appetizer" style={{ color: "black", fontStyle: "italic" }}>Non-Vegetarian</option>
        </select>
        <select className="form-control mb-2" style={{ color: "black", fontStyle: "italic" }}value={TimeRequired} onChange={(e) => setTimeRequired(e.target.value)}>
          <option value="main course" style={{ color: "black", fontStyle: "italic" }}>less than 15 mins</option>
          <option value="dessert" style={{ color: "black", fontStyle: "italic" }}>15-30 mins</option>
          <option value="appetizer" style={{ color: "black", fontStyle: "italic" }}>above 30 mins</option>
        </select>

        <button type="submit" className="btn-green">Add Recipe</button>
      </form>
    </div>
    </div>
  );
};

export default AddRecipe;

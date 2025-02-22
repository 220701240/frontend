import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeList from "./pages/RecipeList";
import FavoritesPage from "./pages/FavoritesPage";
import Profile from "./pages/Profile";
import RecipeDetails from "./pages/RecipeDetails"; 

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [recipes, setRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  });

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Save to localStorage whenever recipes or favorites change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Function to add a recipe
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  // Function to save a recipe to favorites
  const saveToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <AuthProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />

        <Route path="/recipes" element={<RecipeList recipes={recipes} saveToFavorites={saveToFavorites} />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/add-recipe" element={<ProtectedRoute><AddRecipePage addRecipe={addRecipe} /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage favorites={favorites} /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

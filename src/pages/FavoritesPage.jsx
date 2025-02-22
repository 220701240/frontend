import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      setFavorites(storedFavorites);
    }
  }, [user]);

  const removeFromFavorites = (recipeId) => {
    if (user) {
      const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
      setFavorites(updatedFavorites);
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center text-white"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="container mt-4">
        <h2 style={{ color: "black", fontStyle: "italic" }}>My Favorite Recipes</h2>

        {favorites.length === 0 ? (
          <p className="text-dark">No favorites yet!</p>
        ) : (
          favorites.map((recipe) => (
            <div key={recipe.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title" style={{ color: "black", fontStyle: "italic" }}>
                  <strong>Title:</strong> {recipe.title}
                </h5>
                <p className="card-text" style={{ color: "black", fontStyle: "italic" }}>
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p className="card-text" style={{ color: "black", fontStyle: "italic" }}>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt="Recipe"
                    className="img-fluid rounded"
                    style={{ maxWidth: "200px" }}
                  />
                )}
                <button className="btn btn-danger mt-2" style={{marginLeft:"100px"}}onClick={() => removeFromFavorites(recipe.id)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";


const RecipeList = ({ username }) => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([ { id: 1, title: "Pasta Carbonara", category: "Dinner", difficulty: "Medium", mealType: "Non-Vegetarian", timeRequired: "15-30 mins", ingredients: "Pasta, Eggs, Cheese", instructions: "Cook pasta, mix eggs, add cheese" },
    { id: 2, title: "Chicken Biryani", category: "Lunch", difficulty: "Hard", mealType: "Non-Vegetarian", timeRequired: "above 30 mins", ingredients: "Rice, Chicken, Spices", instructions: "Cook rice, prepare chicken, mix spices" },
    { id: 3, title: "Chocolate Cake", category: "Dessert", difficulty: "Medium", mealType: "Vegetarian", timeRequired: "above 30 mins", ingredients: "Flour, Cocoa, Eggs", instructions: "Mix ingredients, bake" }
  ]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterMealType, setFilterMealType] = useState("all");
  const [filterTimeRequired, setFilterTimeRequired] = useState("all");
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [updatedRecipe, setUpdatedRecipe] = useState({});
  const [reviewInputs, setReviewInputs] = useState({});

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);

    if (user) {
      const userFavorites = JSON.parse(localStorage.getItem(`favorites_${user.username}`)) || [];
      setFavorites(userFavorites);
    }
  }, [user]);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterCategory === "all" || recipe.category === filterCategory) &&
    (filterDifficulty === "all" || recipe.difficulty === filterDifficulty)&&
    (filterMealType === "all" || recipe.mealType.toLowerCase() === filterMealType.toLowerCase()) &&
  (filterTimeRequired === "all" || recipe.timeRequired.replace(/\s/g, '') === filterTimeRequired.replace(/\s/g, ''))
  );
  

  // const saveToFavorites = (recipe) => {
  //   if (!favorites.find((fav) => fav.id === recipe.id)) {
  //     const updatedFavorites = [...favorites, recipe];
  //     setFavorites(updatedFavorites);
  //     localStorage.setItem(`favorites_${username}`, JSON.stringify(updatedFavorites));
  //   }
  // };

  const saveToFavorites = (recipe) => {
    if (!favorites.find((fav) => fav.id === recipe.id)) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem(`favorites_${username}`, JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${username}`, JSON.stringify(updatedFavorites));
  };


  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    alert("Recipe deleted!");
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe.id);
    setUpdatedRecipe({ ...recipe }); // Ensure all fields are copied
  };
  
  const handleUpdate = () => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editingRecipe ? { ...recipe, ...updatedRecipe } : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setEditingRecipe(null);
    alert("Recipe updated!");
  };
  
  const handleRatingChange = (recipeId, rating) => {
      const updatedRecipes = recipes.map((recipe) => 
        recipe.id === recipeId ? { ...recipe, rating } : recipe
      );
      setRecipes(updatedRecipes);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    };
  
    // ✅ Handle review submission
    const handleReviewSubmit = (recipeId) => {
      const review = reviewInputs[recipeId]?.trim();
      if (!review) return;
  
      const updatedRecipes = recipes.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, reviews: [...(recipe.reviews || []), review] }
          : recipe
      );
      setRecipes(updatedRecipes);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      setReviewInputs({ ...reviewInputs, [recipeId]: "" });
    };
   

  return (
    <div className="container-fluid text-white" style={{ backgroundImage: "url('https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg')", backgroundSize: "cover", minHeight: "100vh", padding: "20px" }}>
      <h1 className="text-center text-black" style={{ fontStyle: "italic" }}>Recipe List</h1>

      {/* Search Bar */}
      <input type="text" placeholder="Search recipes..." className="form-control w-50 my-2" value={searchQuery} style={{alignItems:"center",justifyContent:"center",marginLeft:"300px",color:"black"}} onChange={(e) => setSearchQuery(e.target.value)} />

      {/* Filters */}
      <div className="d-flex my-3">
        <select className="form-select w-25 me-3" value={filterCategory} style={{alignItems:"center",justifyContent:"center",marginLeft:"300px"}} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>

        <select className="form-select w-25" value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
          <option value="all">All Difficulty Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="d-flex my-3">
        <select className="form-select w-25 me-3" value={filterMealType} style={{ alignItems: "center", justifyContent: "center", marginLeft: "300px" }} onChange={(e) => setFilterMealType(e.target.value)}>
          <option value="all">All Meal Types</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
        </select>

        <select className="form-select w-25" value={filterTimeRequired} onChange={(e) => setFilterTimeRequired(e.target.value)}>
          <option value="all">All Time Requirements</option>
          <option value="less than 15 mins"> less than 15 mins</option>
          <option value="15-30 mins">15-30 mins</option>
          <option value="above 30 mins"> above 30 mins</option>
        </select>
      </div>

      {/* Recipe List */}
      <div className="container mt-4">
        {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="card mb-3">
            <div className="card-body">
              {editingRecipe === recipe.id ? (
                <>
                  <input type="text" className="form-control my-2" value={updatedRecipe.title} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })} />
                  <input type="text" className="form-control my-2" value={updatedRecipe.category} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, category: e.target.value })} />
                  <input type="text" className="form-control my-2" value={updatedRecipe.difficulty} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, difficulty: e.target.value })} />
                  <input type="text" className="form-control my-2" value={updatedRecipe.mealType} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, mealType: e.target.value })} placeholder="Meal Type" />
                  <input type="text" className="form-control my-2" value={updatedRecipe.timeRequired} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, timeRequired: e.target.value })} placeholder="Time Required" />
                  <textarea className="form-control my-2" value={updatedRecipe.ingredients} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, ingredients: e.target.value })}></textarea>
                  <textarea className="form-control my-2" value={updatedRecipe.instructions} onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, instructions: e.target.value })}></textarea>
                  <button className="btn btn-success mx-2" onClick={handleUpdate}>Save</button>
                  <button className="btn btn-secondary mx-2" onClick={() => setEditingRecipe(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h5 className="card-title">{recipe.title}</h5>
                  <p><strong>Category:</strong> {recipe.category}</p>
                  <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                  <p><strong>Meal Type:</strong> {recipe.mealType}</p>
                 <p><strong>Time Required:</strong> {recipe.timeRequired}</p>
                  <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                  {recipe.image && <img src={recipe.image} alt="Recipe" className="img-fluid" style={{ maxWidth: "200px" }} />}
                    

                  {user  && recipe.addedBy === user.username &&(
                    <>
                      <button className="btn-light-grey mx-2 " onClick={() => handleEdit(recipe)}>Update</button>
                      <button className="btn-light-grey mx-2" onClick={() => handleDelete(recipe.id)}>Delete</button>
                      <button className="btn-light-grey mx-2" onClick={() => saveToFavorites(recipe)}>Save to Favorites</button>
                    </>
                  )}
                  {/* {user && favorites.some((fav) => fav.id === recipe.id) && (
                    <button className="btn btn-warning mx-2" onClick={() => removeFromFavorites(recipe.id)}>Remove from Favorites</button>
                  )} */}
                   {/* 🔹 Rating System */}
              <p>Rating: {recipe.rating || "Not rated"}</p>
              <select
                onChange={(e) => handleRatingChange(recipe.id, parseInt(e.target.value))}
                value={recipe.rating || 0}
              >
                <option value="0">Rate this recipe</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>

              {/* 🔹 Review Section */}
              <h4>Reviews</h4>
              <ul>
                {(recipe.reviews || []).map((review, idx) => (
                  <li key={idx} style={{ fontStyle: "italic" }}>- {review}</li>
                ))}
              </ul>

              <input
                type="text"
                className="form-control my-2"
                placeholder="Write a review..."
                value={reviewInputs[recipe.id] || ""}
                onChange={(e) => setReviewInputs({ ...reviewInputs, [recipe.id]: e.target.value })}
              />
              <button className="btn-lightgrey" onClick={() => handleReviewSubmit(recipe.id)}>Submit Review</button>
                </>
              )}
            </div>
          </div>
        )) : <p style={{color:"black" ,fontStyle:"italic",fontSize:"100 px",marginLeft:"400px"}}>No recipes found.</p>}
      </div>
    </div>
  );
};

export default RecipeList;

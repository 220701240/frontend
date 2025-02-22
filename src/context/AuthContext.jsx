import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // User authentication state
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Shared global recipes list
  const [recipes, setRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  // Favorites stored per user
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  // Persist recipes and favorites to localStorage
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [recipes, favorites]);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  // Function to save a recipe to the user's favorites
  const saveToFavorites = (recipe) => {
    if (!user) return;
    setFavorites((prevFavorites) => {
      const updatedFavorites = { 
        ...prevFavorites, 
        [user.email]: [...(prevFavorites[user.email] || []), recipe] 
      };
      return updatedFavorites;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, recipes, addRecipe, favorites, saveToFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

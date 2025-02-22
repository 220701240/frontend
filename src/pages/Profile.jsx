import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  // State to store user details
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@example.com",
    joined: "N/A",
  });

  // Fetch user details when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Retrieve from local storage
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center text-white"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/8205144/pexels-photo-8205144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Welcome Section */}
      <div className="text-center mb-4" style={{ color: "black", fontStyle: "italic" }}>
        <h1>Welcome, {user.name} 👋</h1>
        <p>Email: {user.email}</p>
      </div>

      {/* Profile Card */}
      <div
        className="card p-4 text-dark"
        style={{
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          color: "black",
          fontStyle: "italic",
        }}
      >
        <h2 className="text-center">Your Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {/* <p>
          <strong>Joined:</strong> {user.joined}
        </p> */}
      </div>

      {/* Suggested Content for Engagement */}
      <div className="mt-5 text-center" style={{ maxWidth: "600px", color: "black", fontStyle: "italic" }}>
        <h3>🍽️ Discover New Flavors!</h3>
        <p>
          Explore a world of mouth-watering recipes from different cuisines.
          Try something <strong>new today</strong> and bring excitement to your kitchen!
        </p>
        <h4>🔥 Trending Recipes</h4>
        <p>Check out what's popular and see what others are cooking!</p>
        <button className="btn btn-warning mt-2" onClick={() => navigate("/recipes")}>
          Browse Recipes
        </button>
      </div>
    </div>
  );
};

export default Profile;

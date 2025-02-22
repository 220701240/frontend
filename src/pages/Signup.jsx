import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles.css"; // Import external CSS file

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    const userExists = existingUsers.some(user => user.email === formData.email);

    if (userExists) {
      alert("Email already registered! Please log in.");
      return;
    }

    // Add new user to the users list
    const updatedUsers = [...existingUsers, formData];

    // Save updated users list to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    login(formData);
    navigate("/profile");
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4033639/pexels-photo-4033639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="auth-card">
        <h2 className="auth-title">📝 Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="auth-input" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="auth-input" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="auth-input" />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

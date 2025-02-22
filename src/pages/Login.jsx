import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles.css"; // Import external CSS file

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the users list from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user matching the entered credentials
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      login(user);
      navigate("/profile");
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="auth-card">
        <h2 className="auth-title">🔑 Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="auth-input" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="auth-input" />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // same css as login

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: "user" }), // force user role
    });

    const data = await res.json();
    if (res.ok) {
      alert("🎉 Signup successful! Please login.");
      navigate("/login");
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">📝 Create Account</h2>
        <p className="login-subtitle">Join us and start your journey</p>

        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button className="login-btn" onClick={handleSignup}>
          🚀 Signup
        </button>

        <p className="signup-text">
          Already have an account?{" "}
          <span
            className="signup-link"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

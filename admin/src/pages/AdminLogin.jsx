import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // This sends your credentials to your backend server on port 5000
      const res = await axios.post("http://localhost:5000/api/auth/login", { 
        email, 
        password 
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard"); // This sends you to the dashboard on success
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Login</h2>
        {error && <p style={errorStyle}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="admin@test.com" 
          style={inputStyle} 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={inputStyle} 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" style={buttonStyle}>Login to Dashboard</button>
      </form>
    </div>
  );
}

const containerStyle = { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0f172a", color: "white" };
const formStyle = { background: "#1e293b", padding: "40px", borderRadius: "12px", width: "320px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" };
const inputStyle = { width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #334155", background: "#0f172a", color: "white", boxSizing: "border-box" };
const buttonStyle = { width: "100%", padding: "12px", marginTop: "10px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", width: "100%" };
const errorStyle = { color: "#ef4444", textAlign: "center", background: "#450a0a", padding: "8px", borderRadius: "4px", fontSize: "14px" };
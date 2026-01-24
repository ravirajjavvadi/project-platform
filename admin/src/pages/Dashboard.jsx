import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminApi } from "../services/adminApi";

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, requests: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, reqRes] = await Promise.all([
          adminApi.get("/projects"),
          adminApi.get("/requests")
        ]);
        
        setStats({
          projects: projRes.data.length,
          requests: reqRes.data.length
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h1>🚀 Admin Control Center</h1>
          <p>Welcome back! Here is what's happening on ProjectPlatform.</p>
        </div>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </header>

      {loading ? (
        <p>Calculating stats...</p>
      ) : (
        <div style={statsGridStyle}>
          <div style={cardStyle}>
            <h3>Total Projects</h3>
            <span style={numberStyle}>{stats.projects}</span>
            <Link to="/manage-projects" style={linkStyle}>Manage Projects →</Link>
          </div>

          <div style={cardStyle}>
            <h3>User Inquiries</h3>
            <span style={numberStyle}>{stats.requests}</span>
            <Link to="/requests" style={linkStyle}>View Requests →</Link>
          </div>
        </div>
      )}

      <section style={{ marginTop: "40px" }}>
        <h2>Quick Actions</h2>
        <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
          <Link to="/manage-projects" style={buttonStyle}>Add New Project</Link>
          <Link to="/requests" style={{...buttonStyle, backgroundColor: "#10b981"}}>Check New Leads</Link>
        </div>
      </section>
    </div>
  );
}

const containerStyle = { padding: "40px", backgroundColor: "#0f172a", minHeight: "100vh", color: "white", fontFamily: "sans-serif" };
const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #334155", marginBottom: "30px", paddingBottom: "10px" };
const statsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" };
const cardStyle = { backgroundColor: "#1e293b", padding: "25px", borderRadius: "12px", border: "1px solid #334155", display: "flex", flexDirection: "column", gap: "10px" };
const numberStyle = { fontSize: "3rem", fontWeight: "bold", color: "#3b82f6" };
const linkStyle = { color: "#94a3b8", textDecoration: "none", fontSize: "0.9rem", marginTop: "10px" };
const buttonStyle = { padding: "12px 24px", backgroundColor: "#3b82f6", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold" };
const logoutBtn = { padding: "8px 16px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" };
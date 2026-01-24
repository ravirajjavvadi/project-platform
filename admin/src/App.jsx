import { Routes, Route, Navigate, Link } from "react-router-dom";
// Use an absolute-style relative path to ensure it's the right folder
import AdminLogin from "./pages/AdminLogin"; 
import Dashboard from "./pages/Dashboard";
import ManageProjects from "./pages/ManageProjects";
import Requests from "./pages/Requests";

// --- SIMPLE ADMIN NAVBAR ---
const AdminNavbar = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return (
    <nav style={{ padding: "15px", background: "#1e293b", display: "flex", gap: "20px" }}>
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
      <Link to="/manage-projects" style={{ color: "white", textDecoration: "none" }}>Projects</Link>
      <Link to="/requests" style={{ color: "white", textDecoration: "none" }}>User Requests</Link>
    </nav>
  );
};

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    // Redirect to login if no token found
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* Public Route: Login Page */}
      {/* If this path is "/admin" in your browser, change path="/" to path="/admin" */}
      <Route path="/" element={<AdminLogin />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
      />
      
      <Route 
        path="/manage-projects" 
        element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} 
      />
      
      <Route 
        path="/requests" 
        element={<ProtectedRoute><Requests /></ProtectedRoute>} 
      />

      {/* Catch-all: Redirect any unknown routes to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="client-navbar">
      <div className="navbar-logo">
        Project<span>Platform</span>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/request" className="nav-item">Request</Link>
        
       // Replace the old localhost:5174 link with your new Netlify Admin URL
<a 
  href="https://project-platform-admin.netlify.app" 
  className="admin-btn"
  target="_blank" 
  rel="noopener noreferrer"
>
  Admin
</a>
      </div>
    </nav>
  );
};

export default Navbar;
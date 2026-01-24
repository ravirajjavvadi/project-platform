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
        
       
<a 
  href="https://adminoff.netlify.app" 
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

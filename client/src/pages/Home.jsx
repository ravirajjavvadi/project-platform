import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is installed: npm install axios
import "./Home.css";

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const [projects, setProjects] = useState([]); // State for dynamic projects
  const [loading, setLoading] = useState(true);

  // Fetch projects from the backend database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <h1>Build Your Ideas With Us</h1>
        <p>
          Submit your project ideas and let our experts build them
          professionally.
        </p>

        <div className="hero-buttons">
          <Link to="/request" className="btn primary">
            Request Project
          </Link>
          
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects">
        <h2 className="section-title">🚀 Featured Projects</h2>
        <p className="section-subtitle">
          Premium solutions crafted with modern technologies
        </p>

        {loading ? (
          <p style={{ textAlign: "center", color: "white" }}>Loading projects...</p>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <div
                key={project._id}
                className="project-card"
                onClick={() => setActiveProject(project)}
              >
                <h3>{project.title}</h3>
                {/* Join the technologies array with dots for the UI */}
                <p className="stack">{project.technologies?.join(" • ")}</p>

                <div className="card-footer">
                  <span className="price">₹{project.price}</span>
                  <span className="view">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* POPUP MODAL */}
      {activeProject && (
        <div className="modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{activeProject.title}</h3>
            <p className="modal-stack">{activeProject.technologies?.join(" • ")}</p>
            <p className="modal-desc">{activeProject.description}</p>

            <div className="modal-footer">
              <span className="modal-price">₹{activeProject.price}</span>
              <span className="modal-contact">
                📞 +91 70360 86849
              </span>
            </div>

            <button
              className="btn primary"
              onClick={() => setActiveProject(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
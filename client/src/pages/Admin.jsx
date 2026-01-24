import "./Admin.css";

import { useEffect, useState } from "react";

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [project, setProject] = useState({
    title: "",
    stack: "",
    price: "",
  });

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(data);
  }, []);

  function addProject(e) {
    e.preventDefault();

    const existing =
      JSON.parse(localStorage.getItem("projects")) || [];

    localStorage.setItem(
      "projects",
      JSON.stringify([...existing, project])
    );

    alert("Project added!");
    setProject({ title: "", stack: "", price: "" });
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* USER REQUESTS */}
      <section>
        <h2>User Requests</h2>

        {requests.length === 0 && <p>No requests yet</p>}

        {requests.map((r, i) => (
          <div className="request-row" key={i}>
            <strong>{r.name}</strong>
            <span>{r.mobile}</span>
            <p>{r.description}</p>
          </div>
        ))}
      </section>

      {/* ADD PROJECT */}
      <section>
        <h2>Add Project</h2>

        <form className="project-form" onSubmit={addProject}>
          <input
            placeholder="Project Title"
            value={project.title}
            onChange={(e) =>
              setProject({ ...project, title: e.target.value })
            }
            required
          />
          <input
            placeholder="Tech Stack"
            value={project.stack}
            onChange={(e) =>
              setProject({ ...project, stack: e.target.value })
            }
          />
          <input
            placeholder="Price"
            value={project.price}
            onChange={(e) =>
              setProject({ ...project, price: e.target.value })
            }
          />
          <button>Add Project</button>
        </form>
      </section>
    </div>
  );
}

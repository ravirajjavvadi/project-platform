import { useState, useEffect } from "react";
import { adminApi } from "../services/adminApi";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", description: "", technologies: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await adminApi.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, technologies: typeof form.technologies === 'string' ? form.technologies.split(",") : form.technologies };
    
    try {
      if (editingId) {
        await adminApi.put(`/projects/${editingId}`, data);
      } else {
        await adminApi.post("/projects", data);
      }
      setForm({ title: "", price: "", description: "", technologies: "" });
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      alert("Action failed. Check admin permissions.");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({ 
      title: p.title, 
      price: p.price, 
      description: p.description, 
      technologies: p.technologies.join(",") 
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      try {
        await adminApi.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h2 style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "10px" }}>
        {editingId ? "✏️ Edit Project" : "➕ Add New Project"}
      </h2>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <input style={inputStyle} placeholder="Project Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input style={inputStyle} placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input style={inputStyle} placeholder="Technologies (comma separated: React, Node)" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} />
        <textarea style={{...inputStyle, minHeight: "100px"}} placeholder="Project Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={btnPrimary}>{editingId ? "Update Project" : "Add Project"}</button>
          {editingId && <button onClick={() => {setEditingId(null); setForm({title:"", price:"", description:"", technologies:""})}} style={btnSecondary}>Cancel</button>}
        </div>
      </form>

      <h3>Existing Projects</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#1e293b" }}>
            <th style={tdStyle}>Title</th>
            <th style={tdStyle}>Price</th>
            <th style={tdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p._id} style={{ borderBottom: "1px solid #334155" }}>
              <td style={tdStyle}>{p.title}</td>
              <td style={tdStyle}>₹{p.price}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(p)} style={{ marginRight: "10px", color: "#3b82f6", background: "none", border: "none", cursor: "pointer" }}>Edit</button>
                <button onClick={() => handleDelete(p._id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const formStyle = { display: "flex", flexDirection: "column", gap: "15px", maxWidth: "600px", margin: "20px 0 40px 0", padding: "20px", backgroundColor: "#1e293b", borderRadius: "8px" };
const inputStyle = { padding: "12px", borderRadius: "5px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "white" };
const tdStyle = { padding: "12px", textAlign: "left" };
const btnPrimary = { padding: "12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" };
const btnSecondary = { padding: "12px", backgroundColor: "#64748b", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };
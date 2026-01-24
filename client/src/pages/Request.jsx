import "./Request.css";
import { useState } from "react";
import axios from "axios"; // Make sure to run 'npm install axios'

export default function Request() {
  const [form, setForm] = useState({
    name: "",
    phone: "", // Synchronized with backend schema
    email: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update this URL to match your backend port (likely 5000 or 8000)
      const response = await axios.post("http://localhost:5000/api/requests", form);
      
      if (response.data.success) {
        alert("Request submitted successfully! We will contact you soon.");
        setForm({ name: "", phone: "", email: "", description: "" }); // Clear form
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="request-page">
      <form className="request-card" onSubmit={handleSubmit}>
        <h2>Project Request</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone" // Changed name to match schema
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe your project"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}
import React from "react";

export default function AdminLogin() {
  return (
    <div className="page center">
      <div className="card glass animate">
        <h2>Admin Login</h2>

        <input type="text" placeholder="Admin Username" />
        <input type="password" placeholder="Password" />

        <button className="btn primary">Login</button>
      </div>
    </div>
  );
}

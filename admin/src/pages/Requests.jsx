import { useState, useEffect } from "react";
import { adminApi } from "../services/adminApi";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await adminApi.get("/requests");
        setRequests(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white", backgroundColor: "#0f172a", minHeight: "100vh" }}>
      <h2 style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "10px" }}>
        📩 User Project Requests
      </h2>

      {loading ? (
        <p>Loading inquiries...</p>
      ) : requests.length === 0 ? (
        <p>No requests found yet.</p>
      ) : (
        <div style={{ overflowX: "auto", marginTop: "20px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#1e293b" }}>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Mobile</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={tableCellStyle}>{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td style={tableCellStyle}><strong>{req.name}</strong></td>
                  <td style={tableCellStyle}>{req.phone}</td>
                  <td style={tableCellStyle}>{req.email}</td>
                  <td style={tableCellStyle}>{req.description}</td>
                  <td style={tableCellStyle}>
                    <span style={statusBadgeStyle}>{req.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const tableHeaderStyle = { padding: "12px", borderBottom: "1px solid #334155" };
const tableCellStyle = { padding: "12px" };
const statusBadgeStyle = { backgroundColor: "#1e40af", padding: "4px 8px", borderRadius: "4px", fontSize: "0.8rem" };
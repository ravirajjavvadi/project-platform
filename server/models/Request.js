import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // Changed from mobile to phone for consistency
  description: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Useful for Admin tracking
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Request", requestSchema);
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  technologies: [String], // Array of strings like ["React", "Node.js"]
  category: { type: String, default: "Major" }, // Mini or Major
  imageUrl: { type: String }, // For project thumbnails
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", projectSchema);
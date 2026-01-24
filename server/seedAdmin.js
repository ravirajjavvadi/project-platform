import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@test.com" });
    if (adminExists) {
      console.log("Admin already exists!");
      process.exit();
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await User.create({
      name: "Main Admin",
      email: "admin@test.com",
      password: hashedPassword,
      isAdmin: true
    });

    console.log("✅ Admin user created: admin@test.com / admin123");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedAdmin();
import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const { name, email, phone, description } = req.body;
    const newRequest = await Request.create({ name, email, phone, description });
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
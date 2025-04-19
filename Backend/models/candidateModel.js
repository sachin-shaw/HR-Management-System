// models/Candidate.js
import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    experience: { type: Number, required: true },
    resumeUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);

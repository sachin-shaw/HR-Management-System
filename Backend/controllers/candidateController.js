import Candidate from "../models/candidateModel.js";
import https from "https";
import fs from "fs";
import path from "path";

export const createCandidate = async (req, res) => {
  try {
    const { fullName, email, phone, position, experience } = req.body;

    const resumeUrl = req.file?.path;

    if (!resumeUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Resume file is required" });
    }

    const newCandidate = new Candidate({
      fullName,
      email,
      phone,
      position,
      experience,
      resumeUrl,
    });

    await newCandidate.save();

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      data: newCandidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating candidate",
      error: error.message,
    });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    // Fetch all candidates from DB, sorted by creation date (latest first)
    const candidates = await Candidate.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All candidates fetched successfully",
      data: candidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidates",
    });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const candidateId = req.params.id;

    const candidate = await Candidate.findById(candidateId);
    if (!candidate || !candidate.resumeUrl) {
      return res.status(404).json({
        success: false,
        message: "Resume not found for this candidate",
      });
    }

    const fileUrl = candidate.resumeUrl;
    const fileName = path.basename(fileUrl);

    // Pipe remote file to client
    https
      .get(fileUrl, (fileRes) => {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fileName}"`
        );
        res.setHeader("Content-Type", "application/pdf");

        fileRes.pipe(res);
      })
      .on("error", (err) => {
        console.error("Error downloading file:", err);
        res
          .status(500)
          .json({ success: false, message: "Failed to download resume" });
      });
  } catch (error) {
    console.error("Download resume error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while downloading resume",
    });
  }
};

export const deleteCandidate = async (req, res) => {
  const { id } = req.params; // Extract candidate ID from URL parameters

  try {
    // Find and delete the candidate by ID
    const candidate = await Candidate.findByIdAndDelete(id);

    // If candidate is not found
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // If candidate deleted successfully
    return res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

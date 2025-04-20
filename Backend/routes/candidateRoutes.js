// routes/candidateRoutes.js
import express from "express";
import {
  createCandidate,
  getAllCandidates,
  downloadResume,
  deleteCandidate,
  updateCandidateStatus,
} from "../controllers/candidateController.js";
import { validateCandidate } from "../middlewares/validateCandidate.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("resume"),
  validateCandidate,
  createCandidate
);

router.get("/", getAllCandidates);

router.get("/download-resume/:id", downloadResume);

router.delete("/delete-candidate/:id", deleteCandidate);

router.patch("/update-status/:id", updateCandidateStatus);

export default router;

// routes/candidateRoutes.js
import express from "express";
import {
  createCandidate,
  getAllCandidates,
  downloadResume,
  deleteCandidate,
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

export default router;

// middlewares/validateCandidate.js
import { body, validationResult } from "express-validator";

export const validateCandidate = (req, res, next) => {
  const { fullName, email, phone, position, experience } = req.body;

  if (!fullName || !email || !phone || !position || !experience) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Optional: basic email/phone format checks
  const emailRegex = /\S+@\S+\.\S+/;
  const phoneRegex = /^[0-9]{10}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid phone number" });
  }

  next();
};

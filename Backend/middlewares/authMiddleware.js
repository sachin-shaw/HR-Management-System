import JWT from "jsonwebtoken";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    // Check if authorization header exists
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .json({ message: "No token provided, authorization denied" });
    }

    // Extract token from Bearer
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);

    // Send appropriate error response if token is invalid or expired
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

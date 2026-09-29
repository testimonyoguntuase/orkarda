import jwt from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    let verified = jwt.verifyToken(token);
    req.user = verified;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};


export default authMiddleware
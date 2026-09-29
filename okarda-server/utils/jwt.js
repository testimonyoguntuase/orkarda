import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (payload, role) => {
  payload.role = role;

  let token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

const verifyToken = (token) => {
  jwt.verify(token, SECRET_KEY);
};

export default { generateToken, verifyToken };

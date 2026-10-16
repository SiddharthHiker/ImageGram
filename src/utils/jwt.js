import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";


export const generateJwtToken = (payload) => {
  const secret = JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const VerifyJWT = (token) => {
   return jwt.verify(token,JWT_SECRET);
}

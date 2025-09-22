import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "1h" });
};

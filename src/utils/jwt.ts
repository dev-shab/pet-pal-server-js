import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/utils/config.js";

export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "1d" });
};

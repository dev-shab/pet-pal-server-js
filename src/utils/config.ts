import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const JWT_SECRET = getEnv("JWT_SECRET");
export const MONGOOSE_CONNECTION_STRING = getEnv("MONGOOSE_CONNECTION_STRING");
export const PORT = getEnv("PORT", "3000");

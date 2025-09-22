import { User } from "@/models/user.js";
import { generateToken } from "@/utils/jwt.js";
import bcrypt from "bcrypt";

export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  role: string = "OWNER"
) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
    role,
  });
  const token = generateToken(user._id.toString(), user.role);

  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(existingUser._id.toString(), existingUser.role);

  return { user: existingUser, token };
};

import { type NextFunction, type Request, type Response } from "express";
import { loginUser, signUpUser } from "@/services/userService.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;
    const { user, token } = await signUpUser(name, email, password, role);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "User already exists") {
      res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    } else {
      next(error);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "User does not exist" ||
        error.message === "Invalid credentials")
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    } else {
      next(error);
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User Logged out successfully",
  });
};

import { type NextFunction, type Request, type Response } from "express";
import { signUpUser } from "@/services/userService.js";

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

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User Logged out successfully",
  });
};

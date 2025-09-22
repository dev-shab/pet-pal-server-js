import { signUp } from "@/controllers/userController.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", asyncHandler(signUp));

export default userRouter;

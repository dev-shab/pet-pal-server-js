import { login, logout, signUp } from "@/controllers/userController.js";
import { asyncHandler } from "@/utils/asyncHandler.js";
import { Router } from "express";

const userRouter = Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signs up a new user
 *     description: Creates a new user account with provided details and returns an authentication token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The full name of the user.
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's unique email address.
 *                 example: jane.doe@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: The user's password.
 *                 example: 'SecurePass123'
 *               role:
 *                 type: string
 *                 description: The role of the user. Defaults to 'OWNER'.
 *                 enum:
 *                   - OWNER
 *                   - VET
 *                   - VENDOR
 *                   - SHELTER
 *                   - ADMIN
 *                 default: OWNER
 *                 example: OWNER
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 65b38226cb836f9e6cff7263
 *                         name:
 *                           type: string
 *                           example: Jane Doe
 *                         email:
 *                           type: string
 *                           example: jane.doe@example.com
 *                         role:
 *                           type: string
 *                           example: OWNER
 *       '409':
 *         description: Conflict (User with email already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User already exists
 */
userRouter.post("/signup", asyncHandler(signUp));

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user and sets a JWT in an HttpOnly cookie.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's unique email address.
 *                 example: jane.doe@example.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: The user's password.
 *                 example: 'SecurePass123'
 *     responses:
 *       '200':
 *         description: User Login successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 65b38226cb836f9e6cff7263
 *                         name:
 *                           type: string
 *                           example: Jane Doe
 *                         email:
 *                           type: string
 *                           example: jane.doe@example.com
 *                         role:
 *                           type: string
 *                           example: OWNER
 *       '401':
 *         description: Invalid Credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid Credentials
 */
userRouter.post("/login", asyncHandler(login));

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears the authentication cookie and logs out the user.
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User Logged out successfully
 */
userRouter.post("/logout", asyncHandler(logout));

export default userRouter;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                 email: "teste@email.com"
 *                 password: "12345"
 *     responses:
 *       '200':
 *         description: Successfully logged in.
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '404':
 *         description: Not found. User with the specified username does not exist.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                  type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *                 full_name: "Pedro Chaves de Carvalho"
 *                 email: "teste@email.com"
 *                 password: "12345"
 *     responses:
 *       '201':
 *         description: Successfully registered a new user.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '409':
 *         description: Conflict. User with the same email already exists.
 */

import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

export default router;

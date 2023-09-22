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

import AuthController from "../controllers/AuthController";
import BaseRoutes from "./abstract/BaseRoutes";
import { body } from "express-validator";
import { Router } from "express";

export default class AuthRoutes extends BaseRoutes {
  constructor(protected controller: AuthController = new AuthController()) {
    super(controller);
  }

  get router(): Router {
    this._router.post(
      "/register",
      [
        body("full_name")
          .isString()
          .withMessage("Nome completo inválido")
          .isLength({ min: 1 })
          .withMessage("Insira o nome completo"),
        body("email").isEmail().withMessage("Email inválido"),
        body("password")
          .isLength({ min: 8 })
          .withMessage("Senha deve ter pelo menos 8 caracteres."),
      ],
      this.validate,
      this.controller.registerUser
    );

    this._router.post(
      "/login",
      [
        body("email").isEmail().withMessage("Email inválido"),
        body("password").isString().withMessage("Senha deve ser uma string"),
      ],
      this.validate,
      this.controller.loginUser
    );

    return this._router
  }
}

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User routes
*/

import UserController from "../controllers/UserController";
import BaseRoutes from "./abstract/BaseRoutes";
import { body, param } from "express-validator";
import { Router } from "express";

export default class AuthRoutes extends BaseRoutes {
  constructor(protected controller: UserController = new UserController()) {
    super(controller);
  }

  get router(): Router {
    /**
     * @swagger
     * /user/register:
     *   post:
     *     summary: Register a new user
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               full_name:
     *                  type: string
     *               cpf:
     *                  type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             example:
     *                 full_name: "Pedro Chaves de Carvalho"
     *                 cpf: "12345678901"
     *                 email: "teste@email.com"
     *                 password: "12345678"
     *     responses:
     *       '201':
     *         description: Successfully registered a new user.
     *       '400':
     *         description: Bad request. Invalid input data.
     *       '409':
     *         description: Conflict. User with the same email already exists.
     */
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
        body("cpf")
          .isNumeric()
          .isLength({ min: 11, max: 11 })
          .withMessage("CPF deve ter exatamente 11 caracteres."),
      ],
      this.validate,
      this.controller.registerUser
    );

    /**
     * @swagger
     * /user/login:
     *   post:
     *     summary: Log in as a user
     *     tags: [User]
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
     *                 password: "12345678"
     *     responses:
     *       '200':
     *         description: Successfully logged in.
     *       '401':
     *         description: Unauthorized. Invalid credentials.
     *       '404':
     *         description: Not found. User with the specified username does not exist.
     */
    this._router.post(
      "/login",
      [
        body("email").isEmail().withMessage("Email inválido"),
        body("password").isString().withMessage("Senha deve ser uma string"),
      ],
      this.validate,
      this.controller.loginUser
    );

    this._router.post(
      "/logged",
      [],
      this.validate,
      this.controller.loggedUser
    )

    return this._router;
  }
}

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User routes
*/

import AuthController from "../controllers/UserController";
import BaseRoutes from "./abstract/BaseRoutes";
import { body, param } from "express-validator";
import { Router } from "express";

export default class UserRoutes extends BaseRoutes {
  constructor(protected controller: AuthController = new AuthController()) {
    super(controller);
  }

  get router(): Router {
    /**
     * @swagger
     * /user/{user_id}:
     *   get:
     *     summary: Get a user profile
     *     tags: [User]
     *     security:
     *       - CookieAuth: []
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         description: The ID of the user.
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successfully logged in.
     *       '401':
     *         description: Unauthorized. Invalid credentials.
     *       '404':
     *         description: Not found. User with the specified username does not exist.
     */

    this._router.post(
      "/",
      [
        body("email").isEmail().withMessage("Email inválido"),
      ],
      this.validate,
      this.controller.getUserByEmail
    );

    this._router.get(
      "/:user_id",
      [
        param("user_id")
          .isInt()
          .withMessage("ID do projeto deve ser um inteiro"),
      ],
      this.validate,
      this.controller.getUser
    );

    /**
     * @swagger
     * /user/edit:
     *   put:
     *     summary: Edit a user profile
     *     tags: [User]
     *     security:
     *       - CookieAuth: []
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
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             example:
     *                 full_name: "Pedro Chaves de Carvalho"
     *                 email: "tests@email.com"
     *                 cpf: "12345675623"
     *                 password: "12345678"
     *     responses:
     *       '201':
     *         description: Successfully registered a new user.
     *       '400':
     *         description: Bad request. Invalid input data.
     *       '409':
     *         description: Conflict. User with the same email already exists.
     */
    this._router.put(
      "/edit",
      body("full_name")
        .isString()
        .withMessage("Nome completo inválido")
        .isLength({ min: 1 })
        .withMessage("Insira o nome completo"),
      body("email").isEmail().withMessage("Email inválido"),
      body("cpf")
        .isNumeric()
        .isLength({ min: 11, max: 11 })
        .withMessage("CPF deve ter exatamente 11 caracteres."),
      body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Senha deve ter pelo menos 8 caracteres."),

      this.validate,
      this.controller.updateUser
    );

    /**
     * @swagger
     * /user/byName:
     *   post:
     *     summary: Edit a user profile
     *     tags: [User]
     *     security:
     *       - CookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               full_name:
     *                  type: string
     *             example:
     *                 full_name: "Pedro"
     *     responses:
     *       '201':
     *         description: Successfully registered a new user.
     *       '400':
     *         description: Bad request. Invalid input data.
     *       '409':
     *         description: Conflict. User with the same email already exists.
     */
    this._router.post(
      "/byName",
      body("full_name")
        .isString()
        .withMessage("Nome completo inválido")
        .isLength({ min: 1 })
        .withMessage("Insira o nome completo"),
      this.validate,
      this.controller.getUsersByName
    );


    this._router.post(
      "/all",
      body(),
      this.validate,
      this.controller.getUsers
    )

    return this._router;
  }
}

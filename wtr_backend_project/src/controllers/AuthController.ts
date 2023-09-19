import { NextFunction, Request, Response } from "express";
import { authService } from "../prisma/services";
import AuthSuccessResponse from "../types/responses/AuthSuccessResponse";
import ResourceCreatedResponse from "../types/responses/ResourceCreatedResponse";
import BaseController from "./BaseController";
import { body } from "express-validator";

export default class AuthController extends BaseController {
  protected initRoutes(): void {
    this.router.post(
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
      this.registerUser
    );

    this.router.post(
      "/login",
      [
        body("email").isEmail().withMessage("Email inválido"),
        body("password").isString().withMessage("Senha deve ser uma string"),
      ],
      this.validate,
      this.loginUser
    );
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    const { full_name, password, email } = req.body;
    try {
      await authService.createUser(full_name, password, email);
      new ResourceCreatedResponse().send(res);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const token = await authService.authenticateUser(email, password);
      res.cookie("token", token, {
        httpOnly: false,
        maxAge: 3600000,
        sameSite: "strict",
      });
      new AuthSuccessResponse().send(res);
    } catch (error) {
      next(error);
    }
  }
}
